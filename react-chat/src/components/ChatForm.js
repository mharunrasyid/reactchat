import React, { Component } from 'react'

export default class ChatForm extends Component {
    constructor(props) {
        super(props);
        this.state = { content: '' };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.auto_grow = this.auto_grow.bind(this);
    }

    handleChange(event) {
        this.setState({ content: event.target.value });
    }

    handleSubmit(event) {
        const id = Date.now()

        if (this.state.content.trim()) {
            this.props.add(id, this.props.receiver, this.state.content);
            console.log("test", this.props.receiver);
            this.props.socket.emit("addChat", { id, content: this.state.content, room: this.props.room, receiver: this.props.receiver, sender: localStorage.getItem("username") })
        }

        this.setState({ content: "" });
        event.target.querySelector('textarea').style.height = "30px";
        event.preventDefault();
    }

    auto_grow(event) {
        event.target.style.height = "5px";
        event.target.style.height = (event.target.scrollHeight) + "px";
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit} className="chatform-chatbox">
                <textarea value={this.state.content} onChange={this.handleChange} onInput={this.auto_grow} className="chatinput-chatbox" placeholder="Write a message..."></textarea>
                <button type="submit" className="chatbtn-chatbox">
                    <i className="far fa-paper-plane"></i>
                </button>
            </form>
        );
    }
}