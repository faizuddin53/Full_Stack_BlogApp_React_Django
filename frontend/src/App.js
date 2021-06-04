import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './containers/Home'
import Login from './containers/Login';
import Signup from './containers/Signup';
import CreateBlog from './containers/blog/CreateBlog';
import EditBlogs from './containers/blog/EditBlogs';
import ViewBlogs from './containers/blog/ViewBlogs'
import { Provider } from 'react-redux';
import store from './store'
import Layout from './hocs/Layout';
import AllBlog from './containers/blog/AllBlog';
const App = () => {
    return (
    <div >   
    <Provider store={store}>
        <Router>
            <Layout>
                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route exact path='/login' component={Login} />
                    <Route exact path='/signup' component={Signup} />
                    <Route  exact path="/createblog" component = {CreateBlog}/>
					<Route exact path="/blog" component = {ViewBlogs}/>
                    <Route exact path="/Allblog" component = {AllBlog}/>
                    <Route exact path="/EditBlogs/:id" component = {EditBlogs}/> 
                </Switch>
            </Layout>
        </Router>
    </Provider>
    </div>
);
}

export default App;