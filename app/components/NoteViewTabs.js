import React from 'react'
import { connect } from 'react-redux'
import { createMaterialTopTabNavigator } from 'react-navigation'
import NoteViewScreen from './NoteViewScreen'

class NoteViewTabs extends React.Component {

  render() {
    const tabs = this.props.userNotes.reduce((acc, val, i) => {
      acc[`Note${i}`] = {
        screen: props =>
          <NoteViewScreen
            note={val}
            navigation={this.props.navigation}
          />
      }
      return acc
    }, {})

    const initialRouteName = `Note${this.props.initialTab}`
    console.log('tabs', tabs, initialRouteName)

    const NoteViewTabs = createMaterialTopTabNavigator(
      tabs,
      {
        swipeEnabled: true,
        initialRouteName,
        navigationOptions: {
          tabBarVisible: false
        }
      }
    )
    console.log('uN', this.props.userNotes)
    return (
      <NoteViewTabs />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    userNotes: state.userNotes,
    initialTab: state.initialTab
  }
}

export default connect(
  mapStateToProps
)(NoteViewTabs)