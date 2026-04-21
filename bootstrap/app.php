<?php

use App\Data\ErrorToastResponseData;
use App\Http\Middleware\HandleInertiaRequests;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\Response;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__ . '/../routes/web.php',
        commands: __DIR__ . '/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->encryptCookies(except: ['colorScheme']);
        $middleware->web(
            append: [
                HandleInertiaRequests::class,
                AddLinkHeadersForPreloadedAssets::class,
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

                return Inertia::flash('warn_message', $errorMetadata['detail'] ?? 'The page expired, please try again.')
                    ->back();
            }

            if ($statusCode >= 400) {
                $errorMetadata = $resolveErrorMetadata($statusCode);
                $statusText = Response::$statusTexts[$statusCode] ?? 'Error';
                $errorDetail = $errorMetadata['detail'] ?? 'An unexpected error occurred.';

                if (
                    $statusCode >= 500
                    && app()->hasDebugModeEnabled()
                ) {
                    return $response;
                }

                if ($request->inertia() && !$request->isMethod('GET')) {
                    $errorSummary = "{$statusText} - {$statusCode}";

                    $toastPayload = new ErrorToastResponseData(
                        status: $statusCode,
                        errorSummary: $errorSummary,
                        errorDetail: $errorDetail,
                    );

                    return response()->json($toastPayload->toArray(), $statusCode);
                }

                return Inertia::render('Error', [
                    'title' => $statusText,
                    'detail' => $errorDetail,
                    'status' => $statusCode,
                    'homepageRoute' => route(name: 'welcome', absolute: false),
                ])
                    ->toResponse($request)
                    ->setStatusCode($statusCode);
            }

            return $response;
        });
    })->create();
