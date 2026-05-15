# MultifonClient SDK utility: make_context
require_relative '../core/context'
module MultifonClientUtilities
  MakeContext = ->(ctxmap, basectx) {
    MultifonClientContext.new(ctxmap, basectx)
  }
end
