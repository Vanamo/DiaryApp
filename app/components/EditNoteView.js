import React from 'react'
import DatePicker from 'react-native-datepicker'
import { Image, StyleSheet, TextInput, View } from 'react-native'
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
  removeTextInput,
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

  return (
    <KeyboardAwareScrollView
      keyboardShouldPersistTaps='handled'
      enableOnAndroid={true}
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
            return (
              <View
                key={c.id}
                style={styles.textInputContainer}>
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
                  onPress={() => removeTextInput(c.id)}
                  disabled={textInputs.find(t => t.id === c.id).text.length}
                />
              </View>
            )
          } else if (c.type === 'picture') {
            const uri = photos.find(p => p.id === c.id).photo.node.image.uri
            return (
              <View
                key={c.id}
              >
                <Image
                  style={{ width: 300, height: 300 }}
                  source={{ uri }}
                />
                <RemoveIcon
                  onPress={() => removeTextInput(c.id)}
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
    marginBottom: 20,
    width: 320
  }
})

export default EditNoteView