import React from 'react'
import {
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  TouchableHighlight,
  View
} from 'react-native'

class PhotoModal extends React.Component {
  render() {
    const photos = this.props.photos
    return (
      <Modal
        transparent={true}
        animationType={'none'}
        visible={this.props.visible}
        onRequestClose={() => { console.log('close modal') }}>
        <View style={styles.modalBackground}>
          <ScrollView
            horizontal={true}
          >
            {photos.map((p, i) => {
              return (
                <TouchableHighlight
                  onPress={() => this.props.onPressPhoto(p)}
                  key={i}
                >
                  <Image
                    style={styles.photoWrapper}
                    source={{ uri: p.node.image.uri }}
                  />
                </TouchableHighlight>
              )
            })}
          </ScrollView>
        </View>
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00000090'
  },
  photoWrapper: {
    height: 300,
    width: 300,
    marginTop: 100,
    marginLeft: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default PhotoModal