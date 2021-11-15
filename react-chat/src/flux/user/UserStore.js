import Immutable from 'immutable';
import { ReduceStore } from 'flux/utils';
import dispatcher from '../Dispatcher';

class UserStore extends ReduceStore {
    constructor() {
        super(dispatcher);
    }

    getInitialState() {
        return Immutable.OrderedMap();
    }

    reduce(state, action) {
        switch (action.type) {
            case "DRAW_USER":
                return Immutable.OrderedMap(
                    action.users.map(user => {
                        return [user._id, user]
                    })
                );

            default:
                return state;
        }
    }
}

export default new UserStore();