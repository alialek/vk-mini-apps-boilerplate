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
  File, Snackbar,
} from "@vkontakte/vkui";
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
  }

  snackBar = (text) => (
    <Snackbar
      onClose={() => this.props.setSnackbar( null )}
      before={<Icon16ErrorCircleFill width={24} height={24} />}
      duration={2500}
    >
      {text}
    </Snackbar>
  )

  handlerClickNext = (i, type) => {

    if (this.quiz.questions.length - 1 > i && this.answer === true) {
      this.setState({slideIndex: this.state.slideIndex + 1})
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

  handlerChangeMulti = (i) => {
    if (i) {
      this.answer = true
    } else return null
  }

  handlerChangeFile = (e) => {
    if (e) {this.answer = true}
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
                            onClick={() => (this.handlerChangeMulti(i))}
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
            {this.props.snackbar}
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
    ...bindActionCreators({setActiveAnswer,setSnackbar}, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(AboutCard));
