import React from 'react';
import {browserHistory} from  'react-router';

export default class Logout extends React.Component {

    componentWillMount(){
        localStorage.removeItem('auth-token');
        browserHistory.push('/');
    }

    render(){
        return null;
    }
}