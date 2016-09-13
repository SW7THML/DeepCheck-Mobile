import {Actions, Scene, Router} from 'react-native-router-flux';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

var React = require('react');

window.React = React;
window.Actions = Actions

var Login = require('./components/Login');
var Courses = require('./components/Courses');
var CourseDetail = require('./components/CourseDetail');
var More = require('./components/More');
var Profile = require('./components/Profile');

const scenes = Actions.create(
  <Scene key="root">
    <Scene
      key="login" component={Login} title="Login"
      onRight={() => Actions.courses()}
      rightTitle = "Courses"
      onLeft={() => Actions.more()}
      leftTitle = "More"
    />
    <Scene
      key="courses" component={Courses} title="Courses"
      onRight={() => Actions.courseDetail(1)}
      rightTitle = "Detail"
    />
    <Scene
      key="courseDetail" component={CourseDetail} title="Detail"
      onRight={() => alert("Join")}
      rightTitle = "Join"
    />
    <Scene
      key="more" component={More} title="More"
      onRight={() => Actions.profile()}
      rightTitle = "Profile"
      />
    <Scene
      key="profile" component={Profile} title="Profile"
      onRight={() => alert("Logout")}
      rightTitle = "Logout"
    />
  </Scene>
);

class App extends React.Component {
  render() {
    return <Router scenes={scenes}/>
  }
}

module.exports = App;
