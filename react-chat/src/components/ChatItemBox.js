import ChatItem from './ChatItem'

export default function ChatItemBox(props) {
    const nodeList = [...props.contents.values()].map(item => <ChatItem key={item.id} id={item.id} content={item.content} position={item.role} sent={item.sent} resend={props.resend} delete={props.delete} receiver={props.receiver} />)
    return (
        <div className="chat-item-box">
            {nodeList}
            <div className="scroll-btn" onClick={()=> props.scrolltobottom()}>
                <i className="fas fa-chevron-down"></i>
            </div>
        </div>
    )
}