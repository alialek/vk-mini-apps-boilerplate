import React, {Component} from "react";
import {withRouter} from "@happysanta/router";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {setSnackbar, setActiveAnswer} from "../store/data/actions"
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
import {Snackbar} from "@vkontakte/vkui/dist/index"
import {state} from "../store/state";
import axios from "axios";
import {POPOUT_CONFIRM, POPOUT_SPINNER,} from "../router";
import {Icon24Document} from "../../node_modules/@vkontakte/icons"
import {Icon16ErrorCircleFill} from "@vkontakte/icons";


class AboutCard extends Component {

  constructor(props) {
    super(props)
    this.state = state
    this.quiz = this.state.quiz[this.props.index]
    this.answer = null
    this.answerMulti = {
      first: false,
      second: false,
      third: false,
    }
  }

  snackBar = (text) => {
    console.log("switch")
    return (
      <Snackbar
        onClose={() => (this.props.setSnackbar(null))}
        duration={2500}
        before={<Icon16ErrorCircleFill width={24} height={24}/>}
        onClick={() => (this.props.setSnackbar(null))}
      >
        {text}
      </Snackbar>
    )
  }

  handlerClickNext = (i, type) => {
    if (this.quiz.questions.length - 1 > i && this.answer === true) {
      if (type === "multi" && this.answerMulti.first || this.answerMulti.second || this.answerMulti.third) {
        this.setState({slideIndex: this.state.slideIndex + 1})
      } else if (type !== "multi") {
        this.setState({slideIndex: this.state.slideIndex + 1})
      } else return console.log("!!!!!!!!!!!!")
    } else if (this.quiz.questions.length - 1 === i && this.answer === true) {
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
      switch (type) {
        case ("single"): {
          return this.props.setSnackbar(this.snackBar("Выберите один из вариантов ответа!"))
        }
        case ("multi"): {
          return this.props.setSnackbar(this.snackBar("Выберите один, либо несколько вариатов ответа!"))
        }
        case ("input"): {
          return this.props.setSnackbar(this.snackBar("Введите текст!"))
        }
        case ("file"): {
          return this.props.setSnackbar(this.snackBar("Выберите файл!"))
        }
        default: {
          return console.log("Неверно указан тип ответов!")
        }
      }
    }
    this.props.setActiveAnswer(null)
    this.answer = null
  }

  handlerChangeInput = (e) => {
    if (Boolean(e.trim()) === true) {
      this.answer = true
    } else {
      this.answer = null
    }
  }


  handlerChangeSingle = (i) => {
    this.props.setActiveAnswer(i)
    this.answer = true
  }

  handlerChangeMulti = (checked, id) => {
    this.answer = true
    if (checked) {
      if (id === 0) {
        this.answerMulti.first = true
      } else if (id === 1) {
        this.answerMulti.second = true
      } else if (id === 2) {
        this.answerMulti.third = true
      }
    } else {
      if (id === 0) {
        this.answerMulti.first = false
      } else if (id === 1) {
        this.answerMulti.second = false
      } else if (id === 2) {
        this.answerMulti.third = false
      }
    }
  }

  handlerChangeFile = (e) => {
    if (e) {
      this.answer = true
    }
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
                  {this.props.snackbar}
                  <Group style={{padding: "20px 40px"}}>
                    {item.answer.map((answer, i) => (
                      <>
                        {(item.type === "single") ? (
                          <Button
                            key={i}
                            size="s"
                            mode={(this.props.activeAnswer === i) ? "commerce" : "outline"}
                            stretched={true}
                            style={{marginBottom: "10px", minHeight: "36px"}}
                            onClick={() => (this.handlerChangeSingle(i))}
                          >
                            {answer}
                          </Button>
                        ) : (item.type === "multi") ? (
                          <Checkbox
                            key={i}
                            stretched={true}
                            style={{
                              marginBottom: "10px",
                              minHeight: "36px",
                              border: "1px solid #4986cc",
                              borderRadius: "10px"
                            }}
                            onChange={(e) => (this.handlerChangeMulti(e.target.checked, i))}
                          >
                            {answer}
                          </Checkbox>
                        ) : (item.type === "input") ? (
                          <Input
                            key={i}
                            size="s"
                            stretched={true}
                            style={{marginBottom: "10px", minHeight: "36px"}}
                            onChange={(e) => (this.handlerChangeInput(e.target.value))}
                            placeholder={answer}
                          />
                        ) : (item.type === "file") ? (
                          <File
                            key={i}
                            before={<Icon24Document/>}
                            stretched={true}
                            size="s"
                            mode={(this.props.activeAnswer === i) ? "commerce" : "outline"}
                            style={{marginBottom: "10px", minHeight: "36px"}}
                            onChange={(e) => (this.handlerChangeFile(e.target.files[0]))}
                          >
                            {answer}
                          </File>
                        ) : null}
                      </>
                    ))}
                  </Group>
                  <Button
                    size="s"
                    stretched={true}
                    onClick={() => this.handlerClickNext(i, item.type)}
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
    activeAnswer: state.data.activeAnswer,
    snackbar: state.data.snackbar,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    ...bindActionCreators({setActiveAnswer, setSnackbar}, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(AboutCard));
