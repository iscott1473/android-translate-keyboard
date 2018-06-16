/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Alert,
  TouchableOpacity,
  TextInput
} from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});


export default class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      translateText: ''
    }
  }
  googleApiCall =  () => {
    fetch('https://translation.googleapis.com/language/translate/v2', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
        'Authorization': 'Bearer ' /* + insert your authorization code*/
      },
      body: JSON.stringify({
        q: this.state.translateText,
        source: 'en',
        target: 'zh-CN',
        format: 'text'
      })
    })
    .then(response => response.json())
    .then(json => JSON.stringify(json))
    .then(string => Alert.alert(string))
    .catch(err => console.error(err))
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>
          insert text to translate
        </Text>
        <TextInput 
          style={{borderColor: 'black'}}
          onChangeText={text => this.setState({translateText: text})}
          value={this.state.job}
        />
        <TouchableOpacity
          onPress={this.googleApiCall}
        >
          <Text>
            Press this to translate
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
