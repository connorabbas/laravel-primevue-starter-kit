<?php

namespace App\Data;

use App\Models\User;
use Carbon\CarbonImmutable;
use LogicException;
use Spatie\LaravelData\Data;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
class UserData extends Data
{
    public function __construct(
        public int $id,
        public string $name,
        public string $email,
        public CarbonImmutable|string|null $emailVerifiedAt,
        public CarbonImmutable|string $createdAt,
        public CarbonImmutable|string $updatedAt,
    ) {
    }

    public static function fromModel(User $user): self
    {
        $createdAt = $user->created_at;
        $updatedAt = $user->updated_at;

        if ($createdAt === null || $updatedAt === null) {
            throw new LogicException('User timestamps must be present before transforming to UserData.');
        }

        return new self(
            id: $user->id,
            name: $user->name,
            email: $user->email,
            emailVerifiedAt: $user->email_verified_at,
            createdAt: $createdAt,
            updatedAt: $updatedAt,
        );
    }
}
