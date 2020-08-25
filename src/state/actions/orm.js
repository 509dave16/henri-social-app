
export const INSERT_USERS = 'orm/INSERT_USERS'
export const INSERT_POSTS = 'orm/INSERT_POSTS'
export const INSERT_COMMENTS = 'orm/INSERT_COMMENTS'
export const INSERT_TODOS = 'orm/INSERT_TODOS'

export const DELETE_POST = 'orm/DELETE_POST'

export const CREATE_POST = 'orm/CREATE_POST'

export function ormInsertUsers(users) {
  return { type: INSERT_USERS, payload: users }
}

export function ormInsertPosts(posts) {
  return { type: INSERT_POSTS, payload: posts }
}

export function ormInsertComments(comments) {
  return { type: INSERT_COMMENTS, payload: comments }
}

export function ormInsertTodos(todos) {
  return { type: INSERT_TODOS, payload: todos }
}

export function ormDeletePost(post) {
  return { type: DELETE_POST, payload: post}
}

export function ormCreatePost(post) {
  return { type: CREATE_POST, payload: post}
}