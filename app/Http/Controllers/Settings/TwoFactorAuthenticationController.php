<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use App\Http\Requests\Settings\TwoFactorAuthenticationRequest;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Inertia\Inertia;
use Inertia\Response;
use Laravel\Fortify\Features;
use Laravel\Fortify\Fortify;

class TwoFactorAuthenticationController extends Controller implements HasMiddleware
{
    public static function middleware(): array
    {
        return Features::optionEnabled(Features::twoFactorAuthentication(), 'confirmPassword')
            ? [new Middleware('password.confirm', only: ['show'])]
            : [];
    }

    public function show(TwoFactorAuthenticationRequest $request): Response
    {
        $request->ensureStateIsValid();

        $user = $request->user();

        if (!$user) {
            abort(403);
        }

        $hasSecret = !is_null($user->two_factor_secret);
        $setupKey = null;

        if (is_string($user->two_factor_secret)) {
            $setupKey = Fortify::currentEncrypter()->decrypt($user->two_factor_secret);
        }

        return Inertia::render('settings/TwoFactor', [
            'status' => $request->session()->get('status'),
            'requiresConfirmation' => Features::optionEnabled(Features::twoFactorAuthentication(), 'confirm'),
            'twoFactorEnabled' => $user->hasEnabledTwoFactorAuthentication(),
            'isConfirming' => $hasSecret && is_null($user->two_factor_confirmed_at),
            'qrCode' => $hasSecret ? $user->twoFactorQrCodeSvg() : null,
            'setupKey' => $setupKey,
            'recoveryCodes' => $hasSecret ? $user->recoveryCodes() : [],
        ]);
    }
}
