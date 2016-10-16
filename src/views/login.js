var React = require('react');
var ReactNative = require('react-native');

var {
  StyleSheet,
  Image,
  Text,
  View,
  AsyncStorage
} = ReactNative;

var {FBLogin, FBLoginManager} = require('react-native-facebook-login');

var FB_PHOTO_WIDTH = 200;

var SERVER = "http://127.0.0.1:3000";
var Constant = require('../constant');

var TOKEN_KEY = Constant.KEYS.TOKEN;
var EMAIL_KEY = Constant.KEYS.EMAIL;

var Page = React.createClass({
  getInitialState: function() {
    this._isAuthenticated();
    return {
      user: null,
    };
  },

  async _isAuthenticated() {
    var token = await AsyncStorage.getItem(TOKEN_KEY);
    var email = await AsyncStorage.getItem(EMAIL_KEY);
    console.log('token', token);
    console.log('email', email);
    if(token != undefined && token.length > 0) {
      window.headers = {
        token: token,
        email: email
      };
      Actions.tabs();
    }
  },

  async _onValueChange(key, value) {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.log('AsyncStorage error: ' + error.message);
    }
  },

  signup: function(data) {
    fetch(SERVER + "/api/users", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        token: data.token
      })
    })
    .then((response) => response.json())
    .then((responseData) => {
      console.log(responseData);
      var token = responseData.user.authentication_token;
      var email = responseData.user.email;

      this._onValueChange(TOKEN_KEY, token);
      this._onValueChange(EMAIL_KEY, email);

      window.headers = {
        token: token,
        email: email
      };
      Actions.tabs();
    })
    .done();
  },

  render: function() {
    var _this = this;
    var user = this.state.user;

    return (
      <View style={styles.container}>

        { user && <Photo user={user} /> }
        { user && <Info user={user} /> }

        <FBLogin style={{ marginBottom: 10, }}
          permissions={["email","user_friends"]}
          onLogin={function(data){
            console.log("Logged in!");
            console.log(data);

            _this.signup(data.credentials);

            _this.setState({ user : data.credentials });
          }}
          onLogout={function(){
            console.log("Logged out.");
            _this.setState({ user : null });
          }}
          onLoginFound={function(data){
            console.log("Existing login found.");
            console.log(data);
            _this.setState({ user : data.credentials });

            _this.signup(data.credentials);
          }}
          onLoginNotFound={function(){
            console.log("No user logged in.");
            _this.setState({ user : null });
          }}
          onError={function(data){
            console.log("ERROR");
            console.log(data);
          }}
          onCancel={function(){
            console.log("User cancelled.");
          }}
          onPermissionsMissing={function(data){
            console.log("Check permissions!");
            console.log(data);
          }}
        />
      </View>
    );
  }
});

var Photo = React.createClass({
  propTypes: {
    user: React.PropTypes.object.isRequired,
  },

  getInitialState: function(){
    return {
      photo: null,
    };
  },

  componentWillMount: function(){
    var _this = this;
    var user = this.props.user;
    var api = `https://graph.facebook.com/v2.3/${user.userId}/picture?width=${FB_PHOTO_WIDTH}&redirect=false&access_token=${user.token}`;

    fetch(api)
      .then((response) => response.json())
      .then((responseData) => {
        _this.setState({
          photo : {
            url : responseData.data.url,
            height: responseData.data.height,
            width: responseData.data.width,
          },
        });
      })
      .done();
  },

  render: function(){
    if(this.state.photo == null) return this.renderLoading();

    var photo = this.state.photo;

    return (
      <View style={styles.bottomBump}>
      </View>
    );
  },
  renderLoading: function(){
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }
});

var Info = React.createClass({
  propTypes: {
    user: React.PropTypes.object.isRequired,
  },

  getInitialState: function(){
    return {
      info: null,
    };
  },

  componentWillMount: function(){
    var _this = this;
    var user = this.props.user;
    var api = `https://graph.facebook.com/v2.3/${user.userId}?fields=name,email&access_token=${user.token}`;

    fetch(api)
      .then((response) => response.json())
      .then((responseData) => {
        _this.setState({
          info : {
            name : responseData.name,
            email: responseData.email,
          },
        });
      })
      .done();
  },

  render: function(){
    var info = this.state.info;

    return (
      <View style={styles.bottomBump}>
        <Text>Loading</Text>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    marginTop: 150,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomBump: {
    marginBottom: 15,
  },
});

module.exports = Page;
