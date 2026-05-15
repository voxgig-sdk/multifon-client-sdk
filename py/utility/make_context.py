# MultifonClient SDK utility: make_context

from core.context import MultifonClientContext


def make_context_util(ctxmap, basectx):
    return MultifonClientContext(ctxmap, basectx)
