import { Dimensions, PixelRatio } from 'react-native'

import { PICSUM_API_URL } from '../config/env'

const postPixelsWidth = PixelRatio.roundToNearestPixel(Dimensions.get('screen').width)
const postPixelsHeight = Math.floor(postPixelsWidth * 0.66)

const commentImagePixelsWidth = PixelRatio.roundToNearestPixel(30)
const commentImagePixelsHeight = commentImagePixelsWidth

export async function getPhotos() {
  const response = await fetch(`${PICSUM_API_URL}/v2/list?limit=100`)
  return response.json()
}

function formUrl(seed, dimensions) {
  return `${PICSUM_API_URL}/seed/${seed}/${dimensions.join('/')}`
}

export function getSeededPostUpload(seed, dimensions = [postPixelsWidth, postPixelsHeight]) {
  return formUrl(seed, dimensions)
}

export function getSeededCommentProfileImage(seed, dimensions = [commentImagePixelsWidth, commentImagePixelsHeight]) {
  return formUrl(seed, dimensions)
}