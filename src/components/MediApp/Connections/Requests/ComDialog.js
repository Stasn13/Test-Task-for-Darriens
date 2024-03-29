import React, {Component} from 'react';
import {ScrollView, StyleSheet, Text, TouchableOpacity} from "react-native";
import {Actions} from 'react-native-router-flux'
import {Dialog} from "react-native-simple-dialogs";
import {connect} from "react-redux";

import {fonts} from "../../../../styles/base";
import {
  requestedBlockToggle,
  requestedFollowToggle,
  requestedMuteToggle,
  requestedUpdateConnectionStatus
} from "../../../../actions/ConnectionAction";

class ComDialog extends Component {
  state = {dialogVisible: false};
  /**
   * Hide Dialog
   */
  hideDialog = () => {
    this.setState({
      dialogVisible: false
    }, () => this.props.onHideDialog(null));
  };
  /**
   * View User Profile
   */
  onViewProfile = () => {
    const {id} = this.props.selectedUser;
    Actions.userProfile({user_id: id});
    this.hideDialog();
  };
  /**
   * Toggle Fellow
   */
  onUpdateConnectionStatus = (status) => {
    const {selectedUser} = this.props;
    this.props.requestedUpdateConnectionStatus(selectedUser.id, status);
    this.hideDialog();
  };
  /**
   * Toggle Follow
   */
  onToggleFollow = () => {
    const {selectedUser} = this.props;
    this.props.requestedFollowToggle(selectedUser.id);
    this.hideDialog();
  };
  /**
   * Toggle Mute User
   */
  onToggleMute = () => {
    const {selectedUser} = this.props;
    this.props.requestedMuteToggle(selectedUser.id);
    this.hideDialog();
  };
  /**
   * Toggle block User
   */
  onToggleBlock = () => {
    const {selectedUser} = this.props;
    this.props.requestedBlockToggle(selectedUser.id);
    this.hideDialog();
  };

  getFollowTitle = (selectedUser) => {
    if (selectedUser.various_status.is_following === 1) {
      return "Unfollow"
    } else {
      return "Follow"
    }
  };
  getMuteTitle = (selectedUser) => {
    if (selectedUser.various_status.is_muted === 1) {
      return "Unmute"
    } else {
      return "Mute"
    }
  };
  getBlockTitle = (selectedUser) => {
    if (selectedUser.various_status.is_blocked === 1) {
      return "Unblock"
    } else {
      return "Block"
    }
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedUser) {
      this.setState({dialogVisible: true})
    }
  }

  render() {
    const {dialogVisible} = this.state;
    const {selectedUser} = this.props;
    if (!selectedUser) {
      return null;
    }
    return (
      <Dialog
        visible={dialogVisible}
        onTouchOutside={this.hideDialog}
        dialogStyle={styles.dialogStyle}>
        <ScrollView>
          <TouchableOpacity key="1" style={[styles.optionStyle, {paddingTop: 0}]} onPress={() => this.onViewProfile()}>
            <Text style={styles.optionLabel}>View Profile</Text>
          </TouchableOpacity>

            <TouchableOpacity key="2" style={[styles.optionStyle]}
                              onPress={() => this.onUpdateConnectionStatus('request_accepted')}>
              <Text style={styles.optionLabel}>Accept Fellow Request</Text>
            </TouchableOpacity>

            <TouchableOpacity key="3" style={[styles.optionStyle]}
                              onPress={() => this.onUpdateConnectionStatus('request_denied')}>
              <Text style={styles.optionLabel}>Decline Fellow Request</Text>
            </TouchableOpacity>

          <TouchableOpacity key="4" style={[styles.optionStyle]} onPress={() => this.onToggleFollow()}>
            <Text style={styles.optionLabel}>{this.getFollowTitle(selectedUser)}</Text>
          </TouchableOpacity>

          <TouchableOpacity key="5" style={[styles.optionStyle]} onPress={() => this.onToggleMute()}>
            <Text style={styles.optionLabel}>{this.getMuteTitle(selectedUser)}</Text>
          </TouchableOpacity>

          <TouchableOpacity key="6" style={[styles.optionStyle, {borderBottomWidth: 0}]}
                            onPress={() => this.onToggleBlock()}>
            <Text style={styles.optionLabel}>{this.getBlockTitle(selectedUser)}</Text>
          </TouchableOpacity>
        </ScrollView>
      </Dialog>
    )
  }
}

const styles = StyleSheet.create({
  dialogStyle: {
    borderRadius: 15
  },
  optionStyle: {
    flex: 1,
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#d3d3db'
  },
  optionLabel: {
    color: '#007AFE',
    fontSize: fonts.xl,
    textAlign: 'center'
  }
});

const mapStateToProps = ({profile, commonData}) => {
  const {user} = profile;
  const {loading, error} = commonData;
  return {user, loading, error}
};

export default connect(mapStateToProps, {
  requestedFollowToggle,
  requestedMuteToggle,
  requestedBlockToggle,
  requestedUpdateConnectionStatus
})(ComDialog);
