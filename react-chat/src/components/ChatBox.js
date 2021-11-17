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
            scrollBtn: false,
            redirect: false
        }

        this.logout = this.logout.bind(this);
        this.startChat = this.startChat.bind(this);
        this.scrollToBottom = this.scrollToBottom.bind(this);
        // this.scrollEl = this.scrollEl.bind(this);
        this.scrollTop = this.scrollTop.bind(this);
    }

    componentDidMount() {
        if (!localStorage.getItem("token")) {
            return this.setState({ redirect: true })
        }

        this.props.onLoad();
        this.scrollToBottom();
    }

    componentDidUpdate() {
        this.scrollToBottom();
    }

    logout() {
        this.props.onLogout()
        this.setState({ redirect: true })
    }

    startChat(receiver) {
        this.props.onReadChat(localStorage.getItem("username"), receiver)
        this.setState({ onChat: true, receiver })
    }

    scrollToBottom() {
        if (this.el) {
            this.el.scrollTop = this.el.scrollHeight
            // if (this.el.offsetHeight + this.el.scrollTop >= this.el.scrollHeight) {
            // } 
        }
    }

    // scrollEl(){
    //     if (this.el.offsetHeight + this.el.scrollTop >= this.el.scrollHeight) {
    //         this.props.onReadChat(localStorage.getItem("username"), this.state.receiver)
    //     } 
    // }

    scrollTop() {
        if (this.el.offsetHeight + this.el.scrollTop <= this.el.scrollHeight - 120) {
            this.setState({ scrollBtn: true })
        } else {
            this.setState({ scrollBtn: false })
        }
    }

    render() {
        if (this.state.redirect) {
            return <Navigate to="/login" />
        }

        let element;

        if (this.state.onChat) {
            element = <div className="chatcontainer-chatbox-container">
                <div className="chatcontainer-chatbox" ref={el => { this.el = el; }}>
                    <ChatItemBox contents={this.props.chats} resend={this.props.onResendChat} delete={this.props.onDeleteChat} receiver={this.state.receiver} scrolltobottom={this.scrollToBottom} />
                </div>
                <ChatForm add={this.props.onAddChat} receiver={this.state.receiver} room={this.props.room} socket={this.props.socket} />
            </div>
        } else {
            element = <div className="select-msg-chatbox-txt">Select a chat to start messaging</div>
        }

        return (
            <div className="container-chatbox">
                <main className="main-chatbox">
                    <div className="sidebar-chatbox">
                        <div className="title-sidebar-chatbox">Contacts</div>
                        <ChatUserBox items={this.props.users} onChat={this.state.onChat} startChat={this.startChat} socket={this.props.socket} />
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