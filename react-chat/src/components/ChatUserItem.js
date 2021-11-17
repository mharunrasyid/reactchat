import React, { Component } from "react";

export default class ChatUserItem extends Component {
    constructor(props) {
        super(props)

        this.startChat = this.startChat.bind(this);
    }

    startChat(event) {
        this.props.startChat(this.props.username)
        let elements = document.querySelectorAll(".link-chat-user-item");

        elements.forEach(item => {
            item.style.background = "rgb(248, 248, 248)"
            item.style.color = "rgba(0, 0, 0, 0.6)"
        });

        if (event.target.classList.contains("chat-notif")) {
            event.target.parentNode.style.background = "#2d95f6"
            event.target.parentNode.style.color = "white"
        } else {
            event.target.style.background = "#2d95f6"
            event.target.style.color = "white"
        }

        this.props.socket.emit("invite-partner", this.props.username, localStorage.getItem("username"))
    }

    render() {
        return (
            <div className="link-chat-user-item" onClick={this.startChat}>
                {this.props.username}
                {this.props.unread > 0 && <div className="chat-notif">{this.props.unread}</div>}
            </div>
        )
    }
}