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
            $errorTitles = [
                403 => 'Forbidden',
                404 => 'Not Found',
                500 => 'Server Error',
                503 => 'Service Unavailable',
            ];
            $errorDetails = [
                403 => 'Sorry, you are unauthorized to access this resource/action.',
                404 => 'Sorry, the resource you are looking for could not be found.',
                500 => 'Whoops, something went wrong on our end. Please try again.',
                503 => 'Sorry, we are doing some maintenance. Please check back soon.',
            ];

            if (in_array($statusCode, [500, 503, 404, 403])) {
                if (
                    $statusCode === 500
                    && app()->hasDebugModeEnabled()
                    && get_class($exception) !== ErrorToastException::class
                ) {
                    return $response;
                } elseif (!$request->inertia()) {
                    // Show error page component for standard visits
                    return Inertia::render('Error', [
                        'errorTitles' => $errorTitles,
                        'errorDetails' => $errorDetails,
                        'status' => $statusCode,
                        'homepageRoute' => route('welcome'),
                        'ziggy' => fn () => [
                            ...(new Ziggy())->toArray(),
                            'location' => $request->url(),
                        ],
                    ])
                        ->toResponse($request)
                        ->setStatusCode($statusCode);
                } else {
                    // Return JSON response for PrimeVue toast to display, handled by Inertia router event listener
                    $errorSummary = "$statusCode - $errorTitles[$statusCode]";
                    $errorDetail = $errorDetails[$statusCode];
                    if (get_class($exception) === ErrorToastException::class) {
                        $errorSummary = "$statusCode - Error";
                        $errorDetail = $exception->getMessage();
                    }
                    return response()->json([
                        'error_summary' => $errorSummary,
                        'error_detail' => $errorDetail,
                    ], $statusCode);
                }
            } elseif ($statusCode === 419) {
                return back()->with([
                    'flash_warn' => 'The page expired, please try again.',
                ]);
            }

            return $response;
        });
    })->create();
