import ChatUserItem from './ChatUserItem'

export default function ChatUserBox(props) {
    const nodeList = props.items.map(item => <ChatUserItem key={item.username} onChat={props.onChat} startChat={props.startChat} username={item.username} unread={item.unread} socket={props.socket} />)
    return (
        <div className="link-chat-user-item-box">
            {nodeList}
        </div>
    )
}
