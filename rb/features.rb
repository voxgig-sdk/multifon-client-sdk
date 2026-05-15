# MultifonClient SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module MultifonClientFeatures
  def self.make_feature(name)
    case name
    when "base"
      MultifonClientBaseFeature.new
    when "test"
      MultifonClientTestFeature.new
    else
      MultifonClientBaseFeature.new
    end
  end
end
