import * as React from 'react'
import { View, ScrollView, Modal, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native'
import { IconButton, Button, Heading } from 'material-bread'
import { useTheme } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'


function PostSaveModal({ style, isVisible, closeAction, children }) {
  const { colors } = useTheme()
  return (
     <SafeAreaView>
      <Modal
        animationType='slide'
        visible={isVisible}
        onRequestClose={() => closeAction(false)}
      >
        <View style={[styles.modalContainer, style]}>
          <View style={[styles.modalHeader]}>
            <IconButton
              style={styles.closeIcon}
              name='keyboard-arrow-left'
              size={40}
              onPress={() => closeAction(false)}
            />
            <Heading type={5} text="New Post" />
            <IconButton
              name='keyboard-arrow-left'
              size={40}
              color="white"
            />
          </View>
          <ScrollView>
            <KeyboardAvoidingView behavior={Platform.OS === 'android' ? undefined : 'padding'}>
              {children}
            </KeyboardAvoidingView>
          </ScrollView>
          <View style={styles.modalFooter}>
            <Button fullWidth type="contained" text="Save" onPress={() => closeAction(true)} color={colors.primary} />
          </View>
        </View>
      </Modal>
      </SafeAreaView>

  )
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
  },
  iconContainer: {
    width: 50,
    height: 50,
    paddingLeft: 14,
    justifyContent: 'center'
  },
  closeIcon: {
    color: '#4E4E4E',
  },
  modalHeader: {
    paddingTop: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalFooter: {
    marginHorizontal: 10,
    marginBottom: 15,
  },
})

export default PostSaveModal
