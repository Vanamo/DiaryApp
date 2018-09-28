import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import CustomButton from '../utils/CustomButton'

class NoteViewScreen extends React.Component {
  render() {
    console.log('nav', this.props.navigation)
    const note = this.props.note

    let date = note.startDate
    if (note.endDate !== date) {
      date = date + '–' + note.endDate
    }
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.noteBackground}>
          <Text style={styles.text}>{date}</Text>
          <View style={{ height: 10 }} />
          {note.textInputs.map((t, ind) => (
            <Text
              style={styles.text}
              key={ind}
            >
              {t.text}
            </Text>
          ))}
        </View>
        <CustomButton
          onPress={() => this.props.navigation.navigate('EditNote', { note })}
          title1='Muokkaa'
        />
      </View>
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
  }
})

export default NoteViewScreen