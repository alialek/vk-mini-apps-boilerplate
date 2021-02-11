import MainPanel from "../panels/MainPanel";

import React, { Component } from "react";
import { View } from "@vkontakte/vkui";
import {PANEL_MAIN, PANEL_QUIZ} from "./../router";
import QuizPanel from "../panels/QuizPanel";

class Main extends Component {
  render() {
    return (
      <View
        id={this.props.id}
        popout={this.props.popout}
        modal={this.props.modal}
        activePanel={this.props.activePanel}
      >
        <MainPanel id={PANEL_MAIN} />
        <QuizPanel id={PANEL_QUIZ} />
      </View>
    );
  }
}

export default Main;
