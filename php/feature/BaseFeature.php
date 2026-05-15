<?php
declare(strict_types=1);

// MultifonClient SDK base feature

class MultifonClientBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(MultifonClientContext $ctx, array $options): void {}
    public function PostConstruct(MultifonClientContext $ctx): void {}
    public function PostConstructEntity(MultifonClientContext $ctx): void {}
    public function SetData(MultifonClientContext $ctx): void {}
    public function GetData(MultifonClientContext $ctx): void {}
    public function GetMatch(MultifonClientContext $ctx): void {}
    public function SetMatch(MultifonClientContext $ctx): void {}
    public function PrePoint(MultifonClientContext $ctx): void {}
    public function PreSpec(MultifonClientContext $ctx): void {}
    public function PreRequest(MultifonClientContext $ctx): void {}
    public function PreResponse(MultifonClientContext $ctx): void {}
    public function PreResult(MultifonClientContext $ctx): void {}
    public function PreDone(MultifonClientContext $ctx): void {}
    public function PreUnexpected(MultifonClientContext $ctx): void {}
}
