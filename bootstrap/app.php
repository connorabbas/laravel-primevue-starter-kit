<?php

use App\Exceptions\ErrorToastException;
use App\Http\Middleware\EncryptCookies;
use App\Http\Middleware\HandleInertiaRequests;
use Illuminate\Cookie\Middleware\EncryptCookies as BaseEncryptCookies;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\Response;
use Tighten\Ziggy\Ziggy;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__ . '/../routes/web.php',
        commands: __DIR__ . '/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->web(
            append: [
                HandleInertiaRequests::class,
                AddLinkHeadersForPreloadedAssets::class,
            ],
            replace: [
                BaseEncryptCookies::class => EncryptCookies::class
            ],
        );
    })
    ->withExceptions(function (Exceptions $exceptions) {
        $exceptions->respond(function (Response $response, Throwable $exception, Request $request) {
            $statusCode = $response->getStatusCode();
            $errorStatuses = config('errors.statuses', []);
            $clientErrorDefaults = config('errors.defaults.4xx', []);
            $serverErrorDefaults = config('errors.defaults.5xx', []);

            $resolveErrorMetadata = function (int $status) use ($errorStatuses, $clientErrorDefaults, $serverErrorDefaults): array {
                if (isset($errorStatuses[$status]) && is_array($errorStatuses[$status])) {
                    return $errorStatuses[$status];
                }

                if ($status >= 500) {
                    return $serverErrorDefaults;
                }

                if ($status >= 400) {
                    return $clientErrorDefaults;
                }

                return [];
            };

            if ($statusCode === 419) {
                $errorMetadata = $resolveErrorMetadata($statusCode);

                return back()->with([
                    'flash_warn' => $errorMetadata['detail'] ?? 'The page expired, please try again.',
                ]);
            }

            if ($statusCode >= 400) {
                $errorMetadata = $resolveErrorMetadata($statusCode);
                $errorTitle = Response::$statusTexts[$statusCode] ?? 'Error';
                $errorDetail = $errorMetadata['detail'] ?? 'An unexpected error occurred.';

                if (
                    $statusCode >= 500
                    && app()->hasDebugModeEnabled()
                    && !($exception instanceof ErrorToastException)
                ) {
                    return $response;
                }

                if ($request->inertia() && !$request->isMethod('GET')) {
                    $errorSummary = "{$errorTitle} - {$statusCode}";
                    $toastTitle = $errorTitle;

                    if ($exception instanceof ErrorToastException) {
                        $toastTitle = 'Error';
                        $errorSummary = 'Error';
                        $errorDetail = $exception->getMessage();
                    }

                    return response()->json([
                        'status' => $statusCode,
                        'error_title' => $toastTitle,
                        'error_summary' => $errorSummary,
                        'error_detail' => $errorDetail,
                    ], $statusCode);
                }

                return Inertia::render('Error', [
                    'title' => $errorTitle,
                    'detail' => $errorDetail,
                    'status' => $statusCode,
                    'homepageRoute' => route(name: 'welcome', absolute: false),
                    'ziggy' => fn () => [
                        ...(new Ziggy())->toArray(),
                        'location' => $request->url(),
                    ],
                ])
                    ->toResponse($request)
                    ->setStatusCode($statusCode);
            }

            return $response;
        });
    })->create();
