import React from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {
  Panel,
  PanelHeader,
  PanelHeaderButton,
  Title,
  Text,
  Button,
  Link,
  Group,
  Div,
  Header,
  Card,
  CardGrid,
  ContentCard,
  Caption,
} from "@vkontakte/vkui";
import {
  setActiveQuiz, setNotifications
} from '../store/data/actions';
import {withRouter} from "@happysanta/router";
import {MODAL_INFO, MODAL_PAY, PAGE_QUIZ} from "../router";
import "./home.css";
import {
  Icon20UsersOutline,
  Icon24Info,
} from "@vkontakte/icons";
import {state} from "../store/state";

class Home extends React.Component {

  constructor(props) {
    super(props)
    this.state = state
  }

  removeItem = id => {
    this.setState({quiz: this.state.quiz, ...this.state.quiz[id].show = !this.state.quiz[id].show})
    setTimeout(() => (this.setState({quiz: this.state.quiz.filter(el => el.id !== id)})), 1000)
  }

  render() {
    const {id, profile, router, participantInfo, notifications} = this.props;

    return (
      <Panel id={id}>
        <PanelHeader
          style={{textAlign: "center"}}
          separator={false}
          left={
            <PanelHeaderButton
              onClick={() =>
                participantInfo !== null &&
                participantInfo !== "error" &&
                router.pushModal(MODAL_INFO)
              }
            >
              <Icon24Info/>
            </PanelHeaderButton>
          }
        >
          РосОпрос
        </PanelHeader>
        {participantInfo !== null && participantInfo !== "error" && (
          <div>
            <div className="d-row">
              <img
                className="profile__photo"
                src={profile.photo_200}
              />
              <div>
                <Title
                  className="profile__name"
                  level="1"
                  weight="heavy"
                >
                  {profile.first_name} {profile.last_name}
                </Title>
                <Text className="profile__link" weight="regular">
                  <Link
                    onClick={() => (router.pushModal(MODAL_PAY))}
                  >Баллов 12. Вывести?</Link>
                </Text>
              </div>
            </div>
            <Div className="group-quiz">
              <Group mode="plain" header={<Header mode="secondary">Доступные опросы</Header>}>
                <CardGrid size="l">
                  {
                    this.state.quiz.map((quiz, id) => (
                      <div key={id} style={{width: "100%", margin: "8px 0"}}>
                        {(quiz.type === "reusable") ? (
                          <ContentCard
                            image={quiz.image}
                            header={quiz.header}
                            text={quiz.text}
                            maxHeight={100}
                            onClick={() => {
                              this.props.setActiveQuiz(quiz.id)
                              router.pushPage(PAGE_QUIZ, { id: quiz.id})
                            }}
                          />
                        ) : (
                          <Card
                            className={`single-question ${this.state.quiz[id].show ? "show" : "hide"}`}
                          >
                            <Title level={"3"} weight="bold" style={{padding: "10px 20px"}}>
                                {quiz.text}
                            </Title>
                              <Button
                                size="s"
                                stretched
                                style={{margin: '0px auto 16px auto', minHeight: "36px"}}
                                onClick={() => (this.removeItem(id))}
                              >
                                {quiz.firstAnswer}
                              </Button>
                              <Button
                                size="s"
                                stretched
                                style={{margin: '0px auto 16px auto', minHeight: "36px"}}
                                onClick={() => (this.removeItem(id))}
                              >
                                {quiz.secondAnswer}
                              </Button>
                              <Button
                                size="s"
                                stretched
                                style={{margin: '0px auto 16px auto', minHeight: "36px"}}
                                onClick={() => (this.removeItem(id))}
                              >
                                {quiz.thirdAnswer}
                              </Button>
                          </Card>
                        )}
                      </div>
                    ))
                  }
                  <Card className={`history ${notifications ? 'active' : 'disabled'}`}>
                    <Div>
                      <div className="d-flex align-center">
                        {' '}
                        <Icon20UsersOutline fill="#fff" width={16} height={16}/>{' '}
                        <Caption
                          level="2"
                          weight="regular"
                          style={{color: 'white', marginLeft: 8}}
                        >
                          УВЕДОМЛЕНИЯ
                        </Caption>
                      </div>

                      <Text className="history__count history-action" weight="medium">
                        {this.props.notifications
                          ? 'Уведомления выключены'
                          : 'Уведомления включены'}
                      </Text>
                      <Button
                        size="s"
                        stretched
                        className="action-button"
                        onClick={() => {
                          this.props.setNotifications(!this.props.notifications)
                        }}
                      >
                        {this.props.notifications ? 'Отключить' : 'Включить'}
                      </Button>
                    </Div>
                  </Card>
                </CardGrid>
              </Group>
            </Div>
          </div>
        )}
      </Panel>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    profile: state.data.profile,
    notifications: state.data.notifications,
    index: state.data.activeQuiz,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    ...bindActionCreators({
      setActiveQuiz,
      setNotifications,
    }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Home));
