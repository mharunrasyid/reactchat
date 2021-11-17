import React, { Component } from "react";

export default class ChatItem extends Component {
    constructor(props) {
        super(props)
        this.state = { btnCheck: false }
    }

    render() {
        let element;

        if (this.props.sent) {
            if (this.state.btnCheck) {
                element = 
                <div className={this.props.position === "sender" ? "chat-item-actions" : "chat-item-actions chat-item-actions-others"} 
                onClick={() => this.props.position === "sender" ? this.props.delete(this.props.id, localStorage.getItem("username"), this.props.receiver) : this.props.delete(this.props.id, this.props.receiver, localStorage.getItem("username"))}>
                    <i className="fas fa-trash"></i>
                </div>
            }
        } else {
            element = <div className={this.props.position === "sender" ? "chat-item-actions" : "chat-item-actions chat-item-actions-others"}>
                <i className="fas fa-redo-alt" onClick={() => this.props.resend(this.props.id, this.props.receiver, this.props.content)}></i>
            </div>
        }

        return (
            <form className="chat-item-container chat-item-container-others">
                <input type="checkbox" className="checkbox-chat-item checkbox-chat-item-others" />
                <div className={this.props.position === "sender" ? "sub-chat-item" : "sub-chat-item sub-chat-item-others"}>
                    {element}
                    <div className={this.props.position === "sender" ? "chat-item" : "chat-item chat-item-others"} 
                    onClick={() => this.setState(prevState => ({
                        btnCheck: !prevState.btnCheck
                    }))}>{this.props.content}</div>
                </div>
            </form>
        )
    }
}