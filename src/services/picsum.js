import { PICSUM_API_URL } from '../config/env'
import { postPixelsWidth, postPixelsHeight, commentImagePixelsWidth, commentImagePixelsHeight } from '../config/dimensions'

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