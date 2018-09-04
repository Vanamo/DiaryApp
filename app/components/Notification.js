import React from 'react'
import { connect } from 'react-redux'
import { Text, View } from 'react-native'

class Notification extends React.Component {
  render() {
    const notification = this.props.notification

    if (notification.message) {
      if (notification.style === 'success') {
        return (
          <View>
            <Text>
              {notification.message}
            </Text>
          </View>
        )
      } else if (notification.style === 'error') {
        return (
          <View>
            <Text>
              {notification.message}
            </Text>
          </View>
        )
      }
    } else {
      return (
        null
      )
    }
  }
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

export default connect(
  mapStateToProps
)(Notification)