import Immutable from 'immutable'

const User = Immutable.Record({
    _id: 0,
    username: '',
    chat: {}
});

export default User