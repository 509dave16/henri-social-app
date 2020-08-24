import * as React from 'react'
import { StyleSheet } from 'react-native'
import { ListItem, Checkbox } from 'material-bread'

function Todo({ style, todo, onPress, ...listItemProps }) {
  const toggleChecked = () => onPress(todo.id, !todo.complete)
  return (
    <ListItem
      style={[styles.listItem, style]}
      actionItem={<Checkbox checked={todo.complete} onPress={toggleChecked} />}
      onPress={toggleChecked}
      {...listItemProps}
    />
  )
}

const styles = StyleSheet.create({
  listItem: {
    backgroundColor: 'white',
    marginBottom: 2
  }
})

export default Todo