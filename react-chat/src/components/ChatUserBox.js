import ChatUserItem from './ChatUserItem'

export default function ChatUserBox(props) {
    const nodeList = [...props.usernames.values()].map((user, index) => <ChatUserItem key={index} onChat={props.onChat} startChat={props.startChat} username={user.username} />)
    return (
        <div className="link-chat-user-item-box">
            {nodeList}
        </div>
    )
}
