import Immutable from 'immutable'

const Chat = Immutable.Record({
    id: '',
    content: '',
    chatdate: new Date(),
    role: 'sender',
    sent: true
});

export default Chat