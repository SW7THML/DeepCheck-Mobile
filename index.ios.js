/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

 import React, { Component } from 'react';
 import {
  AppRegistry,
  Text,
  View,
  Image,
  ListView,
  TouchableHighlight,
  Navigator
} from 'react-native';

import Button from 'react-native-button';
var Platform = require('react-native').Platform;
var FileUpload = require('NativeModules').FileUpload;
// var Listitem = require('react-native-listitem');

//import GridView from './include/gridview.js';
import Scene from './include/scene.js';
var imagePicker = require('./include/image-picker.js').imagePicker;
var styles = require('./include/styles.js');

var server = "http://172.16.101.82:3000"

var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
class deepcheck extends Component {
  state = {
    avatarSource: null,
    videoSource: null,
    dataSource: ds.cloneWithRows([])
  };

  constructor(props, context) {
    super(props, context);
    this._fetch();
  }

  _fetch() {
    fetch(server + '/courses')
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        this.setState({dataSource: ds.cloneWithRows(responseJson.course)});
      })
      .catch((error) => {
        console.error(error);
      });
  }

  _upload(filepath) {
    var obj = {
      uploadUrl: server + '/photos',
      method: 'POST',
      headers: {
        'Accept': 'application/json',
      },
      fields: {
        photo: {
        }
      },
      files: [
        {
          name: 'photo[attachment]',
          filename: 'face.jpg', 
          filepath: filepath, 
        },
      ]
    };
    console.log(obj);
    FileUpload.upload(obj, function(err, result) {
      console.log('upload:', err, result);
    })
  }

  _handlePress() {
    imagePicker((response) => {
       // You can display the image using either data...
       const source = {uri: 'data:image/jpeg;base64,' + response.data, isStatic: true};

      // or a reference to the platform specific asset location
      if (Platform.OS === 'ios') {
        const source = {uri: response.uri.replace('file://', ''), isStatic: true};
      } else {
        const source = {uri: response.uri, isStatic: true};
      }

      this._upload(response.uri.replace('file://', ''));

      this.setState({
        avatarSource: source
      });
    });
  }

  _pressRow(rowData) {

  }

  _renderRow(rowData) {
    return (
      <TouchableHighlight onPress={this._pressRow}>
        <View style={styles.listitem}>
          <Text style={styles.text}>
            {rowData.id}
          </Text>
        </View>
      </TouchableHighlight>
    );
  }

  render() {
    const routes = [
      {title: 'Classes', index: 0},
      {title: 'ClassName', index: 1},
    ];
    return (
      <Navigator
        initialRoute={routes[0]}
        initialRouteStack={routes}
        renderScene={(route, navigator) =>
          <View style={styles.container}>
            <TouchableHighlight onPress={() => {
              if (route.index === 0) {
                navigator.push(routes[1]);
                
              } else {
                navigator.pop();
              }
            }}>

              // <Text style={styles.text}>
              //   deepcheck
              // </Text>
              // <ListView contentContainerStyle={styles.listview}
              //   dataSource={this.state.dataSource}
              //   renderRow={this._renderRow}
              // />

              // <Button
              //   style={{fontSize: 20, color: 'green'}}
              //   styleDisabled={{color: 'red'}}
              //   onPress={() => this._handlePress()}>
              //   Press Me!
              // </Button>

              // <Image source={this.state.avatarSource} style={styles.avatar}/>

            <Text>Hello {route.title}!</Text>
            </TouchableHighlight>
          </View>

          
        }
        style={{padding: 100}}
      />
    );
  }
}

AppRegistry.registerComponent('deepcheck', () => deepcheck);
