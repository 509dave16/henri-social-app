import { Model, fk, many, attr } from 'redux-orm'

class Todo extends Model {
}

Todo.modelName = 'Todo'
Todo.idAttribute = 'id'
Todo.fields = {
  id: attr(),
  description: attr(),
  complete: attr(),
}

export default Todo