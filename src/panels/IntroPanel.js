import { Panel, Div, Button, Gallery, Title, Text } from "@vkontakte/vkui";
import React, { useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import hi from "../img/hi.png";
import "./intro.css";
import { setIntroViewed } from "../api";
import { setIsOnboardingViewed } from "./../store/data/actions";

const Intro = ({ setIsOnboardingViewed, id }) => {
  const [slideIndex, setSlideIndex] = useState(0);
  const [slides] = useState([
    {
      title: "Привет!",
      description:
        "Random Coffee VK — сообщество людей, которые ценят нетворкинг и полезные связи.",
      icon: hi,
      button: "Далее",
      isValid: () => true,
    },
    {
      title: "Как это работает?",
      description:
        "Каждый понедельник мы соединяем тебя со случайным участником сообщества. Перед встречей или созвоном ознакомься с анкетой собеседника — это поможет найти общие темы.",
      icon: hi,
      button: "Далее",
      isValid: () => true,
    },
    {
      title: "Как вступить в сообщество?",
      description:
        "Все, что нужно сделать — подписаться на нашу группу Random Coffee VK и оформить подписку VK Donut.",
      icon: hi,
      button: "Далее",
      isValid: () => true,
    },
    {
      title: "Почему это платно?",
      description: "Плата за участие — 100₽ в месяц. Что ты получаешь:",
      bullets: [
        "4 встречи с интересными людьми",
        "Заинтересованное коммьюнити",
        "Советы по продуктивному нетворкингу",
      ],
      icon: hi,
      button: "Далее",
      isValid: () => true,
    },
    {
      title: "Давай познакомимся поближе",
      description:
        "Сюда можно вставить форму, которая будет валидироваться по заданным правилам",
      button: "Сохранить",
      isValid: () => true,
      fallBack: () => console.log("Ошибка"),
    },
    {
      title: "Добро пожаловать!",
      description:
        "Теперь осталось дождаться понедельника. Будем рады пообщаться!",
      icon: hi,
      button: "Продолжить",
    },
  ]);

  const changeIndex = (slideIndex) => {
    setSlideIndex(slideIndex);
  };

  const registerUser = () => {
    setIsOnboardingViewed(true);
    setIntroViewed();
  };

  return (
    <Panel id={id} separator={false} centered={true} className="intro-panel">
      <Gallery
        onChange={changeIndex}
        slideIndex={slideIndex}
        slideWidth="100%"
        align="right"
        style={{ width: "100%", height: "100vh" }}
      >
        {slides.map((slide, i) => (
          <div key={i} className="slide">
            <Div>
              <Title level="1" className="slide__title" weight="semibold">
                {slide.title}
              </Title>
            </Div>
            {slide?.icon && (
              <Div className="d-col align-center">
                <div className="blob-holder">
                  {" "}
                  <div className="blob"></div>{" "}
                  <img alt="Иконка" className="slide__image" src={slide.icon} />
                </div>

                <Text className="slide__text">{slide.description} </Text>
                {slide?.bullets && (
                  <ul>
                    {slide.bullets.map((bullet, n) => (
                      <li key={n}>
                        {" "}
                        <Text>{bullet}</Text>
                      </li>
                    ))}
                  </ul>
                )}
              </Div>
            )}

            <Div className="slide__button-holder">
              <Button
                onClick={() => {
                  if (slide.button === "Сохранить" || slide.button === "Далее")
                    slide.isValid()
                      ? changeIndex(slideIndex + 1)
                      : slide.fallBack();

                  if (slide.button === "Продолжить") registerUser();
                }}
                mode="primary"
                size="xl"
              >
                {slide.button}
              </Button>
            </Div>
          </div>
        ))}
      </Gallery>
    </Panel>
  );
};

const mapStateToProps = (state) => {
  return {};
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    ...bindActionCreators({ setIsOnboardingViewed }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Intro);
