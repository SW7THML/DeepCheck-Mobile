var ReactNative = require('react-native');
var {
  StyleSheet,
  Image,
  Text,
  View,
} = ReactNative;

var Course = require('../models/courses');

var Page = React.createClass({
  getInitialState: function() {
    console.log(this.props.navigationState);
    console.log(this.props);
    var course = {id: this.props.data, name: ''};
    console.log(course);
    this._fetchCourse(course.id);

    return {
      course: course
    };
  },

  _fetchCourse(id) {
    Course.get(id, (res) => {
      this.setState({
        course: res.course
      });
    })
  },

  render: function() {
    return (
      <View style={styles.container}>
        <Text>{this.state.course.short_link}</Text>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

module.exports = Page;
