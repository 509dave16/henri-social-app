import * as React from 'react'
import { ScrollView, Text, StyleSheet } from 'react-native'
import { List } from 'material-bread'

import LoadingIndicator from '../../widgets/LoadingIndicator'
import Todo from './Todo'

import produce from 'immer'
import { getTodos } from '../../../services/jsonPlaceholder'
import todos from '../../../config/mockData/todos'

const debug = false
let mockTodos = debug ? todos : []

async function fetchTodos(setTodosState) {
  const response = await getTodos()
  // console.log('<<<TODOS - ', response.result[0])
  setTodosState(response.result)
}

function Todos({ todos = mockTodos }) {
  const [todosState, setTodosState] = React.useState(todos)
  React.useEffect(() => {
    !debug && fetchTodos(setTodosState)
    return () => {}
  }, [])
  const onPress = (id, complete) => {
    setTodosState(prevTodosState => {
      return produce(prevTodosState, draft => {
        const todoToEdit = draft.find(todo => todo.id === id)
        todoToEdit.complete = complete
      })
    })
  }

  if (todosState.length === 0) {
    return <LoadingIndicator />
  }

  return (
    <ScrollView>
      <List style={styles.list}>
        { todosState.map(todo => <Todo key={todo.id} todo={todo} text={todo.description} onPress={onPress}/>)}
      </List>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  list: {
    backgroundColor: '#f2f2f2'
  }
})

export default Todos