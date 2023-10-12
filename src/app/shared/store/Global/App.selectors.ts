import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppStateModel } from "./AppState.model";

const getAppstate=createFeatureSelector<AppStateModel>('app');

export const getspinnerstate=createSelector(getAppstate,(state)=>{
    return state.isloaded;
});
