import React from 'react'
import DatePicker from 'react-native-datepicker'
import { StyleSheet, TextInput, View } from 'react-native'
import { Button, Icon } from 'react-native-elements'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

class NoteScreen extends React.Component {

  state = {
    startDate: null,
    endDate: null,
    content: [],
    showContent: false,
    textInputs: []
  }

  addTextInput = () => {
    const content = this.state.content
    const id = Math.random().toString(36).substr(2, 16)
    content.push({ type: 'text', id })
    const textInputs = this.state.textInputs
    textInputs.push({ id, text: '' })
    this.setState({
      content,
      textInputs,
      showContent: true
    })
  }

  addPicture = () => {

  }

  resetDates = () => {
    this.setState({
      startDate: null,
      endDate: null
    })
  }

  changeTextInput = (text, id) => {
    const textInputs = this.state.textInputs.map(t => t.id !== id ? t : { ...t, text })
    this.setState({ textInputs })
  }

  removeTextInput = (id) => {
    const content = this.state.content.filter(c => c.id !== id)
    const textInputs = this.state.textInputs.filter(t => t.id !== id)
    let showContent = true
    if (!content.length) {
      showContent = false
    }
    this.setState({
      content,
      textInputs,
      showContent
    })
  }

  render() {

    let saveButton = null
    if (this.state.showContent) {
      saveButton = (
        <Button
          title='Tallenna '
          fontFamily='caveat-regular'
          fontSize={17}
          borderRadius={4}
          backgroundColor='#9e9e9e'
          icon={{ name: 'save', type: 'font-awesome' }}
          onPress={this.saveText}
        />
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
              color='red'
              size={30}
              iconStyle={{ marginLeft: 10 }}
              onPress={this.resetDates}
            />
          </View>

          {this.state.content.map(c => {
            if (c.type === 'text') {
              return (
                <View
                  key={c.id}
                  style={styles.textInputContainer}>
                  <TextInput
                    style={styles.textInput}
                    autoCapitalize='sentences'
                    placeholder='Kirjoita tähän'
                    multiline={true}
                    onChangeText={(text) => this.changeTextInput(text, c.id)}
                    value={this.state.textInput}
                    underlineColorAndroid='transparent'
                  />
                  <Icon
                    name='circle-with-minus'
                    type='entypo'
                    color='red'
                    size={30}
                    iconStyle={{ marginLeft: 10 }}
                    onPress={() => this.removeTextInput(c.id)}
                  />
                </View>
              )
            }
          })}

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

          <View style={ styles.saveButtonContainer }>{saveButton}</View>

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
    width: 320,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  textInputContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  textInput: {
    height: 100,
    width: 290,
    borderColor: '#9e9e9e',
    borderWidth: 1,
    marginTop: 8,
    marginLeft: 15
  },
  saveButtonContainer: {
    marginTop: 30,
    width: 320
  }
})

export default NoteScreen