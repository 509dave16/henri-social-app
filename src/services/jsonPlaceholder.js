
import _ from 'lodash'
import { getUIFaces } from './uiFaces'
import { getSeededPostUpload, getSeededCommentProfileImage } from './picsum'
import { JSON_PLACEHOLDER_API_URL } from '../config/env'

const  ApiResponseState = {
  SUCCESS: 'success',
  ERROR: 'error',
  EMPTY: 'empty',
}

function getUserFromJson(json = {}) {
  return {
    id: json.id,
    name: json.name,
    email: json.email,
    profileImage: 'icon/face',
  }
}

function getPostFromJson(json = {}) {
  return {
    id: json.id,
    title: json.title,
    story: json.body,
    userId: json.userId,
    upload: getSeededPostUpload(`post${json.id}`)
  }
}

function getCommentFromJson(json = {}) {
  return {
    id: json.id,
    postId: json.postId,
    name: json.name,
    profileImage: getSeededCommentProfileImage(`comment${json.id}`),
    body: json.body,
  }
}

function getTodoFromJson(json = {}) {
  return {
    id: json.id,
    description: json.title,
    complete: json.completed,
  }
}

function getResourcesFromJsonHOF(transformData) {
  return (json) => json.map(item => transformData(item))
}

function getRequest(resource, options) {
  let url = `${JSON_PLACEHOLDER_API_URL}/${resource}`
  if (!options.method || ['HEAD', 'GET'].includes(options.method) && options.body instanceof URLSearchParams) {
    url += `?${options.body?.toString()}`
    delete options.body
  }
  return new Request(url, options)
}

async function jsonPlaceholderRequest(resource, options = {}, transformData) {
  let state = ApiResponseState.SUCCESS
  let result = null

  try {
    const response = await fetch(getRequest(resource, options))
    const json = await response.json()

    // console.log('<<<jsonPlaceholderRequest', json)

    if (response.status >= 400) {
      state = ApiResponseState.ERROR
      result = json
    } else if (_.isEmpty(json)) {
      state = ApiResponseState.EMPTY
      result = null
    } else {
      result = transformData(json)
    }
  } catch (error) {
    state = ApiResponseState.ERROR
    result = error
  }

  return { result, state }
}

export async function getUsers(options) {
  const response = await jsonPlaceholderRequest('users', options, getResourcesFromJsonHOF(getUserFromJson))
  if (response.state === ApiResponseState.SUCCESS) {
    const uiFaces = await getUIFaces()
    response.result.forEach((user, index) => {
      user.profileImage = uiFaces[index].photo
    })
  }
  return response
}

export async function getPosts(options) {
  const response = await jsonPlaceholderRequest('posts', options, getResourcesFromJsonHOF(getPostFromJson))
  if (response.state === ApiResponseState.SUCCESS) {
    response.result = _.shuffle(response.result)
  }
  return response
}

export function getPostComments(postId, options) {
  return jsonPlaceholderRequest(`posts/${postId}/comments`, options, getResourcesFromJsonHOF(getCommentFromJson))
}

export function getTodos(options) {
  return jsonPlaceholderRequest('todos', options, getResourcesFromJsonHOF(getTodoFromJson))
}