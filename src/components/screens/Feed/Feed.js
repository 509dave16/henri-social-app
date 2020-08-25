import * as React from 'react'
import { View, StyleSheet, FlatList } from 'react-native'
import { useTheme } from '@react-navigation/native'
import ActionButton from '@kenetto/react-native-action-button'
import { Icon } from 'material-bread'

import LoadingIndicator from '../../widgets/LoadingIndicator'
import Post from './Post'

import { connect, useDispatch } from 'react-redux'
import * as selectors from '../../../state/selectors'
import * as actions from '../../../state/actions'
import posts from '../../../config/mockData/posts'
import { getPosts } from '../../../services/jsonPlaceholder'

const debug = false
const mockPosts = debug ? posts : []

async function fetchPosts(dispatch) {
  const response = await getPosts()
  dispatch(actions.ormInsertPosts(response.result))
}

function renderItem({ item: post }) {
  return <Post key={`post${post.id}`} post={post} />
}

// const itemHeight = 74
// function getItemLayout(data, index) {
//   return { length: itemHeight, offset: itemHeight * index, index }
// }

function keyExtractor(post) {
  return `post${post.id}`
}

const viewabilityConfig = {
  minimumViewTime: 100,
  waitForInteraction: false,
  itemVisiblePercentThreshold: 50,
}

function Feed({ posts = mockPosts }) {
  const { colors } = useTheme()
  const dispatch = useDispatch()
  const [isModalOpen, setIsModalOpen] = React.useState(false)
  const onItemPress = React.useCallback((item, index) => setIsModalOpen(true), [isModalOpen])
 
  React.useEffect(() => {
    !debug && fetchPosts(dispatch)
    return () => {}
  }, [])

  if (posts.length === 0) {
    return <LoadingIndicator />
  }

  const MenuIcon = () => <Icon name="add" size={32} color="white" />
  return (
    <View>
      <FlatList
        style={styles.list}
        data={posts}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        viewabilityConfig={viewabilityConfig}
      />
      <ActionButton buttonColor={colors.primary} renderIcon={MenuIcon}>
        <ActionButton.Item title="Add Post" buttonColor={colors.primary} onPress={onItemPress}> 
          <Icon name="image" color="white" size={32} />
        </ActionButton.Item>
      </ActionButton>
    </View>
  )
}

const styles = StyleSheet.create({
  list: {
    backgroundColor: '#f2f2f2'
  }
})


const mapStateToProps = (state) => ({ posts: selectors.posts(state) })
export default connect(mapStateToProps)(Feed)