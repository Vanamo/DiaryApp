import React from 'react'
import { connect } from 'react-redux'
import { createMaterialTopTabNavigator } from 'react-navigation'
import NoteViewScreen from './NoteViewScreen'
import { database } from 'firebase';

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

const sortByStartDate = (a, b) => {
  const d1 = new Date(a.startDate.split('.').reverse().join('-'))
  const d2 = new Date(b.startDate.split('.').reverse().join('-'))
  if (d1 < d2) {
    return -1
  } else if (d1 > d2) {
    return 1
  } else {
    return 0
  }
}

const mapStateToProps = (state) => {
  return {
    userNotes: state.userNotes.sort(sortByStartDate),
    initialTab: state.initialTab
  }
}

export default connect(
  mapStateToProps
)(NoteViewTabs)