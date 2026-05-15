<?php
declare(strict_types=1);

// MultifonClient SDK utility registration

require_once __DIR__ . '/../core/UtilityType.php';
require_once __DIR__ . '/Clean.php';
require_once __DIR__ . '/Done.php';
require_once __DIR__ . '/MakeError.php';
require_once __DIR__ . '/FeatureAdd.php';
require_once __DIR__ . '/FeatureHook.php';
require_once __DIR__ . '/FeatureInit.php';
require_once __DIR__ . '/Fetcher.php';
require_once __DIR__ . '/MakeFetchDef.php';
require_once __DIR__ . '/MakeContext.php';
require_once __DIR__ . '/MakeOptions.php';
require_once __DIR__ . '/MakeRequest.php';
require_once __DIR__ . '/MakeResponse.php';
require_once __DIR__ . '/MakeResult.php';
require_once __DIR__ . '/MakePoint.php';
require_once __DIR__ . '/MakeSpec.php';
require_once __DIR__ . '/MakeUrl.php';
require_once __DIR__ . '/Param.php';
require_once __DIR__ . '/PrepareAuth.php';
require_once __DIR__ . '/PrepareBody.php';
require_once __DIR__ . '/PrepareHeaders.php';
require_once __DIR__ . '/PrepareMethod.php';
require_once __DIR__ . '/PrepareParams.php';
require_once __DIR__ . '/PreparePath.php';
require_once __DIR__ . '/PrepareQuery.php';
require_once __DIR__ . '/ResultBasic.php';
require_once __DIR__ . '/ResultBody.php';
require_once __DIR__ . '/ResultHeaders.php';
require_once __DIR__ . '/TransformRequest.php';
require_once __DIR__ . '/TransformResponse.php';

MultifonClientUtility::setRegistrar(function (MultifonClientUtility $u): void {
    $u->clean = [MultifonClientClean::class, 'call'];
    $u->done = [MultifonClientDone::class, 'call'];
    $u->make_error = [MultifonClientMakeError::class, 'call'];
    $u->feature_add = [MultifonClientFeatureAdd::class, 'call'];
    $u->feature_hook = [MultifonClientFeatureHook::class, 'call'];
    $u->feature_init = [MultifonClientFeatureInit::class, 'call'];
    $u->fetcher = [MultifonClientFetcher::class, 'call'];
    $u->make_fetch_def = [MultifonClientMakeFetchDef::class, 'call'];
    $u->make_context = [MultifonClientMakeContext::class, 'call'];
    $u->make_options = [MultifonClientMakeOptions::class, 'call'];
    $u->make_request = [MultifonClientMakeRequest::class, 'call'];
    $u->make_response = [MultifonClientMakeResponse::class, 'call'];
    $u->make_result = [MultifonClientMakeResult::class, 'call'];
    $u->make_point = [MultifonClientMakePoint::class, 'call'];
    $u->make_spec = [MultifonClientMakeSpec::class, 'call'];
    $u->make_url = [MultifonClientMakeUrl::class, 'call'];
    $u->param = [MultifonClientParam::class, 'call'];
    $u->prepare_auth = [MultifonClientPrepareAuth::class, 'call'];
    $u->prepare_body = [MultifonClientPrepareBody::class, 'call'];
    $u->prepare_headers = [MultifonClientPrepareHeaders::class, 'call'];
    $u->prepare_method = [MultifonClientPrepareMethod::class, 'call'];
    $u->prepare_params = [MultifonClientPrepareParams::class, 'call'];
    $u->prepare_path = [MultifonClientPreparePath::class, 'call'];
    $u->prepare_query = [MultifonClientPrepareQuery::class, 'call'];
    $u->result_basic = [MultifonClientResultBasic::class, 'call'];
    $u->result_body = [MultifonClientResultBody::class, 'call'];
    $u->result_headers = [MultifonClientResultHeaders::class, 'call'];
    $u->transform_request = [MultifonClientTransformRequest::class, 'call'];
    $u->transform_response = [MultifonClientTransformResponse::class, 'call'];
});
