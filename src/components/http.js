var Constant = require('../constant')

var Http = {
  get: (path, params, callback) => {
    fetch(Constant.SERVER + path, {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      headers: {
        'X-User-Token': window.headers.token,
        'X-User-Email': window.headers.email
      }
    })
    .then((response) => response.json())
    .then((json) => {
      callback(json);
      console.log(json);
    })
    .done();
  },

  post: (path, params, callback) => {
    fetch(Constant.SERVER + path, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      headers: {
        'X-User-Token': window.headers.token,
        'X-User-Email': window.headers.email
      }
    })
    .then((response) => response.json())
    .then((json) => {
      callback(json);
      console.log(json);
    })
    .done();
  },

  put: (path, params, callback) => {
    fetch(Constant.SERVER + path, {
      method: "PUT",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      headers: {
        'X-User-Token': window.headers.token,
        'X-User-Email': window.headers.email
      }
    })
    .then((response) => response.json())
    .then((json) => {
      callback(json);
      console.log(json);
    })
    .done();
  },

  delete: (path, params, callback) => {
    fetch(Constant.SERVER + path, {
      method: "DELETE",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      headers: {
        'X-User-Token': window.headers.token,
        'X-User-Email': window.headers.email
      }
    })
    .then((response) => response.json())
    .then((json) => {
      callback(json);
      console.log(json);
    })
    .done();
  }
}

module.exports = Http
