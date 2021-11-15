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
            receiver: "Receiver Name",
            onChat: false,
            redirect: false
        }

        this.logout = this.logout.bind(this);
        this.startChat = this.startChat.bind(this);
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

    startChat(receiver) {
        this.props.onLoadChat(receiver)
        this.setState({ onChat: true, receiver })
    }

    render() {
        if (this.state.redirect) {
            return <Navigate to="/login" />
        }

        let element;

        if (this.state.onChat) {
            element = <div className="chatcontainer-chatbox-container">
                            <div className="chatcontainer-chatbox">
                                <ChatItemBox contents={this.props.chats} resend={this.props.onResendChat} receiver={this.state.receiver} />
                            </div>
                            <ChatForm add={this.props.onAddChat} receiver={this.state.receiver} />
                        </div>
        } else {
            element = <div className="select-msg-chatbox-txt">Select a chat to start messaging</div>
        }

        return (
            <div className="container-chatbox">
                <main className="main-chatbox">
                    <div className="sidebar-chatbox">
                        <div className="title-sidebar-chatbox">Contacts</div>
                        <ChatUserBox usernames={this.props.users} onChat={this.state.onChat} startChat={this.startChat} />
                        <button className="btn-logout" onClick={this.logout}>LOG OUT</button>
                    </div>
                    <div className="content-chatbox">
                        <div className="content-header-chatbox">
                            {this.state.receiver}
                            {this.state.onChat && <i className="fas fa-tasks kebab-icon"></i>}
                        </div>
                        <div className="content-main-chatbox">
                            {element}
                        </div>
                    </div>
                </main>
            </div>
        )
    }
}