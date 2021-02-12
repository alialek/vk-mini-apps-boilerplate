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
  CardGrid, ScreenSpinner,
} from "@vkontakte/vkui";
import {withRouter} from "@happysanta/router";
import {MODAL_QUIZ, PAGE_MAIN, POPOUT_SPINNER} from "../router";
import "./quiz.css";
import {
  Icon24BrowserBack,
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
    const {id, router,} = this.props;
    const popout = (() => {
      if (router.getPopupId() === POPOUT_SPINNER) {
        return <ScreenSpinner/>
      }
    })

    return (
      <Panel id={id}>
        <PanelHeader
          style={{textAlign: "center"}}
          separator={false}
          popout={popout}
          left={
            <>
              <PanelHeaderButton onClick={() => router.pushPage(PAGE_MAIN)}>
                <Icon24BrowserBack/>
              </PanelHeaderButton>
            </>
          }
        >
          РосОпрос
        </PanelHeader>
        <div>
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
              <Icon56InfoOutline width={24} height={24}/>
              {this.quiz.questions.length} вопросов
            </div>
            <div style={{display: "flex", alignItems: "center"}}>
              <Icon56RecentOutline width={24} height={24}/>
              {this.quiz.questions.length * 3 / 6} мин.
            </div>
          </Div>
          <Div>
            Buxum bi-color palus est.Ubi est ferox burgus?Albus, mirabilis amors tandem visum de bi-color,
            clemens ratione.Flavum byssus satis dignuss bulla est.
          </Div>
        </div>
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
