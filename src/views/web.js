'use strict';
var React = require('react');
var ReactNative = require('react-native');

var {
  StyleSheet,
  Image,
  Text,
  View,
  WebView
} = ReactNative;

var Constant = require('../constant');

var Page = React.createClass({
  render: function() {
    return (
      <WebView
        automaticallyAdjustContentInsets={false}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        source={{uri: Constant.SERVER.WEB, headers: {
          'X-User-Token': window.headers.token,
          'X-User-Email': window.headers.email
        }}}
        style={{marginTop: 20}}
      />
    );
  }
});

var styles = StyleSheet.create({
});

module.exports = Page;
