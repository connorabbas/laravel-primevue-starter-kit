<?php

namespace App\Data;

use Spatie\LaravelData\Data;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
class ErrorToastResponseData extends Data
{
    public function __construct(
        public int $status,
        public string $errorSummary,
        public string $errorDetail,
    ) {
    }
}
