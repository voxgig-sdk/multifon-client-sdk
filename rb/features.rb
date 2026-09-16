# MultifonClient SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module MultifonClientFeatures
  def self.make_feature(name)
    case name
    when "base"
      MultifonClientBaseFeature.new
    when "ratelimit"
      MultifonClientRatelimitFeature.new
    when "retry"
      MultifonClientRetryFeature.new
    when "test"
      MultifonClientTestFeature.new
    when "timeout"
      MultifonClientTimeoutFeature.new
    else
      MultifonClientBaseFeature.new
    end
  end
end
