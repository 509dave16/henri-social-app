import * as React from 'react'
import { Image, StyleSheet } from 'react-native'
import { ListItem, Avatar } from 'material-bread'

import _ from 'lodash'

const separator = '/'
const defaultSize = 40

function getAvatarProps(profileImage, profileImageSize) {
  const size = profileImageSize || defaultSize
  const [type, value] = _.split(profileImage, separator)
  if (type === 'icon') {
    return { type, content: value, contentColor: '#ececec', color: '#a3a3a3', size }
  } else if (type === 'https:' || type === 'http:') {
    // console.log('<<<AVATAR - uri', profileImage)
    return { type: 'image', image: (<Image source={{ uri: profileImage }} />), size }
  }
}

function ProfileBanner({ style, profileImage, profileImageSize, ...listItemProps }) {
  const avatarProps = getAvatarProps(profileImage, profileImageSize)
  return (
    <ListItem
      style={[styles.listItem, style]}
      media={<Avatar {...avatarProps} />}
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

export default ProfileBanner