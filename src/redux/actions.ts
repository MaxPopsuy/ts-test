import { createAction } from "@reduxjs/toolkit";

const requestError = createAction<string>('request/error');

const requestLoading = createAction<boolean>('request/loading');

const typeModal = createAction<boolean>('modal/type');

export {requestError, requestLoading, typeModal};