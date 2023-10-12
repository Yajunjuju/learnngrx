import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { exhaustMap, map } from "rxjs";
import { emptyaction, showalert } from "./App.action";


@Injectable()

export class AppEffects{

  constructor(private action$:Actions, private _snackbar:MatSnackBar){

  }

  _showalert = createEffect(() =>
    this.action$.pipe(
      ofType(showalert),
      exhaustMap(action => {
        return this.ShowsnackbarAlert(action.message, action.actionresult)
          .afterDismissed()
          .pipe(
            map(() => {
              return emptyaction();
            })
          )
      })
    )
  )


  ShowsnackbarAlert(message: string, actionresult:string='fail') {
    let _class = actionresult=='pass'?'green-snackbar':'red-snackbar'

    return this._snackbar.open(message, 'OK', {
      verticalPosition: 'top',
      horizontalPosition: 'end',
      panelClass:[_class],
      duration:5000
    })
  }
}
