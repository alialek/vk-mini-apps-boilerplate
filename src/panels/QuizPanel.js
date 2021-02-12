import React from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {
  Panel,
  PanelHeader,
  PanelHeaderButton,
  Title,
  Button,
  Group,
  Div,
  CardGrid,
} from "@vkontakte/vkui";
import {withRouter} from "@happysanta/router";
import {MODAL_INFO, MODAL_QUIZ} from "../router";
import "./quiz.css";
import {
  Icon24BrowserBack,
  Icon24Info,
  Icon56InfoOutline,
  Icon56RecentOutline
} from "@vkontakte/icons";
import {state} from "../store/state";

class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = state
    this.quiz = this.state.quiz[window.location.hash.split("/")[2]]
  }

  render() {
    const {id, router, } = this.props;
    return (
      <Panel id={id}>
        <PanelHeader
          style={{textAlign: "center"}}
          separator={false}
          left={
            <>
              <PanelHeaderButton onClick={() => router.popPage()}>
                <Icon24BrowserBack/>
              </PanelHeaderButton>
              <PanelHeaderButton
                onClick={() => router.pushModal(MODAL_INFO)}
              >
                <Icon24Info/>
              </PanelHeaderButton>
            </>
          }
        >
          РосОпрос
        </PanelHeader>
        <Group mode="plain">
          <CardGrid size="l" className={"quiz-image"}
                    style={{backgroundImage: `url(${this.quiz.image})`}}>
          </CardGrid>
          <Div>
            <Title level="2" weight={"bold"}>
              {this.quiz.header}
            </Title>
          </Div>
          <Div style={{display: "flex", justifyContent: "space-around"}}>
            <div style={{display: "flex", alignItems: "center"}}>
              <Icon56InfoOutline/>
              {this.quiz.questions.length} вопросов
            </div>
            <div style={{display: "flex", alignItems: "center"}}>
              <Icon56RecentOutline/>
              {this.quiz.questions.length*3/6} мин.
            </div>
          </Div>
          <Div>
            Buxum bi-color palus est.Ubi est ferox burgus?Albus, mirabilis amors tandem visum de bi-color,
            clemens ratione.Flavum byssus satis dignuss bulla est.
          </Div>
        </Group>
        <Div align={"center"}>
          <Button
            stretched
            size="l"
            mode={"commerce"}
            onClick={() => {
              router.pushModal(MODAL_QUIZ)
            }}>
            Начать опрос
          </Button>
        </Div>
      </Panel>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    activeQuiz: state.data.activeQuiz,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    ...bindActionCreators({}, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Home));
