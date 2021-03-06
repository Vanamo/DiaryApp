import React from 'react'
import { Header, Icon } from 'react-native-elements'
import RightComponent from './RightHeaderComponent'
import OptionsModal from './OptionsModal'

const LeftComponent = ({ navigation }) => {
  return (
    <Icon
      name='calendar'
      type='evilicon'
      color='white'
      size={35}
      onPress={() => navigation.navigate('Home')}
    />
  )
}

const CenterComponent = ({ navigation }) => {
  return (
    <Icon
      name='pencil'
      type='entypo'
      color='white'
      onPress={() => navigation.navigate('NewNote')}
    />
  )
}

const AppHeader = ({ navigation }) => {
  return (
    <Header
      outerContainerStyles={{ backgroundColor: '#595959', height: 90 }}
    >
      <LeftComponent navigation={navigation} />
      <CenterComponent navigation={navigation} />
      <RightComponent navigation={navigation} />
      <OptionsModal navigation={navigation}/>
    </Header>
  )
}

export default AppHeader