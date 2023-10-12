import { createAction, props } from "@ngrx/store"

export const SHOW_ALERT = '[app event] show alert'
export const EMPTY_ACTION = '[app event] empty action'
export const LOAD_SPINNER = '[blog page] load spinner';


export const showalert = createAction(SHOW_ALERT, props<{message:string, actionresult:string}>());
export const emptyaction = createAction(EMPTY_ACTION)
export const loadspinner = createAction(LOAD_SPINNER, props<{isloaded:boolean}>())
