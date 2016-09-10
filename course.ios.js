'use strict';

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

var LinkingIOS = require('LinkingIOS');
var qs = require('qs');


class deepcheck extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {};
    this._processURL = this._processURL.bind(this);
  }

  componentDidMount() {
    LinkingIOS.addEventListener('url', this._processURL);
  } 

  componentWillUnmount() {
    LinkingIOS.removeEventListener('url', this._processURL);
  }

  _processURL(e) {
    var url = e.url.replace('mycustomurl://', '').split('?');
    var path = url[0];
    var params = url[1] ? qs.parse(url[1]) : null;
    
    var course_id = params["course_id"];

    console.log(course_id);

    fetch('http://localhost:3000/api/courses/4')
      .then((response) => response.json())
      .then((course) => {
        console.log("name = ");
        console.log(course['name']);
        return course;
      })
      .done();

    // fetch('http://localhost:3000/api/courses/4')
    //   .then((response) => response.json())
    //   .then((responseJson) => {
    //     return responseJson.name;
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });

    //fetch('http://localhost:3000/')
    // fetch('http://localhost:3000/api/courses/8')
    //  .then((response) => console.log(response))
    //  .done();

    // console.log(fetch('http://localhost:3000/api/courses/8'));
    // do something here based on `path` and `params`
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.ios.js
        </Text>
        <Text style={styles.instructions}>
          Press Cmd+R to reload,{'\n'}
          Cmd+D or shake for dev menu
        </Text>
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

AppRegistry.registerComponent('deepcheck', () => deepcheck);