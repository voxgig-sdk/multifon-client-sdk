<?php
declare(strict_types=1);

// Typed models for the MultifonClient SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** AccountManagement entity data model. */
class AccountManagement
{
}

/** Match filter for AccountManagement#load (any subset of AccountManagement fields). */
class AccountManagementLoadMatch
{
}

/** Api entity data model. */
class Api
{
    public ?string $message = null;
    public ?bool $success = null;
}

/** Match filter for Api#create (any subset of Api fields). */
class ApiCreateData
{
    public ?string $message = null;
    public ?bool $success = null;
}

