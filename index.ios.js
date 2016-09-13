'use strict';

import React, { Component } from 'react';
import {
  AppRegistry,
  Modal,
  TouchableHighlight,
  StyleSheet,
  Text,
  Image,
  View
} from 'react-native';

import AwesomeButton from 'react-native-awesome-button';
var LinkingIOS = require('LinkingIOS');
var qs = require('qs');



class deepcheck extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      modalVisible: false,
      modalMessage: null
    };

    this._processURL = this._processURL.bind(this);
  }

  componentDidMount() {
    LinkingIOS.addEventListener('url', this._processURL);
  } 

  componentWillUnmount() {
    LinkingIOS.removeEventListener('url', this._processURL);
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
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
        var message = course['name'];

        this.setState({
          modalVisible: true,
          modalMessage: message,
        })
      })
      .done();
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

        <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {alert("Modal has been closed.")}}
          >
         <View style={{marginTop: 22}}>

          <View style = {{backgroundColor: 'skyblue'}}>

            <TouchableHighlight onPress={() => {
              this.setModalVisible(!this.state.modalVisible)
            }}>
              <Text style={styles.white}>Exit </Text>
            </TouchableHighlight>
          </View>

          <View style={{justifyContent: 'center', alignItems: 'center'}}>      
            <Image source={require('./circle.png')} style={{height: 200, width: 200, marginTop: 60, marginBottom:10}}/>
            <Text style={styles.coursename}>{this.state.modalMessage}</Text>
          </View>

          <View style={styles.joinbutton}>
            <AwesomeButton states={{
              default: {
              text: 'Enroll',
              onPress: this.handleButtonPress,
              backgroundColor: '#1155DD'
              }
             }} />
          </View>


         </View>
        </Modal>
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
  coursename: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 30,
  },
  white: {
    textAlign: 'right',
    fontSize: 20,
    margin: 1,
  },
  joinbutton: {
    margin: 50,
  }
});

AppRegistry.registerComponent('deepcheck', () => deepcheck);