import React from 'react'
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import CustomButton from '../utils/CustomButton'

class NoteViewScreen extends React.Component {

  render() {
    const note = this.props.note

    let date = note.startDate
    if (note.endDate !== date) {
      date = date + '–' + note.endDate
    }
    return (
      <ScrollView style={{ flex: 1 }}>
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
              const uri = note.photos.find(p => p.id === c.id).photo.node.image.uri
              return (
                <Image
                  style={styles.image}
                  key={c.id}
                  source={{ uri }}
                />
              )
            }
          })}
        </View>
        <CustomButton
          onPress={() => this.props.navigation.navigate('EditNote', { note })}
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
    margin: 13,
    padding: 10,
    display: 'flex',
    justifyContent: 'flex-start',
    minHeight: 200
  },
  text: {
    fontFamily: 'caveat-regular',
    fontSize: 20
  },
  image: {
    height: 290,
    width: 290,
    marginLeft: 15,
    marginTop: 15,
    borderColor: '#9e9e9e',
    borderWidth: 1,
  }
})

export default NoteViewScreen