import React from 'react'
import {
  Dimensions,
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
              const hPerW = p.node.image.height / p.node.image.width
              const photoWidth = Dimensions.get('window').width - 54
              const photoHeight = hPerW * photoWidth
              return (
                <View
                  key={i}
                  style={{
                    width: photoWidth,
                    height: photoHeight,
                    marginTop: 70,
                    marginLeft: 20
                  }}
                >
                  <TouchableHighlight
                    onPress={() => this.props.onPressPhoto(p)}
                  >
                    <Image
                      style={styles.photoWrapper}
                      source={{ uri: p.node.image.uri }}
                    />
                  </TouchableHighlight>
                </View>
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
    height: '100%',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default PhotoModal