import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

class NoteViewScreen extends React.Component {
  render() {
    console.log('nav', this.props.navigation)
    const note = this.props.navigation.state.params.note

    let date = note.startDate
    if (note.endDate !== date) {
      date = date + '–' + note.endDate 
    }
    return(
      <View style={ styles.noteBackground }>
        <Text style={ styles.text }>{date}</Text>
        <View style={{ height: 10 }}/>
        {note.textInputs.map((t, ind) => (
          <Text
            style={ styles.text }
            key={ind}
          >
            {t.text}
          </Text>
        ))}


      </View>
    )
  }
}

const styles = StyleSheet.create({
  noteBackground: {
    backgroundColor: '#bfbfbf',
    borderWidth: 1,
    borderColor: 'grey',
    margin: 15,
    padding: 10,
    display: 'flex',
    justifyContent: 'flex-start',
    minHeight: 200,
    width: '90%'
  },
  text: {
    fontFamily: 'caveat-regular',
    fontSize: 20
  }
})

export default NoteViewScreen