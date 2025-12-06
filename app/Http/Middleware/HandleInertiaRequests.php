<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Middleware;
use Tighten\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Receive all validation errors for each field, instead of only the first one
     *
     * @see https://inertiajs.com/docs/v2/the-basics/validation#multiple-errors-per-field
     */
    protected $withAllErrors = true;

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'colorScheme' => fn () => $request->cookie('colorScheme', 'auto'),
            'ziggy' => fn () => [
                ...(new Ziggy())->toArray(),
                'location' => $request->url(),
            ],
            'auth' => [
                'user' => $request->user(),
            ],
            'flash' => [
                'success' => fn () => $request->session()->get('flash_success'),
                'info' => fn () => $request->session()->get('flash_info'),
                'warn' => fn () => $request->session()->get('flash_warn'),
                'error' => fn () => $request->session()->get('flash_error'),
                'message' => fn () => $request->session()->get('flash_message'),
            ],
            'queryParams' => Inertia::always($request->query()),
        ];
    }
}
