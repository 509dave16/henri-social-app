import { UI_FACES_API_URL, UI_FACES_API_TOKEN } from '../config/env'

export async function getUIFaces() {
  const response = await fetch(UI_FACES_API_URL, {
    method: 'GET',
    headers: {
      'x-api-key': UI_FACES_API_TOKEN,
      'Accept': 'application/json',
      'Cache-Control': 'no-cache'
    }
  })
  return response.json()
}