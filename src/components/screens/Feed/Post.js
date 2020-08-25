import * as React from 'react'
import  { View, Image, Text, StyleSheet } from 'react-native'
import { Card, CardActions, CardContent, CardMedia, IconButton, Button, Icon, List } from 'material-bread'
import { connectActionSheet } from '@expo/react-native-action-sheet'

import ProfileBanner from '../../widgets/ProfileBanner'
import LoadingIndicator from '../../widgets/LoadingIndicator'

import { compose } from 'redux'
import { connect, useDispatch } from 'react-redux'
import * as selectors from '../../../state/selectors'
import * as actions from '../../../state/actions'
import { getPostComments } from '../../../services/jsonPlaceholder'

async function fetchComments(post, dispatch, setCommentsFetched) {
  const response = await getPostComments(post.id)
  dispatch(actions.ormInsertComments(response.result))
  setCommentsFetched(true)
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

function Post({ post, comments = [], showActionSheetWithOptions }) {
  const [viewComments, setViewComments] = React.useState(false)
  const [commentsFetched, setCommentsFetched] = React.useState(false)
  const dispatch = useDispatch()
  React.useEffect(() => {
    viewComments && !commentsFetched && !comments.length && fetchComments(post, dispatch, setCommentsFetched)
    return () => {}
  }, [commentsFetched, viewComments, comments])

  const args = getOpenActionSheetArgs(post, dispatch)
  return (
    <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
      <Card style={{maxWidth: 400, width: '100%'}}>
        <ProfileBanner
          profileImage={post.user.profileImage}
          text={post.user.name}
          secondaryText={post.user.email}
          actionItem={<IconButton name="more-vert" size={24} onPress={() => showActionSheetWithOptions(...args)} />}
        />
        <CardMedia
          image={
            <Image
              style={{ flex: 1, width: '100%' }}
              source={{uri: post.upload }}
              resizeMode="cover"
            />
          }
        />
        <CardContent>
          <Text style={{ color: 'rgba(0,0,0,.6)', fontSize: 16, fontWeight: '600', marginBottom: 6 }}>
            {post.title}
          </Text>
          <Text style={{ color: 'rgba(0,0,0,.6)', fontSize: 14 }}>
            {post.story}
          </Text>
        </CardContent>
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
            ) : (<LoadingIndicator style={styles.loadingIndicator} />)
        : null }
      </Card>
    </View>
  )
}

const styles = StyleSheet.create({
  loadingIndicator: {
    paddingBottom: 20,
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

