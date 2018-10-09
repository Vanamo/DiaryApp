import React from 'react'
import { connect } from 'react-redux'
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import { Icon } from 'react-native-elements'
import notes from '../services/notes';

class SearchScreen extends React.Component {

  state = {
    searchPhrase: ''
  }

  includesString = (string, note) => {
    const includes = note.textInputs
      .filter(t => t.text.toLowerCase().includes(string))
    if (includes.length) return includes
  }

  render() {
    const searchPhrase = this.state.searchPhrase
    let notes = []
    if (searchPhrase.length > 2) {
      const searchString = searchPhrase.toLowerCase()
      const notesWithText = this.props.userNotes.filter(un => un.textInputs)
      const filteredNotes = notesWithText.filter(un => this.includesString(searchString, un))

      notes = filteredNotes.map((fn) => {
        let date = fn.startDate
        if (fn.endDate !== fn.startDate) {
          date += ' - ' + fn.endDate
        }
        const texts = fn.textInputs.filter(ti => ti.text.toLowerCase().includes(searchString))
        return {
          id: fn.id,
          date,
          texts
        }
      })
    }

    return (
      <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={styles.container}>
          <Text style={styles.title}>
            Etsi muistiinpanoista
          </Text>
          <View style={styles.inline}>
            <TextInput
              autoCapitalize='none'
              style={styles.textInput}
              onChangeText={searchPhrase => this.setState({ searchPhrase })}
              value={this.state.searchPhrase}
              underlineColorAndroid='transparent'
            >
            </TextInput>
            <Icon
              name='magnifying-glass'
              type='entypo'
              color='#9e9e9e'
              containerStyle={styles.iconContainer}
            />
          </View>
          {notes.map(n => (
            <View
              key={n.id}
            >
              <Text>{n.date}</Text>
              {n.texts.map((t, i) =>
                <Text
                  key={i}
                >{t.text}</Text>
              )}
            </View>
          ))}
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: 'white'
  },
  title: {
    fontFamily: 'dancing-bold',
    fontSize: 20,
    margin: 13
  },
  textInput: {
    height: 40,
    width: '50%',
    borderColor: '#9e9e9e',
    borderWidth: 1,
    marginTop: 8,
    marginLeft: 13,
    paddingLeft: 5,
    borderRadius: 4
  },
  inline: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  iconContainer: {
    backgroundColor: 'transparent',
    marginTop: 8,
    padding: 5,
    height: 40,
    width: 40
  }
})

const mapStateToProps = (state) => {
  return {
    userNotes: state.userNotes,
  }
}

export default connect(
  mapStateToProps
)(SearchScreen)