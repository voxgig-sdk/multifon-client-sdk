<?php
declare(strict_types=1);

// MultifonClient SDK utility: prepare_body

class MultifonClientPrepareBody
{
    public static function call(MultifonClientContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
