import { Model, fk, many, attr } from 'redux-orm'
import produce from 'immer'
import * as actions from '../actions'

class Post extends Model {
  static reducer(action, StaticPost, session) {
    const { Post } = session
    switch(action.type) {
      case actions.INSERT_POSTS:
        action.payload.forEach(post => {
          post.createdAt = Date.now()
          Post.create(post)
        })
        break
      case actions.DELETE_POST:
        Post.filter({ id: action.payload.id }).delete()
        Post.markFullTableScanned()
        break
      case actions.CREATE_POST:
        delete action.payload.user
        const newPost = produce(action.payload, draft => {
          delete draft.user
          draft.createdAt = Date.now()
        })
        Post.create(newPost)
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
  createdAt: attr(),
}

export default Post