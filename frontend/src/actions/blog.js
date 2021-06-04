import axios from 'axios';
import  { 
    ALL_BLOGS,
    ADD_BLOG,
    DELETE_BLOG,
    EDIT_BLOG,
    DONE_EDITING,
    VIEW_BLOG,
   }
   from './types'

   export const  Allblogs = ()=> async dispatch => {
      const config ={
          headers:{
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem("access")}`,
          }
      }
      try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/blog/`, config);
            // console.log(res.data);
            dispatch({
                  type: 'ALL_BLOGS', 
                  payload: res.data
            })
         }
    catch{     
    }
   }
//    export const  DeleteBlogs = (id,index)=> async dispatch => {
//       const config ={
//             headers:{
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${localStorage.getItem("access")}`,
//             }
//         }
//     try {
//           const res = await axios.get(`${process.env.REACT_APP_API_URL}/blog/${id}/`, config);
//           console.log(res.data,"blog delete");
//           console.log(index,"index val")
//           dispatch({
//                 type: ' DELETE_BLOG', 
//                 payload: index
//           })
//        }
//   catch{     
//   }
//  };

 export const  Edit = (id,title,body)=> async dispatch => {
     console.log(id,'id h edit wale m')
    //  console.log(editData,'editdata')
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        };
        const b = JSON.stringify({title,body});

    
    try {
          const res = await axios.put(`${process.env.REACT_APP_API_URL}/blog/${id}/`,b,config);
          dispatch({
                type: ' EDIT_BLOG', 
                payload: res.data
          })
       }
  catch{     
  }
 }
};

 