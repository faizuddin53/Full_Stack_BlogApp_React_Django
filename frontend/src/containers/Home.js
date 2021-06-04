import React, {Component} from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Container,Jumbotron } from 'react-bootstrap'
import './home.css'
class Home extends Component{
    styles = {
        backgroundColor:"#c3bfa2ba", 
        textAlign:"center", 
        width:"70%", 
        marginTop:"30px"
    }
    render(){
        // console.log(this.props)
        return(
            <>
            <div class="home">
                {this.props.username ==null ? 
                <div>
                    <Container>
                        <Jumbotron fluid bg="dark" style={this.styles} className="mt-4 mx-auto">
                            <h1>Hello user!!</h1>
                            <p> <Link to='/login'>Click here</Link> to go to the login page</p><br/>
                            <p>Don't have an account? <Link to='/signup'>Click here</Link> to create Your account</p>
                        </Jumbotron>
                    </Container>
                </div> :
                <div>
                    <Container>
                        <Jumbotron fluid bg="dark" style={this.styles} className="mt-4 mx-auto">
                            <h1>Hello {this.props.username}!!</h1>
                            <p> <Link to = "/viewblogs" >Click Here</Link> to Get to blogs.</p>
                        </Jumbotron>
                    </Container>
                </div>
                }
            </div>
            </>
        )
    }
}

const mapStateToProps= state => {
    // console.log(state)
    return{
    isAuthenticated: state.authreducer.isAuthenticated,
    username: state.authreducer.username,
}
}

export default connect(mapStateToProps)(Home);