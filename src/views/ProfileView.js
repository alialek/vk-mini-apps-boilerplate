import ProfilePanel from "../panels/ProfilePanel";

import React, { Component } from "react";
import { View } from "@vkontakte/vkui";
import { PANEL_PROFILE } from "../router";

class Profile extends Component {
  render() {
    return (
      <View
        id={this.props.id}
        popout={this.props.popout}
        modal={this.props.modal}
        activePanel={this.props.activePanel}
      >
        <ProfilePanel popout={this.props.popout} id={PANEL_PROFILE} />
      </View>
    );
  }
}

export default Profile;
