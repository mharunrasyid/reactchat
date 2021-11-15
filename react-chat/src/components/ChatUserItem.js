import React, { Component } from "react";

export default class ChatUserItem extends Component {
    constructor(props) {
        super(props)

        this.startChat = this.startChat.bind(this);
    }

    startChat(event) {
        this.props.startChat(this.props.username)
        let element = document.querySelectorAll(".link-chat-user-item");

        element.forEach(item => {
            item.style.background = "rgb(248, 248, 248)"
            item.style.color = "rgba(0, 0, 0, 0.6)"
        });

        event.target.style.background = "#2d95f6"
        event.target.style.color = "white"
    }

    render() {
        return <div className="link-chat-user-item" onClick={this.startChat}>{this.props.username}</div>
    }
}