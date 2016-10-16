import {
  AppRegistry,
} from 'react-native';

window.Web = require('./src/views/web_android');
//window.Web = require('./src/views/web');
var App = require('./src/app');
AppRegistry.registerComponent('deepcheck', () => App);
