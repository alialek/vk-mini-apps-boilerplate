import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  Panel,
  PanelHeader,
  PanelHeaderButton,
  Placeholder,
  PanelSpinner,
  Gallery,
  Title,
} from "@vkontakte/vkui";
import { useLocation, useRouter } from "@happysanta/router";
import { MODAL_ABOUT } from "../router";
import "./home.css";
import { Icon24GearOutline, Icon28ChevronLeftOutline } from "@vkontakte/icons";
import hi from "../img/hi.png";
const Home = ({ id, coffeeShop }) => {
  const location = useLocation();
  const router = useRouter();

  useEffect(() => {}, [location]);
  return (
    <Panel id={id}>
      <PanelHeader
        separator={false}
        visor={false}
        transparent
        left={
          <PanelHeaderButton
            onClick={() =>
              coffeeShop !== null && coffeeShop !== "error" && router.popPage()
            }
          >
            <Icon28ChevronLeftOutline />
          </PanelHeaderButton>
        }
      ></PanelHeader>
      {coffeeShop !== null && coffeeShop !== "error" && (
        <div style={{ position: "relative" }}>
          <Gallery slideWidth="100%" bullets="light" style={{ height: "20vh" }}>
            <div
              style={{
                backgroundImage: `linear-gradient(180deg, rgba(114,177,250,0) 0%, rgba(54,83,118,0) 64%, rgba(0,0,0,0.8) 100%), url(${coffeeShop.photo})`,
                backgroundSize: "cover",
                backgroundPosition: "center center",
              }}
            ></div>
          </Gallery>
          <div
            style={{
              position: "absolute",
              bottom: "12px",
              left: "12px",
              color: "white",
            }}
          >
            <Title level="1" weight="heavy">
              {coffeeShop.title}
            </Title>
          </div>
        </div>
      )}
      {coffeeShop === null && <PanelSpinner />}
      {coffeeShop === "error" && (
        <Placeholder
          icon={<img alt="Заглушка" className="emoji-placeholder" src={hi} />}
          header="Ошибка"
        >
          Упс, попробуйте обновить
        </Placeholder>
      )}
    </Panel>
  );
};

const mapStateToProps = (state) => {
  return {
    coffeeShop: state.data.coffeeShop,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    ...bindActionCreators({}, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
