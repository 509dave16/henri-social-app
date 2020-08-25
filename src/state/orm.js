import { ORM } from 'redux-orm'
import models from './models'

const orm = new ORM({
  stateSelector: state => state.orm
})
orm.register(...models)

export default orm