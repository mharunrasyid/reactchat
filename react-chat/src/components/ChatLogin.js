import React, { Component } from "react";
import { Navigate } from 'react-router-dom';
import '../style.css';

import axios from 'axios'

const request = axios.create({
    baseURL: 'http://localhost:3001/api/',
    timeout: 1000,
    headers: { 'X-Custom-Header': 'foobar' }
});

export default class ChatLogin extends Component {
    constructor(props) {
        super(props)
        this.state = { value: '', redirect: false }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ value: event.target.value.trim() });
    }

    handleSubmit(event) {
        let username = this.state.value
        request.post("users/login", { username }).then((res) => {
            this.setState({ redirect: true })
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("username", res.data.data.username);
        }).catch((err) => {
            console.log(err);
        })

        this.setState({ value: "" });

        event.preventDefault();
    }

    render() {
        if (this.state.redirect) {
            return <Navigate to="/" />
        }

        return (
            <div className="container-chatlogin">
                <div className="chatlogin-box">
                    <header className="header-chatlogin">LOGIN</header>
                    <form onSubmit={this.handleSubmit} className="form-chatlogin">
                        <input type="text" className="input-chatlogin" placeholder="Username" value={this.state.value} onChange={this.handleChange} required />
                        <input type="submit" value="LOG IN" className="btn-chatlogin" />
                    </form>
                </div>
            </div>
        )
    }
}