# MultifonClient SDK utility: make_context

from projectname_sdk.core.context import MultifonClientContext


def make_context_util(ctxmap, basectx):
    return MultifonClientContext(ctxmap, basectx)
