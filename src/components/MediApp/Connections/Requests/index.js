import React, {Component} from 'react';
import {FlatList, StyleSheet, View} from "react-native";
import {Text} from "react-native-elements";
import {connect} from "react-redux";

import {colors, fontFamilyRegular, fonts, padding} from "../../../../styles/base";
import EmptyResult from "../../Components/EmptyResult";
import AppSearchBar from "../../../utility/AppSearchBar";
import MemberItem from "./../MemberItem";
import ComDialog from "./ComDialog";
import {messages} from "../data";
import {getRequested} from "../../../../actions/ConnectionAction";

class Requests extends Component {

  state = {dataSource: this.props.requested, selectedUser: null, refreshing: false};
  filterSearch = (keywords) => {
    const filteredUsers = this.props.requested.filter((item) => {
      const fname = item.fname.toLocaleLowerCase();
      const lname = item.lname.toLocaleLowerCase();
      const email = item.email.toLocaleLowerCase();
      const searchStr = keywords.toLocaleLowerCase();

      return (fname.indexOf(searchStr) > -1 || lname.indexOf(searchStr) > -1 || email.indexOf(searchStr) > -1);
    });

    this.setState({
      dataSource: filteredUsers,
      keywords: keywords
    })
  };
  renderSeparator = () => {
    return <View style={styles.separator}/>;
  };
  /**
   * Toggle Select User
   */
  toggleSelectUser = (item) => {
    this.setState({selectedUser: item});
  };
  /**
   * On Message press
   */
  onPressMessage = (item) => {
    console.log('On Message press: ', item);
  };

  componentWillMount() {
    this.props.getRequested(this.props.user.id);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.currentRoute === 'requests' && this.props.currentRoute !== 'requests') {
      this.props.getRequested(this.props.user.id);
    }

    this.setState({dataSource: nextProps.requested, refreshing: false})
  }

  render() {
    const {dataSource, selectedUser, refreshing} = this.state;
    const {requests} = messages;

    return (
      <View style={[fontFamilyRegular, styles.container]}>
        <View style={{padding: 10, backgroundColor: '#EDEDED'}}>
          <AppSearchBar placeholder={requests.placeholder} onChangeText={this.filterSearch}/>
        </View>

        <View style={{backgroundColor: colors.white, height: 7}}/>

        <View style={styles.subHeaderContainer}>
          <Text style={styles.subHeading}>{requests.mainTitle}</Text>
        </View>

        <View style={styles.listContainer}>
          <FlatList
            data={dataSource}
            refreshing={refreshing}
            onRefresh={() => {
              this.setState({refreshing: true});
              this.props.getRequested(this.props.user.id)
            }}
            renderItem={({item}) => <MemberItem key={item.id}
                                                member={item}
                                                position={true}
                                                onPressThreeDots={this.toggleSelectUser.bind(this, item)}/>}
            keyExtractor={(item) => {
              return item.id + "," + item.various_status.is_blocked + "," + item.various_status.is_following + "," + item.various_status.is_muted + "," + item.various_status.is_fellow;
            }}
            ListEmptyComponent={<EmptyResult title={requests.title} content={requests.content}/>}
            ItemSeparatorComponent={this.renderSeparator}/>
        </View>

        <ComDialog selectedUser={selectedUser} onHideDialog={this.toggleSelectUser.bind(this, null)}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  listContainer: {
    backgroundColor: colors.white,
    flex: 1
  },
  separator: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: '#E5ECED',
  },
  subHeaderContainer: {
    backgroundColor: '#E5E5E5',
    paddingHorizontal: padding.lg,
    paddingVertical: padding.sm,
    display: 'flex',
    flexDirection: 'row'
  },
  subHeading: {
    fontSize: fonts.md,
    fontFamily: 'Roboto-Medium',
    color: colors.subHeadingColor
  },
});


const mapStateToProps = ({auth, connection}) => {
  const {user} = auth;
  const {requested} = connection;
  return {user, requested}
};

export default connect(mapStateToProps, {getRequested})(Requests);
