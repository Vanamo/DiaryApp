import React from 'react'
import { Icon } from 'react-native-elements'

const RemoveIcon = ({ onPress, disabled }) => {
  let color = 'red'
  if (disabled) {
    color = '#b3b3b3'
  }
  return (
    <Icon
      name='circle-with-minus'
      type='entypo'
      color={color}
      size={30}
      iconStyle={{ marginLeft: 10 }}
      onPress={onPress}
    />
  )
}

export default RemoveIcon