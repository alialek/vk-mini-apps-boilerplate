import React, {Component} from "react";
import {withRouter} from "@happysanta/router";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {setActiveAnswer} from "../store/data/actions"
import {
  Button,
  Div,
  Gallery,
  Group,
  ModalPage,
  ModalPageHeader,
  Text,
  Input,
  Checkbox,
  File,
} from "@vkontakte/vkui";
import {state} from "../store/state";
import axios from "axios";
import {POPOUT_CONFIRM, POPOUT_SPINNER,} from "../router";
import {Icon24Document} from "../../node_modules/@vkontakte/icons"


class AboutCard extends Component {

  constructor(props) {
    super(props)
    this.state = state
    this.quiz = this.state.quiz[this.props.index]
  }

  handlerClickNext = (i) => {

    if (this.quiz.questions.length - 1 > i && this.props.answer !== null) {
      this.setState({slideIndex: this.state.slideIndex + 1})
    } else if (this.quiz.questions.length - 1 === i && this.props.answer !== null) {
      axios.post() // Указать url отправки ответа
        .then(() => {
          this.props.router.replacePopup(POPOUT_SPINNER)
        })
        .catch((err) => {
          console.log(err, "Error!")
        })
        .finally(() => {
          this.props.router.replacePopup(POPOUT_CONFIRM)
        })
    } else {
      return null
    }
    this.props.setActiveAnswer(null)
  }

  render() {
    return (
      <>
        <ModalPage
          id={this.props.id}
          header={<ModalPageHeader>{this.quiz.header}</ModalPageHeader>}
          onClose={() => this.props.router.popPage()}
        >
          <Div>
            <Gallery
              slideIndex={this.state.slideIndex}
              slideWidth="100%"
              align="right"
              style={{width: '100%', height: '100%'}}
            >
              {this.quiz.questions.map((item, i) => (
                <div key={i}>
                  <Text align={"center"}>{item.title}</Text>
                  <Group style={{padding: "20px 40px"}}>
                    {item.answer.map((answer, i) => (
                      <>
                        {(item.type === "single") ? (
                          <Button
                            key={i}
                            size="s"
                            mode={(this.props.answer === i) ? "commerce" : "outline"}
                            stretched
                            style={{marginBottom: "10px", minHeight: "36px"}}
                            onClick={() => (this.props.setActiveAnswer(i))}
                          >
                            {answer}
                          </Button>
                        ) : (item.type === "multi") ? (
                          <Checkbox
                            key={i}
                            stretched
                            style={{
                              marginBottom: "10px",
                              minHeight: "36px",
                              border: "1px solid #4986cc",
                              borderRadius: "10px"
                            }}
                            onClick={() => (this.props.setActiveAnswer(i))}
                          >
                            {answer}
                          </Checkbox>
                        ) : (item.type === "input") ? (
                          <Input
                            key={i}
                            size="s"
                            stretched
                            style={{marginBottom: "10px", minHeight: "36px"}}
                            onChange={() => (this.props.setActiveAnswer(i))}
                            placeholder={answer}
                          />
                        ) : (item.type === "file") ? (
                          <File
                            key={i}
                            before={<Icon24Document/>}
                            size="s"
                            mode={(this.props.answer === i) ? "commerce" : "outline"}
                            stretched
                            style={{marginBottom: "10px", minHeight: "36px"}}
                            onClick={() => (this.props.setActiveAnswer(i))}
                          >
                            {answer}
                          </File>
                        ) : null}
                      </>
                    ))}
                  </Group>
                  <Button
                    size="s"
                    stretched
                    onClick={() => this.handlerClickNext(i)}
                    style={{minHeight: "36px"}}
                  >
                    {(this.quiz.questions.length - 1 > i) ? "Продолжить" : "Завершить"}
                  </Button>
                </div>

              ))}
            </Gallery>
          </Div>
        </ModalPage>
        ))}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    index: state.data.activeQuiz,
    answer: state.data.activeAnswer,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    ...bindActionCreators({setActiveAnswer}, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(AboutCard));
