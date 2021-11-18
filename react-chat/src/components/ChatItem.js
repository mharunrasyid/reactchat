import React, { Component } from "react";

export default class ChatItem extends Component {
    constructor(props) {
        super(props)
        this.state = { btnCheck: false }

        this.deleteChat = this.deleteChat.bind(this);
    }

    deleteChat() {
        if (this.props.position === "sender") {
            this.props.delete(this.props.id, localStorage.getItem("username"), this.props.receiver)
            this.props.socket.emit("deleteChat", { id: this.props.id, room: this.props.room, sender: localStorage.getItem("username"), receiver: this.props.receiver })
        } else {
            this.props.delete(this.props.id, this.props.receiver, localStorage.getItem("username"))
            this.props.socket.emit("deleteChat", { id: this.props.id, room: this.props.room, sender: this.props.receiver, receiver: localStorage.getItem("username") })
        }
    }

    render() {
        let element;

        if (this.props.sent) {
            if (this.state.btnCheck) {
                element =
                    <div className={this.props.position === "sender" ? "chat-item-actions" : "chat-item-actions chat-item-actions-others"}
                        onClick={this.deleteChat}>
                        <i className="fas fa-trash"></i>
                    </div>
            }
        } else {
            element = <div className={this.props.position === "sender" ? "chat-item-actions" : "chat-item-actions chat-item-actions-others"}>
                <i className="fas fa-redo-alt" onClick={() => this.props.resend(this.props.id, this.props.receiver, this.props.content)}></i>
            </div>
        }

        return (
            <div className={this.props.position === "sender" ? "chat-item-container" : "chat-item-container chat-item-container-others"}>
                {element}
                <div className={this.props.position === "sender" ? "chat-item" : "chat-item chat-item-others"}
                    onClick={() => this.setState(prevState => ({
                        btnCheck: !prevState.btnCheck
                    }))}>{this.props.content}</div>
            </div>
        )
    }
}