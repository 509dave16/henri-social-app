import * as React from 'react'
import { ScrollView, Text, StyleSheet } from 'react-native'
import { List } from 'material-bread'

import Todo from './Todo'

import produce from 'immer'
import { getTodos } from '../../../services/jsonPlaceholder'

let mockTodos = [
  {
    id: 9,
    description: 'Cyberpunk 2077',
    complete: false,
  },
  {
    id: 8,
    description: 'Marvel\'s Avengers',
    complete: false,
  },
  {
    id: 7,
    description: 'Watch Dogs: Legion',
    complete: false,
  },
  {
    id: 6,
    description: 'Halo: Infinite',
    complete: false,
  },
  {
    id: 5,
    description: 'Avowed',
    complete: false,
  },
  {
    id: 4,
    description: 'Call of Duty: Modern Warfare',
    complete: true,
  },
  {
    id: 3,
    description: 'Borderlands 3',
    complete: true,
  },
  {
    id: 2,
    description: 'Division 1',
    complete: true,
  },
  {
    id: 1,
    description: 'Division 2',
    complete: true,
  }
]
mockTodos = []

async function fetchTodos(setTodosState) {
  const response = await getTodos()
  // console.log('<<<TODOS - ', response.result[0])
  setTodosState(response.result)
}

function Todos({ todos = mockTodos }) {
  const [todosState, setTodosState] = React.useState(todos)
  React.useEffect(() => {
    fetchTodos(setTodosState)
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