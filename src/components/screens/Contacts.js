import * as React from 'react'
import { StyleSheet, FlatList } from 'react-native'
import { Avatar } from 'material-bread'
import { useScrollToTop } from '@react-navigation/native'

import ProfileBanner from '../widgets/ProfileBanner'
import LoadingIndicator from '../widgets/LoadingIndicator'

import { connect, useDispatch } from 'react-redux'
import { getUsers } from '../../services/jsonPlaceholder'
import users from '../../config/mockData/users'
import * as actions from '../../state/actions'
import * as selectors from '../../state/selectors'

const debug = false
const mockUsers = debug ? users : []

async function fetchUsers(dispatch) {
  const response = await getUsers()
  dispatch(actions.ormInsertUsers(response.result))
}

function renderItem({ item: user }) {
  return (
    <ProfileBanner 
      key={`user${user.id}`}
      profileImage={user.profileImage}
      text={user.name}
      secondaryText={user.email}
      actionItem={<Avatar type="icon" content="phone" size={40} color="white" contentColor="green" />}
    />
  )
}

const itemHeight = 74
function getItemLayout(data, index) {
  return { length: itemHeight, offset: itemHeight * index, index }
}

function keyExtractor(user) {
  return `${user.id}`
}

function Contacts({ users = mockUsers}) {
  const dispatch = useDispatch()
  const ref = React.useRef(null)
  useScrollToTop(ref)
  React.useEffect(() => {
    !debug && fetchUsers(dispatch)
    return () => {}
  }, [])

  if (users.length === 0) {
    return <LoadingIndicator />
  }
  return (
    <FlatList
      ref={ref}
      style={styles.list}
      data={users}
      renderItem={renderItem}
      getItemLayout={getItemLayout}
      keyExtractor={keyExtractor}
    />
  )
}

const styles = StyleSheet.create({
  list: {
    backgroundColor: '#f2f2f2'
  }
})

const mapStateToProps = (state) => ({ users: selectors.users(state) })
export default connect(mapStateToProps)(Contacts)