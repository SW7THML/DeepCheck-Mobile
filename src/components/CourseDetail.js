'use strict';
var React = require('react');
var ReactNative = require('react-native');

var {
  StyleSheet,
  Image,
  Text,
  View,
} = ReactNative;

var Page = React.createClass({
  render: function() {
    return (
      <View style={styles.container}>
        <Text>Course Detail</Text>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

module.exports = Page;
