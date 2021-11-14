import React, { Component } from "react";
import ChatUserBox from './ChatUserBox'
import ChatItemBox from './ChatItemBox'
import ChatForm from './ChatForm';
import { Navigate } from 'react-router-dom';
import '../style.css';

export default class ChatBox extends Component {
    constructor(props) {
        super(props)
        this.state = {
            redirect: false
        }

        this.logout = this.logout.bind(this);
    }

    componentDidMount() {
        if (!localStorage.getItem("token")) {
            return this.setState({ redirect: true })
        }

        this.props.onLoad()
    }

    logout() {
        this.props.onLogout()
        this.setState({ redirect: true })
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
                        <ChatUserBox usernames={this.props.users} />
                        <button className="btn-logout" onClick={this.logout}>LOG OUT</button>
                    </div>
                    <div className="content-chatbox">
                        <div className="content-header-chatbox">
                            rasyid
                            <i className="fas fa-tasks kebab-icon"></i>
                        </div>
                        <div className="content-main-chatbox">
                            <div className="chatcontainer-chatbox">
                                <ChatItemBox contents={this.props.users} />
                            </div>
                            <ChatForm />
                        </div>
                    </div>
                </main>
            </div>
        )
    }
}