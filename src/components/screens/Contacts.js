import * as React from 'react'
import { StyleSheet, ScrollView } from 'react-native'
import { List } from 'material-bread'

import ProfileBanner from '../widgets/ProfileBanner'

import { getUsers } from '../../services/jsonPlaceholder'
import users from '../../config/mockData/users'

const debug = false
const mockUsers = debug ? users : []

async function fetchUsers(setUsersState) {
  const response = await getUsers()
  // console.log('<<<TODOS - ', response.result[0])
  setUsersState(response.result)
}

function Contacts({ users = mockUsers}) {
  const [usersState, setUsersState] = React.useState(users)
  React.useEffect(() => {
    !debug && fetchUsers(setUsersState)
    return () => {}
  }, [])
  return (
    <ScrollView>
      <List style={styles.list}>
        { usersState.map(user => <ProfileBanner key={user.id} profileImage={user.profileImage} text={user.name} secondaryText={user.email} />)}
      </List>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  list: {
    backgroundColor: '#f2f2f2'
  }
})

export default Contacts