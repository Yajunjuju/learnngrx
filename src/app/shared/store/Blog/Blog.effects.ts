import { Injectable } from "@angular/core";
import { MasterService } from "../../master.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ADD_BLOG, LOAD_BLOG, addblog, addblogsuccess, deleteblog, deleteblogsuccess, loadblog, loadblogfail, loadblogsuccess, updateblog, updateblogsuccess } from "./Blog.actions";
import { EMPTY, catchError, exhaustMap, map, of, switchMap } from "rxjs";
import { BlogModel } from "./Blog.model";
import { MatSnackBar } from "@angular/material/snack-bar";
import { emptyaction, loadspinner, showalert } from "../Global/App.action";

@Injectable()

export class BlogEffects {

  constructor(private action$: Actions, private service: MasterService, private _snackbar: MatSnackBar) {

  }

  _blog = createEffect(() =>
    this.action$.pipe(
      ofType(loadblog),
      exhaustMap((action) => {
        return this.service.GetAllBlogs().pipe(
          map((data) => {
            return loadblogsuccess({ bloglist: data })
          }),
          catchError((_error) => of(loadblogfail({ errortext: _error }), loadspinner({isloaded:false})))
        )
      })
    )
  );

  _addblog = createEffect(() =>
    this.action$.pipe(
      ofType(addblog),
      switchMap(action =>
        this.service.CreateBlog(action.bloginput).pipe(
          switchMap(data =>of(
            addblogsuccess({ bloginput: data as BlogModel }),
            loadspinner({isloaded:false}),
            showalert({message:'Created successfully.', actionresult:'pass'})
          )),
          catchError((_error) => of(showalert({message:'Failed to create blog.', actionresult:'fail'}), loadspinner({isloaded:false})))
        )
      )
    )
  );

  _updateblog = createEffect(() =>
    this.action$.pipe(
      ofType(updateblog),
      switchMap(action =>
        this.service.UpdataBlog(action.bloginput).pipe(
          switchMap(res => of(
            updateblogsuccess({ bloginput: action.bloginput }),
            loadspinner({isloaded:false}),
            showalert({message:'Updated successfully.', actionresult:'pass'})
          )),
          catchError((_error) => of(showalert({message:'Updated Failed - Due to '+ _error.message, actionresult:'fail'}), loadspinner({isloaded:false})))
        )
      )
    )
  );

  _deleteblog = createEffect(() =>
    this.action$.pipe(
      ofType(deleteblog),
      switchMap(action =>
        this.service.DeleteBlog(action.id).pipe(
          switchMap(res => of(
            deleteblogsuccess({ id: action.id }),
            loadspinner({isloaded:false}),
            showalert({message:'Remove successfully.', actionresult:'pass'})
          )),
          catchError((_error) => of(showalert({message:'Failed to remove.', actionresult:'fail'}), loadspinner({isloaded:false})))
        )
      )
    )
  );


}

