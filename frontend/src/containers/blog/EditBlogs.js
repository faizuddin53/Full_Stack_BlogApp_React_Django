import React ,{useState} from 'react'
import {connect} from 'react-redux'
// import { Form, Button, Container, InputGroup } from 'react-bootstrap'
import TextareaAutosize from 'react-textarea-autosize'
import axios from 'axios';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';

// import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import { useParams } from 'react-router';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {Edit} from '../../actions/blog'



const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function EditBlogs(props) {


 
   const {Edit} = props;
  const {id}= useParams();
  console.log('param id',id)
    const classes = useStyles();
    console.log("id",id)
    const [editdata , setEdit] = useState({
            title:'',
            body:'',
            image:''
    });
    const {title, body, image} = editdata;

const onChange = (e) => setEdit({...editdata, [e.target.name]: e.target.value});

const onSubmit = (e) => {
    e.preventDefault();
     console.log("in a edit onSumbuit",id)
     Edit(id,title,body)
     props.history.push('/blog')

};
        
     return(
            <div>
                 <Container component="main" maxWidth="xs" >
          <CssBaseline />
          <div className={classes.paper}>
            <form className={classes.form} noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                   
                    name="title"
                    variant="outlined"
                    type='text'
                    required
                    fullWidth
                    label="title"
                    value={title}
                    onChange={e => onChange(e)}
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12}>
                <TextField
                   
                    name="body"
                    variant="outlined"
                    type='text'
                    required
                    fullWidth
                    label="body"
                    value={body}
                    onChange={e => onChange(e)}
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12}>
                <TextField
                   
                    name="image"
                    variant="outlined"
                    type='file'
                    required
                    fullWidth
                    label="image"
                    value={image}
                    onChange={e => onChange(e)}
                    autoFocus
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={(e)=>onSubmit(e)}
              >
                UPDATE 
              </Button>
            </form>
          </div>
        
        </Container>
            </div>
        )
    
}

const mapStateToProps =  (state)  =>  {
    console.log(state,'state in detailsview')
     return {
   
           blogs: state.blogreducers.blogs ? state.blogreducers.blogs:[],
           isAuthenticated: state.authreducer.isAuthenticated,
        //    userDetail: state.authreducer.username != null ? state.authreducer:false,
        //    detailBlog : state.blogreducers.detailBlog.id != null ? state.blogreducers.detailBlog : false,
         } 
 
   }
   
  const mapDispatchToProps = (dispatch) => {
       return {
           allBlogs: (val) => dispatch({type:'ALL_BLOGS',payload:val}),
           deleteBlog: (val)=>dispatch({type: "DELETE_BLOG", payload: val}),
           Edit: (id,title,body, image)=>dispatch(Edit(id,title,body))
       }
   }
 
 
 export default connect(mapStateToProps,mapDispatchToProps)(EditBlogs)
 
 
