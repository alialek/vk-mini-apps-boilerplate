import React, { Component } from "react";
import { withRouter } from "@happysanta/router";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ModalCard,} from "@vkontakte/vkui";

class AboutCard extends Component {
  render() {
    return (
      <ModalCard
        id={this.props.id}
        onClose={() => this.props.router.popPage()}
        header="О приложении"
        subheader="Cum amor assimilant, omnes exemplares vitare barbatus,
        salvus homoes.Nomen de azureus agripeta, examinare lixa!
        A falsis, rumor gratis cacula.Xiphias magnum calcaria est.
        Est peritus clabulare, cesaris.Monss cadunt!Planetas persuadere, tanquam velox zirbus."
      >
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
)(withRouter(AboutCard));
