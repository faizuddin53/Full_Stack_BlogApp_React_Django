import React, {useEffect} from 'react';
import {connect } from 'react-redux'
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {Allblogs,DeleteBlogs,EditBlogs} from '../../actions/blog'
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 300,
    margin:'auto',
  },
  media: {
    height: 200,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  root: {
    flexGrow: 1,
    margin:'auto',
  },
}));



function ViewBlogs(props) {
    const classes = useStyles();
    useEffect(() => {
        if (!localStorage.getItem('username')){
            props.history.push('/login')
        }
        else{
            axios.get(`${process.env.REACT_APP_API_URL}/blog/`, {headers: {
                'Authorization': `Bearer ${localStorage.getItem("access")}`,
            }})
            .then(res => {
                props.allBlogs(res.data)
            })
            .catch(err => {
                console.log(err)
            })
        }
    },[])


   const handleDelete=(id, index)=>{
        axios.delete(`${process.env.REACT_APP_API_URL}/blog/${id}/`)
            .then(res => {
                console.log(res.data)
                props.deleteBlog(index)
                props.history.push('/')
            })
            .catch(err => {
                console.log(err)
            })
            
    }

  const handleEdit  = (id) => {
    props.history.push(`/EditBlogs/${id}`)
    
  }
    return (
        <div className={classes.root}>
              <Grid container spacing ={0}>
                     {props.blogs.map((item, index) => {
                         return (
                                    <>
                                        <Card >
                                          <CardHeader
                                            avatar={
                                              <Avatar aria-label="recipe" className={classes.avatar}>
                                                {props.userDetail.username}
                                              </Avatar>
                                            }
                                            action={
                                              <IconButton aria-label="settings">
                                                <MoreVertIcon />
                                              </IconButton>
                                            }
                                            title={item.title}
                                            subheader={new Date(item.date_published).toDateString()}
                                          />
                                          <CardMedia
                                            className={classes.media}
                                            image={`http://127.0.0.1:8000${item.image}`}
                                            title={item.title}
                                          />
                                           <CardContent>
                                            <Typography variant="body1" color="textSecondary" component="p">
                                             {item.body}
                                            </Typography>
                                          </CardContent>
                                        <IconButton aria-label="add to favorites">
                                            <FavoriteIcon />
                                        </IconButton>
                                         <IconButton aria-label="share">
                                            <ShareIcon />
                                         </IconButton>
                                           {props.userDetail.is_superuser ||
                                             props.userDetail.id === item.author?                
                                                    <>
                                                        <IconButton aria-label="delete">
                                                                <DeleteIcon onClick={()=> handleDelete(item.id, index)} />
                                                        </IconButton>
                                                        <IconButton aria-label="Edit">
                                                            <EditIcon onClick={()=> handleEdit(item.id)}/>
                                                        </IconButton>
                                                    </>
                                                        :
                                                    <></>
                                          }
                            
                                        </Card>
                                        </>
                                      );
                    
                })
                }
      </Grid>     
        </div>
    );
}

const mapStateToProps = (state) => {
  return {

        blogs: state.blogreducers.blogs ? state.blogreducers.blogs:[],
        isAuthenticated: state.authreducer.isAuthenticated,
        userDetail: state.authreducer
  } 
}

const mapDispatchToProps = (dispatch) => {
    return {
        allBlogs: (val) => dispatch({type:'ALL_BLOGS',payload:val}),
        deleteBlog: (val)=>dispatch({type: "DELETE_BLOG", payload: val}),
        editBlog:(val)=>dispatch({type:'EDIT_BLOG', payload:val}),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewBlogs);


 
