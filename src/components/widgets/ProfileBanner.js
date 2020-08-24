import * as React from 'react'
import { Image, StyleSheet } from 'react-native'
import { ListItem, Avatar } from 'material-bread'

import _ from 'lodash'

const separator = '/'

function getAvatarProps(profileImage) {
  const [type, value, ...restOfValueSegments] = _.split(profileImage, separator)
  if (type === 'icon') {
    return { type, content: value, contentColor: '#ececec', color: '#a3a3a3', size: 40 }
  } else if (type === 'image') {
    return { type, image: (<Image source={{ uri: `${value}${separator}${restOfValueSegments.join(separator)}`}}/>) }
  }
}

function ProfileBanner({ style, profileImage, ...listItemProps }) {
  const avatarProps = getAvatarProps(profileImage)
  return (
    <ListItem
      style={[styles.listItem, style]}
      media={<Avatar {...avatarProps} />}
      actionItem={<Avatar type="icon" content="phone" size={40} color="white" contentColor="green" />}
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