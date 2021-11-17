import { ReduceStore } from 'flux/utils';
import dispatcher from '../Dispatcher';

class UserStore extends ReduceStore {
    constructor() {
        super(dispatcher);
    }

    getInitialState() {
        return [];
    }

    reduce(state, action) {
        switch (action.type) {
            case "DRAW_USER":
                return action.users

            case "DRAW_NOTIF":
                return state.map(item => {
                    if (item.username === action.data.sender) {
                        item.unread++
                    }
                    return item
                })

            default:
                return state;
        }
    }
}

export default new UserStore();