import  { 
 ALL_BLOGS,
 ADD_BLOG,
 DELETE_BLOG,
 LIKE_THIS_BLOG,
 EDIT_BLOG,
 DONE_EDITING,
 VIEW_BLOG,
}
from '../actions/types'
const initial = {
	blogs: [],
	detailBlog: {id : null, edit: false},
}


export default function blogsReducer(state = initial, action){
    switch (action.type){


        case ALL_BLOGS:
            return{
                ...state, blogs:action.payload
            }

        case ADD_BLOG:
            return{
            ...state, blogs: state.blogs.concat(action.payload)
        }
        
        case DELETE_BLOG:
            return {
              ...state,blogs: state.blogs.filter(item => item.id !== action.payload)
            }
         case EDIT_BLOG:
             return {
                 ...state, blogs: state.blogs.map((item ,ind)=> { if(item.ind == action.payload.id){
                     return {
                         ...item,blogs:item
                     }
                 } } 
                 )
             }


        default:{
            return state
 }
}
}