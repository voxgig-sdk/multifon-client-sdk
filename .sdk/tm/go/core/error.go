package core

type MultifonClientError struct {
	IsMultifonClientError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewMultifonClientError(code string, msg string, ctx *Context) *MultifonClientError {
	return &MultifonClientError{
		IsMultifonClientError: true,
		Sdk:              "MultifonClient",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *MultifonClientError) Error() string {
	return e.Msg
}
