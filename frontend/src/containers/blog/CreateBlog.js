import axios from 'axios';
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form, Button, Container, InputGroup } from 'react-bootstrap'
import TextareaAutosize from 'react-textarea-autosize'
import { Allblog} from '../../actions/blog'

class CreateBlog extends Component{
    
    constructor(props){
        super(props)
        this.state = {
            title:"",
            body:"",
            image:""
        }

        this.ref = React.createRef()
    }
   
    componentDidMount(){
        if (!localStorage.getItem('username')){
            this.props.history.push('/login')
        }

    }

    handleChange=(event)=>{
        this.setState({[event.target.name]:event.target.value})
    }

    handleImageChange = (evt) =>{
        this.setState({image:evt.target.files[0]})
    }

    addThisBlog = (evt)  =>  {
        // console.log(this.state)
        let postForm = new FormData()

        postForm.append("title", this.state.title)
        postForm.append("body", this.state.body)
        postForm.append("image", this.state.image, this.state.image.name)
        postForm.append("author", this.props.id)
        // console.log(this.props.state.authreducer.id)
        // console.log(postForm)
        
     
   console.log(localStorage)
        axios.post(`${process.env.REACT_APP_API_URL}/blog/`, postForm, {headers: {
            'content-type': 'multipart/form-data',
            'Authorization': `Bearer ${localStorage.getItem("access")}`,
        }
        }).then(res=>{
            // console.log(res.data)
            this.setState({ title:"", body:"", image:null})
            this.ref.current.value = null  
            
            this.props.history.push('/blog')
        }).catch(err=>{
            // console.log(err)
        })
    }

    styles = {

        width:'70%',
        color:"#1f462b",
    }

    render(){
        const {title, body} = this.state 
        
        return(
            <div>
                <Container className='m-4 mx-auto' style={this.styles}>
                    <Form>
                        <Form.Group>
                            <Form.Label>Title of your blog</Form.Label>
                            <InputGroup>
                                <Form.Control name="title" type="text" placeholder="Type your title here" 
                                    onChange={(event)=>{this.handleChange(event)}} value={title} autoFocus={true}/>
                            </InputGroup>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Body</Form.Label>
                            <InputGroup>
                                <TextareaAutosize style={{width:'100%'}} name="body" as= "TextareaAutosize" minRows={3}
                                    maxRows={6} placeholder="Body" value={body}
                                    onChange={(event)=>{this.handleChange(event)}}/>
                            </InputGroup>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Image</Form.Label>
                            <InputGroup>
                                <Form.Control name="image" type="file" ref={this.ref}
                                    onChange={(event)=>{this.handleImageChange(event)}}/>
                            </InputGroup>
                        </Form.Group>

                        <Button variant="outline-primary" onClick={()=>{this.addThisBlog()}}>Add Blog</Button>
                    </Form>
                </Container>
            </div>
        )
    }
}

const mapStateToProps=(state)=>{
    // console.log(state)
    return{
        isAuthenticated: state.authreducer.isAuthenticated,
        username: state.authreducer.username,
        id :state.authreducer.id,
    }
}

const mapdispatchToProps=(dispatch) => {
    return {
        addThisBlog: (val) =>dispatch( {type:'ADD_BLOG', payload:val})
    }
}

export default connect(mapStateToProps,mapdispatchToProps)(CreateBlog)