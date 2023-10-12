import { createAction, props } from "@ngrx/store"

export const SHOW_ALERT = '[app event] show alert'
export const EMPTY_ACTION = '[app event] empty action'

export const showalert = createAction(SHOW_ALERT, props<{message:string, actionresult:string}>());
export const emptyaction = createAction(EMPTY_ACTION)
