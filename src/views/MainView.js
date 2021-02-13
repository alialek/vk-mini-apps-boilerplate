import MainPanel from "../panels/MainPanel";
import { withRouter } from '@happysanta/router';
import React, { Component } from "react";
import { View } from "@vkontakte/vkui";
import {PANEL_MAIN, PANEL_QUIZ} from "./../router";
import QuizPanel from "../panels/QuizPanel";

class Main extends Component {
  render() {
    const { location, router } = this.props;
    return (
      <View
        id={this.props.id}
        popout={this.props.popout}
        modal={this.props.modal}
        activePanel={this.props.activePanel}
        onSwipeBack={() => router.popPage()}
				history={location.hasOverlay() ? [] : location.getViewHistory(VIEW_MAIN)}
      >
        <MainPanel id={PANEL_MAIN} />
        <QuizPanel id={PANEL_QUIZ} />
      </View>
    );
  }
}

export default WithRouter(Main);
