import React, { Component } from 'react';
import Backend from './Backend';
import {GiftedChat} from 'react-native-gifted-chat'

export default class Chat extends Component {
  state = {
    messages: [],
  }
  render() {
    console.log(this.props);
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={message => {
          Backend.sendMessage(message)
        }}
        user={{
          _id: Backend.getUid(),
          name: this.props.navigation.state.params.name
        }}
      />
    );
  }
  componentDidMount() {
    Backend.loadMessage(message => {
      this.setState((previousState) => {
        return {
          messages: GiftedChat.append(previousState.messages, message)
        }
      })
    })
  }
  componentUnMount() {
    Backend.closeChat();
  }
}

