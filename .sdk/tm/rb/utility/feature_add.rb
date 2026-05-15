# MultifonClient SDK utility: feature_add
module MultifonClientUtilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end
