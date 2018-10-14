import React, { Component } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';

export default class Home extends Component {
constructor(props) {
  super(props);
  this.state = {
    name: ''
  }
}
  render() {
    return (
      <View>
        <Text style={styles.title}>
         Enter your name here: {this.state.name}
        </Text>
        <TextInput onChangeText={(text) => {
          this.setState({
            name: text
          });
          console.log(this.state)
        }} value={this.state.name}  style={styles.input} placeholder='Jhon'/>
        <TouchableOpacity 
        onPress={() => {
          Actions.chat({
            name: this.state.name
          });
        }}
        >
          <Text style={styles.button}>
            Next
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

let styles = StyleSheet.create({
  title: {
    marginTop: 20,
    marginLeft: 20,
    fontSize: 20
  },
  input: {
    height: 40,
    borderWidth: 2,
    borderColor: 'black',
    margin: 20,
    paddingLeft: 20
  },
  button: {
    marginLeft: 20,
    fontSize: 23
  }
})