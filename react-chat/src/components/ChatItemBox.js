import ChatItem from './ChatItem'

export default function ChatItemBox(props) {
    const nodeList = [...props.contents.values()].map(item => {
        return <ChatItem key={item.id} id={item.id} content={item.content} position={item.role} sent={item.sent} resend={props.resend} delete={props.delete} receiver={props.receiver} room={props.room} socket={props.socket} />
    })
    return (
        <div className="chat-item-box">
            {nodeList}
        </div>
    )
}