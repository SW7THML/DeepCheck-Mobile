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

//var WebViewAndroid = require('react-native-webview-android');
import AndroidWebView from '../AndroidWebView'
//var WebView = require('react-native-webview');

var Constant = require('../constant');

var WEBVIEW_REF = 'webview_2';

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
    console.log('back handler');
    //console.log(this.refs);
    if(this.state.canGoBack) {
      this.refs[WEBVIEW_REF].goBack();
      return true;
    } else {
      return false;
    }
  },

  componentDidMount: function() {
    console.log('mount');
    ReactNative.BackAndroid.addEventListener('hardwareBackPress', this.backHandler);
    console.log('end');
  },

  componentWillUnmount: function() {
    console.log('unmount');
     ReactNative.BackAndroid.removeEventListener('hardwareBackPress', this.backHandler);
    console.log('end');
  },

  onNavigationStateChange: function(navState) {
    console.log("nav changed", navState);
    this.setState({
      canGoBack: navState.canGoBack
    })
  },

  goBack: function() {
    this.refs[WEBVIEW_REF].goBack();
  },

  render: function() {
    return (
      <AndroidWebView
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
