import React from 'react'
import { Dimensions, Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import CustomButton from '../utils/CustomButton'
import Notification from './Notification'

class NoteViewScreen extends React.Component {

  render() {
    const note = this.props.note

    let date = note.startDate
    if (note.endDate !== date) {
      date = date + '–' + note.endDate
    }
    return (
      <ScrollView>
        <Notification />
        <View style={styles.noteBackground}>
          <Text style={styles.text}>{date}</Text>
          <View style={{ height: 10 }} />
          {note.content.map((c) => {
            if (c.type === 'text') {
              const text = note.textInputs.find(t => t.id === c.id).text
              return (
                <Text
                  style={styles.text}
                  key={c.id}
                >
                  {text}
                </Text>
              )
            } else if (c.type === 'picture') {
              const photo = note.photos.find(p => p.id === c.id).photo
              const hPerW = photo.node.image.height / photo.node.image.width
              const uri = photo.node.image.uri
              const photoWidth = Dimensions.get('window').width - 54
              const photoHeight = hPerW * photoWidth
              return (
                <View
                  key={c.id}
                  style={{ height: photoHeight, width: photoWidth, marginBottom: 15 }}
                >
                  <Image
                    style={styles.image}
                    source={{ uri }}
                  />
                </View>
              )
            }
          })}
        </View>
        <CustomButton
          onPress={() => {
            this.props.navigation.navigate('EditNote', { note })
            console.log('täällä')
          }}
          title1='Muokkaa'
        />
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  noteBackground: {
    backgroundColor: '#bfbfbf',
    borderWidth: 1,
    borderColor: 'grey',
    padding: 13,
    margin: 13,
    minHeight: 200
  },
  text: {
    display: 'flex',
    alignItems: 'flex-start',
    fontFamily: 'caveat-regular',
    fontSize: 20,
    marginBottom: 15
  },
  image: {
    display: 'flex',
    justifyContent: 'center',
    alignSelf: 'center',
    width: '100%',
    height: '100%',
    borderColor: 'grey',
    borderWidth: 1,
  }
})

export default NoteViewScreen