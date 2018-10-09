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

  let saveButtons = null
  if (showContent) {
    saveButtons = (
      <View>
        <Button
          title='Tallenna ja jatka muokkausta'
          fontFamily='dancing-regular'
          fontSize={18}
          borderRadius={4}
          backgroundColor='#9e9e9e'
          icon={{ name: 'save', type: 'font-awesome' }}
          onPress={() => {
            save(false)
            this.scroller.scrollToEnd()
          }}
        />
        <View style={{ marginTop: 10 }} />
        <Button
          title='Tallenna ja valmis'
          fontFamily='dancing-regular'
          fontSize={18}
          borderRadius={4}
          backgroundColor='#9e9e9e'
          icon={{ name: 'save', type: 'font-awesome' }}
          onPress={() => save(true)}
        />
      </View>
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
        { text: 'Peruuta', onPress: () => console.log('cancel') },
        { text: 'OK', onPress: () => removeFunction() }
      ],
      { cancelable: false }
    )
  }

  return (
    <KeyboardAwareScrollView
      keyboardShouldPersistTaps='handled'
      enableOnAndroid={true}
      extraScrollHeight={100}
      ref={(scroller) => { this.scroller = scroller }}
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
            const photo = photos.find(p => p.id === c.id).photo
            const hPerW = photo.node.image.height / photo.node.image.width
            const uri = photo.node.image.uri
            const photoWidth = 295
            const photoHeight = hPerW * photoWidth
            const removeFunction = () => removeInput(c.id, 'photos')
            return (
              <View
                key={c.id}
                style={styles.inputContainer}
              >
                <View
                  style={{
                    width: photoWidth,
                    height: photoHeight,
                    marginTop: 15,
                    borderColor: '#9e9e9e',
                    borderWidth: 1,
                  }}
                >
                  <Image
                    style={styles.image}
                    source={{ uri }}
                  />
                </View>
                <RemoveIcon
                  onPress={() => this.askFirst('kuvan', removeFunction)}
                />
              </View>
            )
          }
        })}

        <View style={styles.buttonContainer}>
          <Button
            title=' Lisää teksti'
            fontFamily='dancing-regular'
            fontSize={18}
            borderRadius={4}
            backgroundColor='#9e9e9e'
            icon={{ name: 'pencil', type: 'entypo' }}
            onPress={addTextInput}
          />
          <Button
            title=' Lisää kuva'
            fontFamily='dancing-regular'
            fontSize={18}
            borderRadius={4}
            backgroundColor='#9e9e9e'
            icon={{ name: 'picture-o', type: 'font-awesome' }}
            onPress={addPicture}
          />
        </View>

        <Notification />

        <View style={styles.saveButtonContainer}>
          {saveButtons}
        </View>

        {modal}
      </View>
    </KeyboardAwareScrollView>
  )
}

const styles = StyleSheet.create({
  dateContainer: {
    height: 80,
    width: '95%',
    marginLeft: 13,
    marginRight: 13,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  buttonContainer: {
    marginTop: 20,
    height: 70,
    width: '90%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  inputContainer: {
    width: '95%',
    marginLeft: 13,
    marginRight: 13,
    marginTop: 15,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  textInput: {
    height: 100,
    width: 295,
    borderColor: '#9e9e9e',
    borderWidth: 1,
    paddingLeft: 5
  },
  saveButtonContainer: {
    marginTop: 30,
    marginBottom: 20,
    width: '90%'
  },
  image: {
    height: '100%',
    width: '100%'
  }
})

export default EditNoteView