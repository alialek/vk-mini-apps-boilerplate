import React, { Component } from "react";
import { withRouter } from "@happysanta/router";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {Button, Div, ModalCard, Text,} from "@vkontakte/vkui";

class PayModalCard extends Component {
  render() {
    return (
      <ModalCard
        id={this.props.id}
        onClose={() => this.props.router.popPage()}
        header="Вывод средств"
      >
        <Div align={"center"}>
          <Text style={{marginBottom: "20px"}}>
            К выводу доступно 12 баллов
          </Text>
          <Button
            onClick={() => (this.props.router.popPage())}
          >
            Вывод
          </Button>
        </Div>
      </ModalCard>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(PayModalCard));
