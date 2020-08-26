import * as React from 'react'
import  { View, Text, StyleSheet, ActivityIndicator } from 'react-native'
import { Image } from 'react-native-elements'
import { Card, CardActions, CardContent, CardMedia, IconButton, Button, Icon, List, TextField } from 'material-bread'
import { connectActionSheet } from '@expo/react-native-action-sheet'
import { useTheme } from '@react-navigation/native';

import ProfileBanner from '../../widgets/ProfileBanner'
import LoadingIndicator from '../../widgets/LoadingIndicator'

import { compose } from 'redux'
import { connect, useDispatch } from 'react-redux'
import * as selectors from '../../../state/selectors'
import * as actions from '../../../state/actions'
import { getPostComments } from '../../../services/jsonPlaceholder'
import { postPixelsWidth, postPixelsHeight } from '../../../config/dimensions'

async function fetchComments(post, dispatch, setCommentsFetched, setNoComments) {
  const response = await getPostComments(post.id)
  dispatch(actions.ormInsertComments(response.result))
  setCommentsFetched(true)
  if (!response.result?.length) {
    setNoComments(true)
  }
}

function getOpenActionSheetArgs(post, dispatch) {
  const options = [
    { name: 'Delete', onPress: () => dispatch(actions.ormDeletePost(post)) },
    { name: 'Cancel', onPress: () => {} }
  ]

  return [
    { options: options.map(option => option.name), cancelButtonIndex: 1, destructiveButtonIndex: 0 },
    (buttonIndex) => options[buttonIndex].onPress()
  ]
}

function Post({ post, comments = [], showActionSheetWithOptions, editMode = false, updatePostField }) {
  const [viewComments, setViewComments] = React.useState(false)
  const [commentsFetched, setCommentsFetched] = React.useState(false)
  const [noComments, setNoComments] = React.useState(false)
  const dispatch = useDispatch()
  const { colors } = useTheme()
  React.useEffect(() => {
    viewComments && !commentsFetched && !comments.length && fetchComments(post, dispatch, setCommentsFetched, setNoComments)
    return () => {}
  }, [commentsFetched, viewComments, comments])

  const args = getOpenActionSheetArgs(post, dispatch)

  if (!post) {
    console.log('<<<POST - no post data')
  } else if (!post.user) {
    console.log('<<<POST - no post user data', post)
  }

  return (
    <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
      <Card style={{maxWidth: 400, width: '100%'}}>
        <ProfileBanner
          profileImage={post?.user?.profileImage || 'icon/face'}
          text={post?.user?.name || 'No Name'}
          secondaryText={post?.user?.email || 'No Email'}
          actionItem={!editMode && <IconButton name="more-vert" size={24} onPress={() => showActionSheetWithOptions(...args)} />}
        />
        <CardMedia
          image={
            <Image
              style={{ width: postPixelsWidth, height: postPixelsHeight }}
              source={{uri: post.upload }}
              resizeMode="cover"
              PlaceholderContent={<ActivityIndicator size='large' color={colors.primary} />}
            />
          }
        />
        <CardContent>
          { !editMode ? (
            <React.Fragment>
              <Text style={{ color: 'rgba(0,0,0,.6)', fontSize: 16, fontWeight: '600', marginBottom: 6 }}>
                {post.title}
              </Text>
              <Text style={{ color: 'rgba(0,0,0,.6)', fontSize: 14 }}>
                {post.story}
              </Text>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <TextField type="outlined" label="Title" value={post.title} onChangeText={value => updatePostField('title', value)} />
              <TextField type="outlined" label="Story" value={post.story} onChangeText={value => updatePostField('story', value)} />
            </React.Fragment>
           
          )}
         
        </CardContent>
        { !editMode ? (
          <CardActions
            rightActionItems={[
              viewComments && (
                <Button
                  key="close"
                  type="text" 
                  text="Hide Comments"
                  icon={<Icon name="keyboard-arrow-down" />}
                  iconSize={30}
                  iconPosition="right"
                  onPress={() => setViewComments(false)}
                />
              ),
              !viewComments && (
                <Button
                  key="open"
                  type="text" 
                  text="Show Comments"
                  icon={<Icon name="keyboard-arrow-right" />}
                  iconSize={30}
                  iconPosition="right"
                  onPress={() => setViewComments(true)}
                />
              ),
            ].filter(action => action)}
          />
        ) : null }
        { viewComments ? 
            comments.length ? (
              <List>
                { comments.map(comment => (
                  <ProfileBanner
                    key={`comment${comment.id}`}
                    text={comment.name}
                    secondaryText={comment.body}
                    profileImage={comment.profileImage}
                    profileImageSize={30}
                  />
                ))}
              </List>
            ) : !noComments ? (
                <LoadingIndicator style={styles.loadingIndicator} />
              ) : (
                <View style={styles.noCommentsContainer}>
                  <Text>No Comments</Text>
                </View>
              )
        : null }
      </Card>
    </View>
  )
}

const styles = StyleSheet.create({
  loadingIndicator: {
    paddingBottom: 20,
  },
  noCommentsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  }
})

const postCommentsSelectorsMap = {}
const mapStateToProps = (state, ownProps) => {
  const postId = ownProps?.post?.id
  if (!postCommentsSelectorsMap[postId]) {
    postCommentsSelectorsMap[postId] = selectors.createOrmSelector(
      session => session.Comment.filter({ postId: ownProps.post.id }).toRefArray()
    )
  }
  return { comments: postCommentsSelectorsMap[postId](state) }
}
export default compose(
  connect(mapStateToProps),
  connectActionSheet,
)(Post)

