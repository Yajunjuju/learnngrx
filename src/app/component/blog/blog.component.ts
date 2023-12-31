import { AddblogComponent } from './../addblog/addblog.component';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { BlogModel, Blogs } from 'src/app/shared/store/Blog/Blog.model';
import { getblog, getbloginfo } from 'src/app/shared/store/Blog/Blog.selectors';
import { AppStateModel } from 'src/app/shared/store/Global/AppState.model';
import { deleteblog, loadblog } from 'src/app/shared/store/Blog/Blog.actions';
import { loadspinner } from 'src/app/shared/store/Global/App.action';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  constructor(private store:Store<AppStateModel>, private dialog:MatDialog) {

  }

  bloglist !:BlogModel[];
  bloginfo !:Blogs;

  ngOnInit(): void {
    this.store.dispatch(loadspinner({isloaded:true}));
    setTimeout(() => {
      this.store.dispatch(loadblog());
      this.store.dispatch(loadspinner({ isloaded: false }));
    },100);

    this.store.select(getbloginfo).subscribe(item => {
      // this.bloglist = item;
      this.bloginfo = item;
    });
  }

  AddBlog(){
    this.OpenPopup(0,'Add Blog');
  }

  OpenPopup(id:any, title:any, isedit=false){
    this.dialog.open(AddblogComponent, {
      width:'40%',
      data:{
        id:id,
        title:title,
        isedit:isedit
      }
    })
  }

  EditBlog(id:any){
    this.OpenPopup(id, 'Edit Blog', true);
  }

  RemoveBlog(id:any){
    if(confirm("Are You Sure Want To Remove?")){
      this.store.dispatch(loadspinner({ isloaded: true }));
      setTimeout(() => {
        this.store.dispatch(deleteblog({ id: id }));

      }, 500);
    }
  }

}
