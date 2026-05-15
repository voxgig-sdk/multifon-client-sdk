<?php
declare(strict_types=1);

// MultifonClient SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class MultifonClientMakeContext
{
    public static function call(array $ctxmap, ?MultifonClientContext $basectx): MultifonClientContext
    {
        return new MultifonClientContext($ctxmap, $basectx);
    }
}
