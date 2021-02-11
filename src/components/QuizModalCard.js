import React, {Component} from "react";
import {withRouter} from "@happysanta/router";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {setActiveAnswer} from "../store/data/actions"
import {Button, Div, Gallery, Group, ModalPage, ModalPageHeader, Text} from "@vkontakte/vkui";
import {state} from "../store/state";

class AboutCard extends Component {

  constructor(props) {
    super(props)
    this.state = state
    this.quiz = this.state.quiz[this.props.index]
  }

  handlerClickNext = (i) => {
    if (this.quiz.questions.length-1 > i) {
      this.props.setActiveAnswer(null)
      this.setState({slideIndex: this.state.slideIndex + 1})
    } else {
      this.props.router.popPage()
    }
  }

  render() {
    return (
      <>
        {console.log(this.quiz.header)}
        {console.log("this.props.index")}
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
                        <Button
                          key={i}
                          size="s"
                          mode={(this.props.answer === i) ? "commerce" : "outline"}
                          stretched
                          style={{marginBottom: "10px"}}
                          onClick={() => (this.props.setActiveAnswer(i))}
                        >
                          {answer}
                        </Button>
                      </>
                    ))}
                  </Group>
                  <Button
                    size="s"
                    stretched
                    onClick={() => this.handlerClickNext(i)}
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
