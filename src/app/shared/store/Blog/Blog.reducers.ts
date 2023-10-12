import { createReducer,on } from '@ngrx/store';
import { BlogState } from './Blog.state';
import { addblog, addblogsuccess, deleteblog, loadblog, loadblogfail, loadblogsuccess, updateblog, updateblogsuccess } from './Blog.actions';
import { BlogModel } from './Blog.model';
import { loadspinner } from '../Global/App.action';

const _blogReducer = createReducer(
  BlogState,

  // 讀取資料
  on(loadblog, (state) => {
    return {
      ...state,
      // isloaded:false
    };
  }),
  on(loadblogsuccess, (state, action) =>{
    return{
      ...state,
      bloglist:[...action.bloglist],
      errormessage:'',
      // isloaded:false
    }
  }),
  on(loadblogfail, (state, action) =>{
    console.log(action.errortext)
    return{
      ...state,
      bloglist:[],
      errormessage:action.errortext.message,
      // isloaded:false
    }
  }),

  // 新增資料
  // on(addblog, (state, action) => {
  //   const _blog = {...action.bloginput};
  //   _blog.id = state.bloglist.length + 1;
  //   return{
  //     ...state,
  //     bloglist:[...state.bloglist, _blog]
  //   }
  // }),
  on(addblogsuccess, (state, action) => {
    const _blog = {...action.bloginput};
    _blog.id = state.bloglist.length + 1;
    return{
      ...state,
      bloglist:[...state.bloglist, _blog],
      // isloaded:false
    }
  }),

  // 修改資料
  // on(updateblog, (state, action) =>{
  //   const _blog = {...action.bloginput};
  //   const updateblog = state.bloglist.map(blog =>{
  //     return _blog.id === blog.id ? _blog: blog;
  //   });
  //   return{
  //     ...state,
  //     bloglist:updateblog
  //   }
  // }),
  on(updateblogsuccess, (state, action) =>{
    const _blog = {...action.bloginput};
    const updateblog = state.bloglist.map(blog =>{
      return _blog.id === blog.id ? _blog: blog;
    });
    return{
      ...state,
      bloglist:updateblog,
      // isloaded:false
    }
  }),

  // 刪除資料
  on(deleteblog, (state, action) =>{
    const updateblog = state.bloglist.filter((data:BlogModel) =>{
      return data.id !== action.id
    });
    return{
      ...state,
      bloglist:updateblog,
      // isloaded:false
    }
  }),

  on(loadspinner, (state, action) =>{
    return{
      ...state,
      isloaded:action.isloaded
    }
  })
)

export function blogReducer(state:any, action:any){
  return _blogReducer(state, action);
}
