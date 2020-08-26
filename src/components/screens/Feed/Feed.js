import * as React from 'react'
import { View, StyleSheet, FlatList } from 'react-native'
import { useTheme, useScrollToTop } from '@react-navigation/native'
import ActionButton from '@kenetto/react-native-action-button'
import { Icon } from 'material-bread'

import LoadingIndicator from '../../widgets/LoadingIndicator'
import Post from './Post'
import SaveModal from '../../widgets/SaveModal'

import produce from 'immer'
import { connect, useDispatch } from 'react-redux'
import * as selectors from '../../../state/selectors'
import * as actions from '../../../state/actions'
import posts from '../../../config/mockData/posts'
import { getPosts } from '../../../services/jsonPlaceholder'
import { getSeededPostUpload } from '../../../services/picsum'
 
const debug = false
const mockPosts = debug ? posts : []

async function fetchPosts(dispatch) {
  const response = await getPosts()
  dispatch(actions.ormInsertPosts(response.result))
}

function renderItem({ item: post }) {
  return <Post key={`post${post.id}`} post={post} />
}

function keyExtractor(post) {
  return `post${post.id}`
}

function newPostState(users) {
  const id = 500 + Math.round(Math.random() * 500)
  const randomUserIndex = Math.ceil(Math.random() * (users.length - 1))
  const user = users[randomUserIndex]
  return {
    id,
    upload: getSeededPostUpload(`newpost${id}`),
    userId: user.id,
    user,
    title: '',
    story: '',
  }
}

const viewabilityConfig = {
  minimumViewTime: 100,
  waitForInteraction: false,
  itemVisiblePercentThreshold: 50,
}

function Feed({ posts = mockPosts, users }) {
  const { colors } = useTheme()
  const dispatch = useDispatch()

  const ref = React.useRef(null)
  useScrollToTop(ref)
  const [isModalOpen, setIsModalOpen] = React.useState(false)
  const onItemPress = React.useCallback((item, index) => setIsModalOpen(true), [isModalOpen])
  const closeAction = (postToInsert) => {
    if (postToInsert) {
      dispatch(actions.ormCreatePost(newPost))
      // Curently there is a bug with the ref to the FlatList that is also shared with the useScrollToTop hook in production.
      // From looking around it appears it might be an issue with React Native's Modal.
      // For now we only call the scrollToOffset in development builds
      if (ref?.current?.scrollToOffset && __DEV__) {
        ref.current.scrollToOffset({ offset: 0 })
      }
    }
    setIsModalOpen(false)
    setNewPost(newPostState(users))
  }

  const [newPost, setNewPost] = React.useState(newPostState(users))
  const updatePostField = (field, value) => {
    setNewPost(prevNewPost => produce(prevNewPost, draft => { draft[field] = value }))
  }

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
        ref={ref}
        style={styles.list}
        data={posts}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        viewabilityConfig={viewabilityConfig}
      />
      <SaveModal isVisible={isModalOpen} closeAction={closeAction}>
        <Post key={`newPost${newPost.id}`} editMode updatePostField={updatePostField} post={newPost} />
      </SaveModal>
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


const mapStateToProps = (state) => ({ posts: selectors.posts(state), users: selectors.users(state) })
export default connect(mapStateToProps)(Feed)