import React from 'react'
import { Header, Icon } from 'react-native-elements'
import { StyleSheet, View } from 'react-native'

const LeftComponent = ({ navigation }) => {
  return (
    <Icon
      name='open-book'
      type='entypo'
      color='white'
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
      onPress={() => navigation.navigate('Note')}
    />
  )
}

const RightComponent = ({ navigation }) => {
  return (
    <View style={styles.rightCOmponent}>
      <Icon
        name='magnifying-glass'
        type='entypo'
        color='white'
        onPress={() => navigation.navigate('Search')}
      />
      <Icon
        name='dots-three-vertical'
        type='entypo'
        color='white'
      />
    </View>
  )
}

const AppHeader = ({ navigation }) => {
  return (
    <Header
      outerContainerStyles={{ backgroundColor: '#513315', height: 90 }}
    >
      <LeftComponent navigation={navigation} />
      <CenterComponent navigation={navigation} />
      <RightComponent navigation={navigation} />
    </Header>
  )
}

const styles = StyleSheet.create({
  rightCOmponent: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 70
  }
})

export default AppHeader