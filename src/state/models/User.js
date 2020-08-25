import { Model, fk, many, attr } from 'redux-orm'
import * as actions from '../actions'
class User extends Model {
  static reducer(action, StaticUser, session) {
    const { User } = session
    switch(action.type) {
      case actions.INSERT_USERS:
        action.payload.forEach(user => User.create(user))
        break
    }
  }
}

User.modelName = 'User'
User.idAttribute = 'id'
User.fields = {
  id: attr(),
  name: attr(),
  email: attr(),
  profileImage: attr(),
  phone: attr(),
}

export default User