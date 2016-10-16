import {
  Text,
  View,
  AsyncStorage,
  Linking
} from 'react-native';
import {Actions, ActionConst, Scene, Router} from 'react-native-router-flux';

var Constant = require('./constant');
var React = require('react');

window.React = React;
window.Actions = Actions;
window.before_url = "";

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

// tabs
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
      if (url != undefined && url.length > 0) {
        //window.scheme = url;
        if(window.before_url != url) {
          window.before_url = url;
          self.processURL(url, false);
        }
      }
    }).catch(function(err) { console.log(err) });
    Linking.addEventListener('url', this.handleOpenURL);
    console.log('did mount');
  }

  componentWillUnmount() {
    window.before_url = "";
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
        var url = Constant.SERVER.WEB + '/courses/' + courseId + '/preview';
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
          <Scene key="webview"
          hideNavBar
          hideTabBar
          initial={true}
          component={Web}
          clone={true}
          >
          </Scene>
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
