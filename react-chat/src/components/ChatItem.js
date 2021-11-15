export default function ChatItem(props) {
    let element;
    if (props.sent) {
        element = <div className={props.position === "sender" ? "chat-item-actions" : "chat-item-actions chat-item-actions-others"}>
            <i className="fas fa-trash"></i>
        </div>
    } else {
        element = <div className={props.position === "sender" ? "chat-item-actions" : "chat-item-actions chat-item-actions-others"}>
            <i className="fas fa-redo-alt" onClick={() => props.resend(props.id, props.receiver, props.content)}></i>
        </div>
    }

    return (
        <form className="chat-item-container chat-item-container-others">
            <input type="checkbox" className="checkbox-chat-item checkbox-chat-item-others" />
            <div className={props.position === "sender" ? "sub-chat-item" : "sub-chat-item sub-chat-item-others"}>
                {element}
                <div className={props.position === "sender" ? "chat-item" : "chat-item chat-item-others"}>{props.content}</div>
            </div>
        </form>
    )
}