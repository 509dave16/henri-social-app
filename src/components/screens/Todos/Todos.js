import * as React from 'react'
import { FlatList, StyleSheet } from 'react-native'

import LoadingIndicator from '../../widgets/LoadingIndicator'
import Todo from './Todo'

import produce from 'immer'
import { getTodos } from '../../../services/jsonPlaceholder'
import todos from '../../../config/mockData/todos'

const debug = false
let mockTodos = debug ? todos : []

async function fetchTodos(setTodosState) {
  const response = await getTodos()
  setTodosState(response.result)
}

function renderItem({ item: todo, index }, onPress) {
  return (<Todo key={todo.id} todo={todo} text={todo.description} onPress={onPress}/>)
}

function renderItemHOF(onPress) {
  return (itemConfig) => renderItem(itemConfig, onPress)
}

const itemHeight = 68
function getItemLayout(data, index) {
  return { length: itemHeight, offset: itemHeight * index, index }
}

function keyExtractor(todo) {
  return `${todo.id}`
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
    <FlatList
      style={styles.list}
      data={todosState}
      renderItem={renderItemHOF(onPress)}
      getItemLayout={getItemLayout}
      keyExtractor={keyExtractor}
      initialNumToRender={20}
    />
  )
}

const styles = StyleSheet.create({
  list: {
    backgroundColor: '#f2f2f2'
  }
})

export default Todos