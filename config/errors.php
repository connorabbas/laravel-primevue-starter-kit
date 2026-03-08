<?php

return [
    'defaults' => [
        '4xx' => [
            'detail' => 'Sorry, your request could not be completed.',
            'severity' => 'warn',
        ],
        '5xx' => [
            'detail' => 'Whoops, something went wrong on our end. Please try again.',
            'severity' => 'error',
        ],
    ],
    'statuses' => [
        401 => [
            'detail' => 'Please sign in to continue.',
            'severity' => 'warn',
        ],
        403 => [
            'detail' => 'Sorry, you are unauthorized to access this resource/action.',
            'severity' => 'warn',
        ],
        404 => [
            'detail' => 'Sorry, the resource you are looking for could not be found.',
            'severity' => 'warn',
        ],
        419 => [
            'detail' => 'The page expired, please try again.',
            'severity' => 'warn',
        ],
        429 => [
            'detail' => 'You have made too many requests. Please wait and try again.',
            'severity' => 'warn',
        ],
        500 => [
            'detail' => 'Whoops, something went wrong on our end. Please try again.',
            'severity' => 'error',
        ],
        503 => [
            'detail' => 'Sorry, we are doing some maintenance. Please check back soon.',
            'severity' => 'warn',
        ],
    ],
];
