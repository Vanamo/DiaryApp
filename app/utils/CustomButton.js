import React from 'react'
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native'

const CustomButton = ({ onPress, title1, title2, width }) => {

  let style = styles.button
  if (width === 'wide') {
    style = styles.wideButton
  }

  let title = (
    <View style={styles.textAlignment}>
      <Text style={styles.buttonText}>{title1}</Text>
      <Text style={styles.buttonText}>{title2}</Text>
    </View>
  )
  if (!title2) {
    title = <Text style={styles.buttonText}>{title1}</Text>
  }

  return (
    <TouchableHighlight
      style={style}
      onPress={onPress}
    >
      {title}
    </TouchableHighlight>
  )
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#9e9e9e',
    borderRadius: 4,
    padding: 10,
    marginLeft: 13
  },
  wideButton: {
    alignItems: 'center',
    backgroundColor: '#9e9e9e',
    borderRadius: 4,
    padding: 10,
    marginLeft: 13,
    width: '90%'    
  },
  buttonText: {
    color: 'white',
    fontFamily: 'caveat-regular',
    fontSize: 17
  },
  textAlignment: {
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default CustomButton