<?php
declare(strict_types=1);

// MultifonClient SDK exists test

require_once __DIR__ . '/../multifonclient_sdk.php';

use PHPUnit\Framework\TestCase;

class ExistsTest extends TestCase
{
    public function test_create_test_sdk(): void
    {
        $testsdk = MultifonClientSDK::test(null, null);
        $this->assertNotNull($testsdk);
    }
}
