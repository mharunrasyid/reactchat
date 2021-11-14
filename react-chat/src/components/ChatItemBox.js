import ChatItem from './ChatItem'

export default function ChatItemBox(props) {
    const nodeList = props.contents.valueSeq().map(item => item.chat?.fatih?.map((chat, index) => <ChatItem key={index} content={chat.content} />))
    return (
        <div className="chat-item-box">
            {nodeList}
        </div>
    )
}