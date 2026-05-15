<?php
declare(strict_types=1);

// MultifonClient SDK utility: feature_add

class MultifonClientFeatureAdd
{
    public static function call(MultifonClientContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}
