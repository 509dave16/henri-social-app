import { Model, fk, many, attr } from 'redux-orm'
import * as actions from '../actions'

class Post extends Model {
  static reducer(action, StaticPost, session) {
    const { Post } = session
    switch(action.type) {
      case actions.INSERT_POSTS:
        action.payload.forEach(post => Post.create(post))
        break
      case actions.DELETE_POST:
        Post.filter({ id: action.payload.id }).delete()
        break
    }
  }
}

Post.modelName = 'Post'
Post.idAttribute = 'id'
Post.fields = {
  id: attr(),
  userId: fk({ to: 'User', as: 'user', relatedName: 'posts' }),
  title: attr(),
  story: attr(),
  upload: attr(),
}

export default Post