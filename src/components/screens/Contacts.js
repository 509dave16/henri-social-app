import * as React from 'react'
import { StyleSheet, ScrollView } from 'react-native'
import { List } from 'material-bread'

import ProfileBanner from '../widgets/ProfileBanner'

import { getUsers } from '../../services/jsonPlaceholder'

let mockUsers = [
  {
    id: 1,
    name: 'Leanne Graham',
    profileImage: 'icon/face',
    email: 'sincere@april.biz',
    phone: '123456789',
    phoneCountryCode: '1',
  },
  {
    id: 2,
    name: 'Ervin Howell',
    profileImage: 'icon/face',
    email: 'Shanna@melissa.tv',
    phone: '123456789',
    phoneCountryCode: '1',
  },
  {
    id: 3,
    name: 'Clementine Bauch',
    profileImage: 'icon/face',
    email: 'Nathan@yesenia.net',
    phone: '123456789',
    phoneCountryCode: '1',
  },
  {
    id: 4,
    name: 'Patricia Lebsack',
    profileImage: 'icon/face',
    email: 'Julianne.OConner@kory.org',
    phone: '123456789',
    phoneCountryCode: '1',
  },
  {
    id: 5,
    name: 'Chelsey Dietrich',
    profileImage: 'icon/face',
    email: 'Lucio_Hettinger@annie.ca',
    phone: '123456789',
    phoneCountryCode: '1',
  },
  {
    id: 6,
    name: 'Mrs. Dennis Schulist',
    profileImage: 'icon/face',
    email: 'Karley_Dach@jasper.info',
    phone: '123456789',
    phoneCountryCode: '1',
  },
  {
    id: 7,
    name: 'Kurtis Wessnat',
    profileImage: 'icon/face',
    email: 'Telly.Hoeger@billy.biz',
    phone: '123456789',
    phoneCountryCode: '1',
  },
  {
    id: 8,
    name: 'Nicholas Runolfsdottir V',
    profileImage: 'icon/face',
    email: 'Sherwood@rosamond.me',
    phone: '123456789',
    phoneCountryCode: '1',
  },
  {
    id: 9,
    name: 'Glenna Reichert',
    profileImage: 'icon/face',
    email: 'Chaim_McDermott@dana.io',
    phone: '123456789',
    phoneCountryCode: '1',
  },
]
mockUsers = []

async function fetchUsers(setUsersState) {
  const response = await getUsers()
  // console.log('<<<TODOS - ', response.result[0])
  setUsersState(response.result)
}

function Contacts({ users = mockUsers}) {
  const [usersState, setUsersState] = React.useState(users)
  React.useEffect(() => {
    fetchUsers(setUsersState)
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