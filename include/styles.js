'use strict';

import {
  StyleSheet
} from 'react-native';

module.exports = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    marginTop: 10,
  },
  listview: {
    justifyContent: 'center',
    flexDirection: 'column',
    flexWrap: 'wrap'
  },
  listitem: {
    width: 350,
    height: 60,
    alignItems: 'center',

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
  avatar: {
    borderRadius: 75,
    width: 150,
    height: 150
  },
  text: {
    marginTop: 5,
    fontWeight: 'bold'
  }
});