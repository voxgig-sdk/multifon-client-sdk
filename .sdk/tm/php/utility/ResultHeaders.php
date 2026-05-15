<?php
declare(strict_types=1);

// MultifonClient SDK utility: result_headers

class MultifonClientResultHeaders
{
    public static function call(MultifonClientContext $ctx): ?MultifonClientResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
