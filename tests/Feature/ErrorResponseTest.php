<?php

namespace Tests\Feature;

use Illuminate\Support\Facades\Route;
use Inertia\Testing\AssertableInertia;
use Symfony\Component\HttpFoundation\Response;
use Tests\TestCase;

class ErrorResponseTest extends TestCase
{
    public function test_inertia_mutation_requests_receive_configured_error_payload_for_known_statuses(): void
    {
        $response = $this->withHeaders([
            'X-Inertia' => 'true',
        ])->post('/missing-endpoint');

        $response->assertNotFound()
            ->assertJsonPath('status', 404)
            ->assertJsonPath('errorSummary', (Response::$statusTexts[404] ?? 'Error') . ' - 404')
            ->assertJsonPath('errorDetail', config('errors.statuses.404.detail'));
    }

    public function test_inertia_mutation_requests_use_fallback_metadata_for_unknown_statuses(): void
    {
        Route::post('/_tests/error-418', fn () => abort(418));

        $response = $this->withHeaders([
            'X-Inertia' => 'true',
        ])->post('/_tests/error-418');

        $response->assertStatus(418)
            ->assertJsonPath('status', 418)
            ->assertJsonPath('errorSummary', (Response::$statusTexts[418] ?? 'Error') . ' - 418')
            ->assertJsonPath('errorDetail', config('errors.defaults.4xx.detail'));
    }

    public function test_session_expired_errors_redirect_back_with_configured_inertia_flash_message(): void
    {
        Route::post('/_tests/error-419', fn () => abort(419));

        $response = $this->from(route('welcome', absolute: false))->post('/_tests/error-419');

        $response->assertRedirect(route('welcome', absolute: false))
            ->assertInertiaFlash('warn_message', config('errors.statuses.419.detail'));
    }

    public function test_error_page_receives_resolved_error_metadata_for_get_requests(): void
    {
        $response = $this->get('/missing-page');

        $response->assertNotFound()
            ->assertInertia(
                fn (AssertableInertia $page) => $page
                    ->component('Error', false)
                    ->where('title', Response::$statusTexts[404] ?? 'Error')
                    ->where('detail', config('errors.statuses.404.detail'))
                    ->where('status', 404)
            );
    }
}
