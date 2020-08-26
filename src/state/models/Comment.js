import { Model, fk, many, attr } from 'redux-orm'
import * as actions from '../actions'

class Comment extends Model {
  static reducer(action, StaticComment, session) {
    const { Comment } = session
    switch(action.type) {
      case actions.INSERT_COMMENTS:
        if (action.payload?.length) {
          action.payload.forEach(comment => Comment.create(comment))
        }
        break
    }
  }
}

Comment.modelName = 'Comment'
Comment.idAttribute = 'id'
Comment.fields = {
  id: attr(),
  postId: fk({ to: 'Post', as: 'posts', relatedName: 'comments' }),
  body: attr(),
  name: attr(),
  profileImage: attr(),
}

export default Comment