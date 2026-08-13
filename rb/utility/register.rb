# MultifonClient SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'graphql'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

MultifonClientUtility.registrar = ->(u) {
  u.clean = MultifonClientUtilities::Clean
  u.done = MultifonClientUtilities::Done
  u.make_error = MultifonClientUtilities::MakeError
  u.feature_add = MultifonClientUtilities::FeatureAdd
  u.feature_hook = MultifonClientUtilities::FeatureHook
  u.feature_init = MultifonClientUtilities::FeatureInit
  u.fetcher = MultifonClientUtilities::Fetcher
  u.make_fetch_def = MultifonClientUtilities::MakeFetchDef
  u.make_context = MultifonClientUtilities::MakeContext
  u.make_options = MultifonClientUtilities::MakeOptions
  u.make_request = MultifonClientUtilities::MakeRequest
  u.make_response = MultifonClientUtilities::MakeResponse
  u.make_result = MultifonClientUtilities::MakeResult
  u.make_point = MultifonClientUtilities::MakePoint
  u.make_spec = MultifonClientUtilities::MakeSpec
  u.make_url = MultifonClientUtilities::MakeUrl
  u.param = MultifonClientUtilities::Param
  u.prepare_auth = MultifonClientUtilities::PrepareAuth
  u.prepare_body = MultifonClientUtilities::PrepareBody
  u.prepare_headers = MultifonClientUtilities::PrepareHeaders
  u.prepare_method = MultifonClientUtilities::PrepareMethod
  u.prepare_params = MultifonClientUtilities::PrepareParams
  u.prepare_path = MultifonClientUtilities::PreparePath
  u.prepare_query = MultifonClientUtilities::PrepareQuery
  u.graphql_body = MultifonClientUtilities::GraphqlBody
  u.graphql_errors = MultifonClientUtilities::GraphqlErrors
  u.result_basic = MultifonClientUtilities::ResultBasic
  u.result_body = MultifonClientUtilities::ResultBody
  u.result_headers = MultifonClientUtilities::ResultHeaders
  u.transform_request = MultifonClientUtilities::TransformRequest
  u.transform_response = MultifonClientUtilities::TransformResponse
}
