import React from 'react'
import DatePicker from 'react-native-datepicker'
import { StyleSheet, View } from 'react-native'
import { Icon } from 'react-native-elements'

class NoteScreen extends React.Component {

  state = {
    startDate: null,
    endDate: null
  }

  render() {
    return (
      <View style={styles.container}>
        <DatePicker
          style={{ width: 170 }}
          date={this.state.startDate}
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
          onDateChange={(date) => this.setState({ startDate: date, endDate: date })}
        />
        <DatePicker
          style={{ width: 120 }}
          date={this.state.endDate}
          mode='date'
          placeholder='loppupäivä'
          format='DD.MM.YYYY'
          androidMode='calendar'
          maxDate={new Date()}
          onDateChange={(date) => this.setState({ endDate: date })}
          showIcon={false}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    height: 100,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default NoteScreen