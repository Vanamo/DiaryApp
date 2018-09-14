import React from 'react'
import DatePicker from 'react-native-datepicker'
import { StyleSheet, TextInput, View } from 'react-native'
import { Button, Icon } from 'react-native-elements'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import NoteView from './NoteView'

class NoteScreen extends React.Component {

  state = {
    startDate: null,
    endDate: null,
    content: [],
    showButtons: true,
    textInput: ''
  }

  addTextInput = () => {
    this.setState({ showButtons: false })
  }

  addPicture = () => {

  }

  resetDates = () => {
    this.setState({
      startDate: null,
      endDate: null
    })
  }

  render() {

    let functionality = (
      <View style={styles.buttonContainer}>
        <Button
          title='Lisää teksti '
          fontFamily='caveat-regular'
          fontSize={17}
          borderRadius={4}
          backgroundColor='#9e9e9e'
          icon={{ name: 'pencil', type: 'entypo' }}
          onPress={this.addTextInput}
        />
        <Button
          title='Lisää kuva '
          fontFamily='caveat-regular'
          fontSize={17}
          borderRadius={4}
          backgroundColor='#9e9e9e'
          icon={{ name: 'picture-o', type: 'font-awesome' }}
          onPress={this.addPicture}
        />
      </View>
    )
    if (!this.state.showButtons) {
      functionality = (
        <View>
          <TextInput
            style={styles.textInput}
            autoCapitalize='sentences'
            placeholder='Kirjoita tähän'
            multiline={true}
            onChangeText={textInput => this.setState({ textInput })}
            value={this.state.textInput}
            underlineColorAndroid='transparent'
          />
          <Button
            title='Tallenna '
            fontFamily='caveat-regular'
            fontSize={17}
            borderRadius={4}
            backgroundColor='#9e9e9e'
            icon={{ name: 'save', type: 'entypo' }}
            onPress={this.saveText}
          />
        </View>
      )
    }

    return (
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps='always'
        enableOnAndroid={true}
        extraScrollHeight={150}
      >
        <View>
          <View style={styles.dateContainer}>
            <DatePicker
              style={{ width: 170 }}
              date={this.state.startDate}
              mode='date'
              placeholder='alkupäivä'
              format='DD.MM.YYYY'
              androidMode='calendar'
              maxDate={new Date()}
              iconComponent={
                <View style={{ margin: 5 }}>
                  <Icon
                    name='calendar'
                    type='evilicon'
                    size={40}
                  />
                </View>
              }
              onDateChange={(date) => this.setState({ startDate: date })}
            />
            <DatePicker
              style={{ width: 120 }}
              date={this.state.endDate}
              mode='date'
              placeholder='loppupäivä'
              format='DD.MM.YYYY'
              androidMode='calendar'
              maxDate={new Date()}
              onDateChange={(date) => this.setState({ endDate: date })}
              showIcon={false}
            />
            <Icon
              name='circle-with-minus'
              type='entypo'
              color='grey'
              size={30}
              iconStyle={{ marginLeft: 10 }}
              onPress={this.resetDates}
            />
          </View>
          <NoteView
            startDate={this.state.startDate}
            endDate={this.state.endDate}
            textInput={this.state.textInput}
          />
          {functionality}
        </View>
      </KeyboardAwareScrollView>
    )
  }
}

const styles = StyleSheet.create({
  dateContainer: {
    height: 80,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonContainer: {
    marginLeft: 0,
    height: 70,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  textInput: {
    height: 100,
    width: '90%',
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 8,
    marginLeft: 15
  }
})

export default NoteScreen