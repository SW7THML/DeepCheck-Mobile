import {
  Text,
  View,
  AsyncStorage,
  Linking
} from 'react-native';
import {Actions, ActionConst, Scene, Router} from 'react-native-router-flux';

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
var Web = require('./views/web');
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

    console.log('contructor');
    this.processURL = this.processURL.bind(this);
    this.handleOpenURL = this.handleOpenURL.bind(this);

		this.state = {
			tokenLoaded: false,
			loggedIn: false,
		};
	}

  componentWillMount() {
    console.log('will mount');
  }

  componentDidMount() {
    this._isAuthenticated().done();
    var self = this;
    Linking.getInitialURL().then(function(url) {
      console.log('get', url);
      if (url.length > 0) {
        //window.scheme = url;
        self.processURL(url, false);
      }
    });
    Linking.addEventListener('url', this.handleOpenURL);
    console.log('did mount');
  }

  componentWillUnmount() {
    Linking.removeEventListener('url', this.handleOpenURL);
  }

  processURL(url, open) {
    console.log('process', url);
    var scheme = url.split("://")[0];
		if(scheme == "deepcheck") {
			var path = url.split("://")[1];
			var action = path.split("?")[0];
			var params = path.split("?")[1];
			var courseId = params.split("=")[1];

			if(action == "join") {
      var url = 'http://localhost:3000/courses/' + courseId + '/preview';
        //alert(url);
        //Actions.refresh({url: url});
        //Actions.pop();
        window.scheme_url = url;
        //Actions.webview({url: url});
        if(open) {
          Actions.webview({url: url});
        }
        //Actions.tabs();
        console.log('schemed');
				//Course.join(courseId, (res) => {
				//	console.log("joined", res.course);
				//})
			}
		}
  }

  handleOpenURL(event) {
    console.log('Initial url is: ' + event.url);
    this.processURL(event.url, true);
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
				loggedIn: false // FIXME origin: true
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
			return <Router>
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
          <Scene key="webview"
            hideNavBar
            hideTabBar
            initial={true}
            component={Web}
            clone={true}
          >
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
            hideNavBar
            >
              <Scene
                key="web" component={Web}
              />
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
