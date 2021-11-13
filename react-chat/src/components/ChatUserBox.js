import ChatUserItem from './ChatUserItem'

export default function ChatUserBox(props) {
    const nodeList = props.usernames.map((user, index) => <ChatUserItem key={index} username={user.username} />)
    return (
        <div className="link-chat-user-item-box">
            {nodeList}
        </div>
    )
}
