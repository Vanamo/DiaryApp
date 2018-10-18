import React from 'react'
import { connect } from 'react-redux'
import { ScrollView, StyleSheet, Text, TextInput, TouchableHighlight, View }
  from 'react-native'
import { Icon } from 'react-native-elements'
import { setInitialTab } from '../reducers/tabReducer'

class SearchScreen extends React.Component {

  state = {
    searchPhrase: ''
  }

  includesString = (string, note) => {
    const includes = note.textInputs
      .filter(t => t.text.toLowerCase().includes(string))
    if (includes.length) return includes
  }

  showNote = (note) => {
    const userNote = this.props.userNotes.find(un => un.id === note.id)
    const index = this.props.userNotes.indexOf(userNote)
    this.props.setInitialTab(index)
    this.props.navigation.navigate('NoteView')
  }

  render() {
    const searchPhrase = this.state.searchPhrase
    let notes = []
    const searchString = searchPhrase.toLowerCase()
    const notesWithText = this.props.userNotes.filter(un => un.textInputs)
    const filteredNotes = notesWithText.filter(un => this.includesString(searchString, un))

    let info = null
    if (!searchString) {
      info = null
    } else if (filteredNotes.length > 50) {
      info = <Text style={styles.info}>Rajaa hakua</Text>
    } else if (!filteredNotes.length) {
      info = <Text style={styles.info}>Ei hakutuloksia</Text>
    } else {
      notes = filteredNotes.map((fn) => {
        let date = fn.startDate
        if (fn.endDate !== fn.startDate) {
          date += ' - ' + fn.endDate
        }
        let texts = fn.textInputs.filter(ti => ti.text.toLowerCase().includes(searchString))
        texts = texts.map((t) => {
          const firstIndex = t.text.toLowerCase().indexOf(searchString)
          const lastIndex = firstIndex + searchString.length
          if (t.text.length <= lastIndex + 30) {
            if (firstIndex <= 10) {
              return { ...t, text: t.text }
            } else {
              const text = t.text.substring(firstIndex - 10, t.text.length)
              return { ...t, text: '...' + text }
            }
          } else {
            if (firstIndex <= 20) {
              const text = t.text.substring(0, lastIndex + 30)
              return { ...t, text: text + '...' }
            } else {
              const text = t.text.substring(firstIndex - 10, lastIndex + 30)
              return { ...t, text: '...' + text + '...' }
            }
          }
        })
        return {
          id: fn.id,
          date,
          texts
        }
      })
    }

    return (
      <ScrollView
        keyboardShouldPersistTaps='always'
        style={{ flex: 1, backgroundColor: 'white' }}
      >
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
          {info}
          {notes.map(n => (
            <View
              style={styles.noteContainer}
              key={n.id}
            >
              <TouchableHighlight
                onPress={() => this.showNote(n)}
              >
                <View>
                  <Text style={styles.noteText}>{n.date}</Text>
                  {n.texts.map((t, i) =>
                    <Text
                      key={i}
                      style={styles.noteText}
                    >{t.text}</Text>
                  )}
                </View>
              </TouchableHighlight>
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
    marginBottom: 13,
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
  },
  info: {
    fontFamily: 'dancing-regular',
    color: 'red',
    fontSize: 18,
    margin: 13
  },
  noteContainer: {
    marginLeft: 13,
    marginBottom: 13,
    backgroundColor: '#bfbfbf',
    borderWidth: 1,
    borderColor: 'grey',
    padding: 5,
    width: '90%'
  },
  noteText: {
    fontFamily: 'dancing-bold',
    fontSize: 18
  }
})

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
  }
}

export default connect(
  mapStateToProps,
  { setInitialTab }
)(SearchScreen)