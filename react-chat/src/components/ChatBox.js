import React, { Component } from "react";
import ChatUserBox from './ChatUserBox'
import ChatForm from './ChatForm';
import { Navigate } from 'react-router-dom';
import '../style.css';
import axios from 'axios'

const request = axios.create({
    baseURL: 'http://localhost:3001/api/',
    timeout: 1000,
    headers: { 'X-Custom-Header': 'foobar' }
});


export default class ChatBox extends Component {
    constructor(props) {
        super(props)
        this.state = {
            chat: [
                { username: "rasyid" },
                { username: "fatih" },
            ],
            redirect: false
        }

        this.logout = this.logout.bind(this);
    }

    componentDidMount() {
        if (!localStorage.getItem("token")) {
            return this.setState({ redirect: true })
        }
    }

    logout() {
        request.get("users/destroy", { headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` } }).then((res) => {
            this.setState({ redirect: true })
            localStorage.removeItem("token");
        }).catch((err) => {
            console.log(err);
        })
    }


    render() {
        if (this.state.redirect) {
            return <Navigate to="/login" />
        }

        return (
            <div className="container-chatbox">
                <main className="main-chatbox">
                    <div className="sidebar-chatbox">
                        <div className="title-sidebar-chatbox">Contacts</div>
                        <ChatUserBox usernames={this.state.chat} />
                        <button className="btn-logout" onClick={this.logout}>LOG OUT</button>
                    </div>
                    <div className="content-chatbox">
                        <div className="content-header-chatbox">
                            rasyid
                            <i className="fas fa-ellipsis-v kebab-icon"></i>
                        </div>
                        <div className="content-main-chatbox">
                            <div></div>
                            <ChatForm />
                        </div>
                    </div>
                </main>
            </div>
        )
    }
}