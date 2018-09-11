import React from 'react'
import { StyleSheet, View } from 'react-native'
import { connect } from 'react-redux'
import { Icon } from 'react-native-elements'
import { showOptions } from '../reducers/optionsModalReducer'


class RightComponent extends React.Component {

  render() {
    return (
      <View style={styles.rightComponent}>
        <Icon
          name='magnifying-glass'
          type='entypo'
          color='white'
          onPress={() => this.props.navigation.navigate('Search')}
        />
        <Icon
          name='dots-three-vertical'
          type='entypo'
          color='white'
          onPress={() => this.props.showOptions()}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  rightComponent: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 100
  }
})

export default connect(
  null,
  { showOptions }
)(RightComponent)