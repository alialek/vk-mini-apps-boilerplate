import { View } from "@vkontakte/vkui";
import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "@happysanta/router";
import IntroPanel from "../panels/IntroPanel";
class Intro extends React.Component {
  render() {
    return (
      <View
        id={this.props.id}
        popout={this.props.popout}
        activePanel={this.props.activePanel}
      >
        <IntroPanel id={this.props.activePanel} />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    ...bindActionCreators({}, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Intro));
