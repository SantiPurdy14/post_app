import React, {Component} from 'react';
import GoogleLogin from 'react-google-login';
import { Redirect } from 'react-router-dom';
import App from '../../../App';
import './Login.css';

class Login extends Component {
    state = {};

    render() {
        const onSuccess = (response) => {
            sessionStorage.setItem('TokenSession', JSON.stringify(response));
            window.location.reload(<App />);
        }

        const onFailure = (response) => {
            console.log(response)
        }

        if (sessionStorage.getItem('TokenSession')) {
            return (<Redirect to={'/home/'} />);
        }

        return (
            <div className='login'>
                <img src='https://titamedia.com/wp-content/uploads/2021/01/liga-tita@2x.png' />
                <h1>Iniciar sesion</h1>
                <div className='login-two'>
                <GoogleLogin
                    clientId="874043082508-4h9lc7pk81cnso35k2r2n39kogjriek9.apps.googleusercontent.com"
                    buttonText="Login"
                    onSuccess={onSuccess}
                    onFailure={onFailure}
                    cookiePolicy={'single_host_origin'}
                />
                </div>
            </div>
        );
    }

}
export default Login