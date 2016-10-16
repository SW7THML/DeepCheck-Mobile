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

var WEBVIEW_REF = 'webview_1';

var Page = React.createClass({
  getInitialState: function() {
    var url = Constant.SERVER.WEB;
    if(this.props.url) {
      url = this.props.url;
      window.scheme_url = "";
    }
    if(window.scheme_url) {
      url = window.scheme_url;
    }

    console.log(this.props);
    console.log("url", url);

    return {
      url: url,
      canGoBack: false
    };
  },

  backHandler: function() {
    if(this.state.canGoBack) {
      this.refs[WEBVIEW_REF].goBack();
      return true;
    } else {
      return false;
    }
  },

  componentDidMount: function() {
    ReactNative.BackAndroid.addEventListener('hardwareBackPress', this.backHandler);
  },

  componentWillUnmount: function() {
     ReactNative.BackAndroid.removeEventListener('hardwareBackPress', this.backHandler);
  },

  onNavigationStateChange: function(navState) {
    console.log("changed", navState);
    this.setState({
      url: navState.url,
      canGoBack: navState.canGoBack
    })
  },

  goBack: function() {
    this.refs[WEBVIEW_REF].goBack();
  },

  render: function() {
    return (
      <WebView
        ref={WEBVIEW_REF}
        automaticallyAdjustContentInsets={false}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        source={{uri: this.state.url, headers: {
          //'X-User-Token': window.headers.token,
          //'X-User-Email': window.headers.email
        }}}
        onNavigationStateChange={this.onNavigationStateChange}
        style={{marginTop: 0}}
      />
    );
  }
});

var styles = StyleSheet.create({
});

module.exports = Page;
