var ReactNative = require('react-native');
var {
  StyleSheet,
  Image,
  Text,
  View,
  ListView,
  TouchableHighlight,
} = ReactNative;

var Course = require('../models/courses');

class Page extends React.Component {
  constructor(props) {
    super(props);

    var courses = [];
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.id !== r2.id});
    this._fetchCourses();

    this.state = {
      courses: ds.cloneWithRows(courses),
    };
  }

  _fetchCourses() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.id !== r2.id});
    Course.all((res) => {
      this.setState({
        courses: ds.cloneWithRows(res.my_courses),
        myCourses: ds.cloneWithRows(res.my_courses)
      })
    })
  }

  render() {
    return (
      <ListView
        enableEmptySections={true}
        dataSource={this.state.courses}
        renderRow={(row) =>
        <TouchableHighlight style={styles.row}
          onPress={() => Actions.courseDetail(row.id) }
        >
          <Text>{row.name}</Text>
        </TouchableHighlight>}
      />
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#F6F6F6',
  },
  text: {
    fontSize: 24,
    fontWeight: "100",
    color: 'black',
  },
});

module.exports = Page;
