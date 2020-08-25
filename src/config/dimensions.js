
import { PixelRatio, Dimensions } from 'react-native'

export const postPixelsWidth = PixelRatio.roundToNearestPixel(Dimensions.get('screen').width)
export const postPixelsHeight = Math.floor(postPixelsWidth * 0.66)

export const commentImagePixelsWidth = PixelRatio.roundToNearestPixel(30)
export const commentImagePixelsHeight = commentImagePixelsWidth