<?php
declare(strict_types=1);

// MultifonClient SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class MultifonClientFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new MultifonClientBaseFeature();
            case "test":
                return new MultifonClientTestFeature();
            default:
                return new MultifonClientBaseFeature();
        }
    }
}
