import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

class NoteView extends React.Component {
  render() {
    let date = this.props.startDate
    if (this.props.endDate) {
      date = date + '–' + this.props.endDate 
    }
    return(
      <View style={ styles.noteBackground }>
        <Text style={ styles.text }>{date}</Text>
        <View style={{ height: 10 }}/>
        <Text style={ styles.text }>{this.props.textInput}</Text>
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

export default NoteView