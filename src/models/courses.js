import {
  AsyncStorage,
} from 'react-native';

var Http = require('../components/http')

var Constant = require('../constant');

var Course = {
  all: (callback) => {
    Http.get('/courses', null, (res) => {
      callback(res);
    })
  },

  get: (id, callback) => {
    Http.get('/courses/' + id, null, (res) => {
      callback(res);
    })
  },

  join: (id, callback) => {
    Http.post('/courses/' + id + "/join", null, (res) => {
      callback(res);
    })
  },

	logout: async function() {
      await AsyncStorage.setItem(Constant.KEYS.TOKEN, "");
      await AsyncStorage.setItem(Constant.KEYS.EMAIL, "");
	}
}

module.exports = Course;
