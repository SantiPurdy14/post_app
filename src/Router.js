import React, { Component } from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Login from './App/Views/Login/Login';
import Home from './App/Views/Home/Home';
import './App/Components/Header/Header.css'
class Routers extends Component {
    state = {
        userLogged: []
    };

    componentWillMount() {
        if (sessionStorage.getItem('TokenSession')) {
            let user = JSON.parse(sessionStorage.getItem('TokenSession'))
            this.setState({ userLogged: user.profileObj })
        }
    }

    render() {

        const { userLogged } = this.state

        if (!sessionStorage.getItem('TokenSession')) {
            return (
                <Router basename={process.env.PUBLIC_URL}>
                    <div className="contenedor">
                        <Switch>
                            <Route exact path="/" component={Login} />
                            <Route exact path="/login" component={Login} />
                            <Route exact path="/home" component={Home} />
                        </Switch>
                    </div>
                </Router>
            );
        } else {
            return (
                <Router basename={process.env.PUBLIC_URL}>
                    <div className='header'>
                        <div className='header-logo'>
                        <img src='https://titamedia.com/wp-content/uploads/2021/01/liga-tita@2x.png' />
                        </div>
                        <br/>
                        <div className='header-user'>
                            <img src={userLogged.imageUrl} />
                            <p>{userLogged.name}</p>
                        </div>
                    </div>
                    <div className="contenedor">
                        <Switch>
                            <Route exact path="/" component={Login} />
                            <Route exact path="/login" component={Login} />
                            <Route exact path="/home" component={Home} />
                        </Switch>
                    </div>
                </Router>
            );
        }
    }

}
export default Routers;