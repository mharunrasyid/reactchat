import Immutable from 'immutable';
import { ReduceStore } from 'flux/utils';
import Chat from './Chat';
import dispatcher from '../Dispatcher';

class ChatStore extends ReduceStore {
    constructor() {
        super(dispatcher);
    }

    getInitialState() {
        return Immutable.OrderedMap();
    }

    reduce(state, action) {
        switch (action.type) {
            case "DRAW_CHAT":
                return Immutable.OrderedMap(
                    action.chats.map(chat => {
                        chat.sent = true;
                        return [chat.id, chat]
                    })
                );

            case "DRAW_ADD_CHAT":
                return state.set(action.id, new Chat({
                    id: action.id,
                    content: action.content,
                    sent: true
                }));

            case "FAILED_ADD_CHAT":
                return state.set(action.id, new Chat({
                    id: action.id,
                    content: action.content,
                    sent: false
                }));

            case "SUCCESS_RESEND_CHAT":
                return state.setIn([action.id, "sent"], true);

            case "FAILED_RESEND_CHAT":
            case "SUCCESS_ADD_CHAT":
            default:
                return state;
        }
    }
}

export default new ChatStore();