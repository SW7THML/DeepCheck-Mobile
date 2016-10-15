import {
  AsyncStorage,
} from 'react-native';

var Http = require('../components/http')

var Constant = require('../constant');

var Course = {
  all: (callback) => {
    Http.get('/api/courses', null, (res) => {
      callback(res);
    })
  },

  get: (id, callback) => {
    Http.get('/api/courses/' + id, null, (res) => {
      callback(res);
    })
  },

  join: (id, callback) => {
    Http.post('/api/courses/' + id + "/join", null, (res) => {
      callback(res);
    })
  },

	logout: async function() {
      await AsyncStorage.setItem(Constant.KEYS.TOKEN, "");
      await AsyncStorage.setItem(Constant.KEYS.EMAIL, "");

      console.log(Constant.KEYS.TOKEN);
      console.log(Constant.KEYS.EMAIL);
	}
}

module.exports = Course;
