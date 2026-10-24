# MultifonClient SDK utility: prepare_body
require_relative 'media'
module MultifonClientUtilities
  PrepareBody = ->(ctx) {
    return nil unless ctx.op.input == "data"
    return MultifonClientUtilities.raw_body(ctx.reqdata) if MultifonClientUtilities.raw_request?(ctx.point)
    ctx.utility.transform_request.call(ctx)
  }
end
