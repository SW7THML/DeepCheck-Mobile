'use strict';
var React = require('react');
var ReactNative = require('react-native');
import AppIntro from 'react-native-app-intro';

var {
	Component
} = React;

var {
  StyleSheet,
  Image,
  Text,
  View,
	Alert
} = ReactNative;

class Page extends Component {
	onSkipBtnHandle = (index) => {
    console.log("skip", index);
    Actions.login();
  }
  doneBtnHandle = () => {
		Actions.login();
  }
  nextBtnHandle = (index) => {
    console.log("next", index);
  }
  onSlideChangeHandle = (index, total) => {
    console.log("slide", index, total);
  }
  render() {
    const pageArray = [{
      title: 'Page 1',
      description: 'Description 1',
      img: 'https://goo.gl/Bnc3XP',
      imgStyle: {
        height: 80 * 2.5,
        width: 109 * 2.5,
      },
      backgroundColor: '#fa931d',
      fontColor: '#fff',
      level: 10,
    }, {
      title: 'Page 2',
      description: 'Description 2',
      img: 'https://goo.gl/GPO6JB',
      imgStyle: {
        height: 93 * 2.5,
        width: 103 * 2.5,
      },
      backgroundColor: '#a4b602',
      fontColor: '#fff',
      level: 10,
    }, {
      title: 'Page 3',
      description: 'Description 3',
      img: 'https://goo.gl/Bnc3XP',
      imgStyle: {
        height: 80 * 2.5,
        width: 109 * 2.5,
      },
      backgroundColor: '#fa931d',
      fontColor: '#fff',
      level: 10,
    }];
    return (
      <AppIntro
        onNextBtnClick={this.nextBtnHandle}
        onDoneBtnClick={this.doneBtnHandle}
        onSkipBtnClick={this.onSkipBtnHandle}
        onSlideChange={this.onSlideChangeHandle}
        pageArray={pageArray}
      />
    );
  }
};

module.exports = Page;
