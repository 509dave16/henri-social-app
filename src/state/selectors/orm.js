import { createSelector } from 'redux-orm'
import orm from '../orm'

const ormSelector = state => state.orm

export const users = createSelector(orm, ormSelector, session => session.User.all().toRefArray())
export const posts = createSelector(orm, ormSelector, session => session.Post.all().toModelArray().map(item => ({ ...item.ref, user: item.user.ref })))
export const comments = createSelector(orm, ormSelector, session => session.Comment.all())
export const createOrmSelector = (func) => createSelector(orm, ormSelector, func)