import { View } from "@vkontakte/vkui";
import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import IntroPanel from "../panels/IntroPanel";
const Intro = ({ id, popout, activePanel }) => {
  return (
    <View id={id} popout={popout} activePanel={activePanel}>
      <IntroPanel id={activePanel} />
    </View>
  );
};

const mapStateToProps = (state) => {
  return {};
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    ...bindActionCreators({}, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Intro);
