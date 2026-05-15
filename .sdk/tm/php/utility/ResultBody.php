<?php
declare(strict_types=1);

// MultifonClient SDK utility: result_body

class MultifonClientResultBody
{
    public static function call(MultifonClientContext $ctx): ?MultifonClientResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
