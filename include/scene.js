import React, { Component, PropTypes } from 'react';
import { Text, TouchableHighlight, View } from 'react-native';

class Scene extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    // index: PropTypes.number.isRequired,
    onForward: PropTypes.func.isRequired,
    onBack: PropTypes.func.isRequired,
  }

  render() {
    return (
      <View>
        <Text>Current Scene: { this.props.title }</Text>
        <TouchableHighlight onPress={this.props.onForward}>
          <Text>Tap me to load the next scene</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={this.props.onBack}>
          <Text>Tap me to go back</Text>
        </TouchableHighlight>
      </View>
    )
  }
}
module.exports = Scene;