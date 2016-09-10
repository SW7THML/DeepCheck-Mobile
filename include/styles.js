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
  },
  listview: {
    flexDirection: 'row',
    paddingRight: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e9e9e9',
  },
  listitem: {
    fontSize: 20,
    textAlign: 'left',
    margin: 10,
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
  }
});