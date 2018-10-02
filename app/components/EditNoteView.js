import React from 'react'
import DatePicker from 'react-native-datepicker'
import { Alert, Image, StyleSheet, TextInput, View } from 'react-native'
import { Button, Icon } from 'react-native-elements'
import RemoveIcon from '../utils/RemoveIcon'
import Notification from '../components/Notification'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import PhotoModal from './PhotoModal'

const EditNoteView = ({
  showContent,
  startDate,
  endDate,
  content,
  textInputs,
  photos,
  choosablePhotos,
  modalOpen,
  onStartDateChange,
  onEndDateChange,
  resetDates,
  changeTextInput,
  removeInput,
  addTextInput,
  addPicture,
  save,
  onPressPhoto
}) => {

  let saveButton = null
  if (showContent) {
    saveButton = (
      <Button
        title='Tallenna '
        fontFamily='caveat-regular'
        fontSize={17}
        borderRadius={4}
        backgroundColor='#9e9e9e'
        icon={{ name: 'save', type: 'font-awesome' }}
        onPress={save}
      />
    )
  }

  let modal = null
  if (modalOpen && choosablePhotos) {
    modal = <PhotoModal
      photos={choosablePhotos}
      visible={modalOpen}
      onPressPhoto={onPressPhoto}
    />
  }

  askFirst = (text, removeFunction) => {
    Alert.alert(
      'Info',
      `Haluatko varmasti poistaa ${text}?`,
      [
        {text: 'Peruuta', onPress: () => console.log('cancel')},
        {text: 'OK', onPress: () => removeFunction()}
      ],
      { cancelable: false }
    )
  }

  return (
    <KeyboardAwareScrollView
      keyboardShouldPersistTaps='handled'
      enableOnAndroid={true}
      extraScrollHeight={100}
    >
      <View>
        <View style={styles.dateContainer}>
          <DatePicker
            style={{ width: 170 }}
            date={startDate}
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
            onDateChange={(date) => onStartDateChange(date)}
          />
          <DatePicker
            style={{ width: 120 }}
            date={endDate}
            mode='date'
            placeholder='loppupäivä'
            format='DD.MM.YYYY'
            androidMode='calendar'
            maxDate={new Date()}
            onDateChange={(date) => onEndDateChange(date)}
            showIcon={false}
          />
          <RemoveIcon
            onPress={resetDates}
            disabled={false}
          />
        </View>

        {content.map(c => {
          if (c.type === 'text') {
            console.log('ti', textInputs)
            const removeFunction = () => removeInput(c.id, 'textInputs')
            return (
              <View
                key={c.id}
                style={styles.inputContainer}>
                <TextInput
                  style={styles.textInput}
                  autoCapitalize='sentences'
                  placeholder='Kirjoita tähän'
                  multiline={true}
                  onChangeText={(text) => changeTextInput(text, c.id)}
                  value={textInputs.find(t => t.id === c.id).text}
                  underlineColorAndroid='transparent'
                />
                <RemoveIcon
                  onPress={() => this.askFirst('tekstikentän', removeFunction)}
                  disabled={textInputs.find(t => t.id === c.id).text.length}
                />
              </View>
            )
          } else if (c.type === 'picture') {
            console.log('ps', photos)
            const uri = photos.find(p => p.id === c.id).photo.node.image.uri
            const removeFunction = () => removeInput(c.id, 'photos')
            return (
              <View
                key={c.id}
                style={ styles.inputContainer }
              >
                <Image
                  style={ styles.image }
                  source={{ uri }}
                />
                <RemoveIcon
                  onPress={() => this.askFirst('kuvan', removeFunction)}
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
            onPress={addTextInput}
          />
          <Button
            title='Lisää kuva '
            fontFamily='caveat-regular'
            fontSize={17}
            borderRadius={4}
            backgroundColor='#9e9e9e'
            icon={{ name: 'picture-o', type: 'font-awesome' }}
            onPress={addPicture}
          />
        </View>

        <Notification />

        <View style={styles.saveButtonContainer}>
          {saveButton}
        </View>

        {modal}
      </View>
    </KeyboardAwareScrollView>
  )
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
    marginTop: 20,
    height: 70,
    width: 320,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  inputContainer: {
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
    marginTop: 15,
    marginLeft: 15
  },
  saveButtonContainer: {
    marginTop: 30,
    marginBottom: 20,
    width: 320
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

export default EditNoteView