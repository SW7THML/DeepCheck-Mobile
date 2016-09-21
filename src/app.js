import {
  Text,
  View,
  AsyncStorage,
  Linking
} from 'react-native';
import {Actions, Scene, Router} from 'react-native-router-flux';

var Constant = require('./constant');
var Course = require('./models/courses');
var React = require('react');

window.React = React;
window.Actions = Actions;

var Styles = require('./styles');
// define this based on the styles/dimensions you use
const getSceneStyle = (/* NavigationSceneRendererProps */ props, computedProps) => {
  const style = {
    flex: 1,
    backgroundColor: '#fff',
    shadowColor: null,
    shadowOffset: null,
    shadowOpacity: null,
    shadowRadius: null,
  };
  if (computedProps.isActive) {
    style.marginTop = computedProps.hideNavBar ? 0 : 64;
    style.marginBottom = computedProps.hideTabBar ? 0 : 50;
  }
  return style;
};

var Course = require('./models/courses');

// intro
var Preview = require('./views/preview');
var Login = require('./views/login');
// tabs
var Courses = require('./views/courses');
var CourseDetail = require('./views/course_detail');
var CourseCreate = require('./views/course_create');
var More = require('./views/more');
var Profile = require('./views/profile');
// etc
var Error = require('./views/error');

import TabIcon from './views/tab_icon';

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			tokenLoaded: false,
			loggedIn: false,
		};
	}

  componentDidMount() {
    this._isAuthenticated().done();
    Linking.addEventListener('url', this._handleOpenURL);
  }

  componentWillUnmount() {
    Linking.removeEventListener('url', this._handleOpenURL);
  }

  _handleOpenURL(event) {
    console.log('Initial url is: ' + event.url);

    var scheme = event.url.split("://")[0];
		if(scheme == "deepcheck") {
			var path = event.url.split("://")[1];
			var action = path.split("?")[0];
			var params = path.split("?")[1];
			var courseId = params.split("=")[1];

			if(action == "join") {
				Course.join(courseId, (res) => {
					console.log("joined", res.course);
				})
			}
		}
  }

	async _isAuthenticated() {
		var token = await AsyncStorage.getItem(Constant.KEYS.TOKEN);
		var email = await AsyncStorage.getItem(Constant.KEYS.EMAIL);
		console.log('token', token, 'email', email);

		if(token != undefined && token.length > 0) {
			window.headers = {
				token: token,
				email: email
			};

			this.setState({
				tokenLoaded: true,
				loggedIn: true
			})
		} else {
			this.setState({
				tokenLoaded: true,
				loggedIn: false
			})
		}
	}

  render() {
		if(this.state.tokenLoaded) {
			return <Router getSceneStyle={getSceneStyle}>
				<Scene key="root">
					<Scene key="intro" hideNavBar hideTabBar initial={!this.state.loggedIn}>
						<Scene
							key="preview" component={Preview} title="Preview"
							onRight={() => Actions.courses()}
							rightTitle = "Courses"
							onLeft={() => Actions.more()}
							leftTitle = "More"
						/>
						<Scene
							key="login" component={Login} title="Login"
							onRight={() => Actions.courses()}
							rightTitle = "Courses"
							onLeft={() => Actions.more()}
							leftTitle = "More"
						/>
					</Scene>
          <Scene key="tabs"
            tabs
            tabBarStyle={Styles.tabBarStyle}
            tabBarSelectedItemStyle={Styles.tabBarSelectedItemStyle}
            initial={this.state.loggedIn}
          >
            <Scene
            key="tabCourse"
            title="Courses"
            icon={TabIcon}
            >
              <Scene
                key="courses" component={Courses} title="Courses"
                onRight={() => Actions.courseCreate()}
                rightTitle = "Create"
              />
              <Scene
                key="courseCreate" component={CourseCreate} title="Create a Course"
                onRight={() => alert("Create")}
                rightTitle = "Create"
              />
              <Scene
                key="courseDetail" component={CourseDetail} title="Detail"
                onRight={() => alert("Join")}
                rightTitle = "Join"
              />
            </Scene>
            <Scene
            key="tabMore"
            title="More"
            icon={TabIcon}
            >
              <Scene
                key="more" component={More} title="More"
                onRight={() => Actions.profile()}
                rightTitle = "Profile"
                />
              <Scene
                key="profile" component={Profile} title="Profile"
								onRight={() => {
										Course.logout()
										this.setState({
											tokenLoaded: true,
											loggedIn: false
										})
									}
								}
                rightTitle = "Logout"
              />
            </Scene>
					</Scene>
					<Scene key="error" component={Error} />
				</Scene>
			</Router>
		} else {
			return <View style={Styles.container}>
				<Text>Loading...</Text>
			</View>
		}
  }
}

module.exports = App;
