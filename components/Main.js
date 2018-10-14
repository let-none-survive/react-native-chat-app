import React from 'react';

import Home from './Home';
import Chat from './Chat';

import {
  Router,
  Scene
} from 'react-native-router-flux'

export default class Main extends React.Component {
  render() {
    return (
        <Router>
          <Scene key='root'>
            <Scene key='home' component={Home} title='Home'></Scene>
            <Scene key='chat' component={Chat} title='Chat'></Scene>
          </Scene>
        </Router>
      )
  }
}