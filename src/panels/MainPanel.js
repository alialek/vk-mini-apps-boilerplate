import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  Panel,
  PanelHeader,
  PanelHeaderButton,
  Placeholder,
  PanelSpinner,
} from "@vkontakte/vkui";
import { useRouter } from "@happysanta/router";
import { MODAL_ABOUT } from "../router";
import "./home.css";
import { Icon24GearOutline } from "@vkontakte/icons";
import hi from "../img/hi.png";
const Profile = ({ id, participantInfo }) => {
  const router = useRouter();
  return (
    <Panel id={id}>
      <PanelHeader
        separator={false}
        left={
          <PanelHeaderButton
            onClick={() =>
              participantInfo !== null &&
              participantInfo !== "error" &&
              router.pushModal(MODAL_ABOUT)
            }
          >
            <Icon24GearOutline />
          </PanelHeaderButton>
        }
      >
        App Boilerplate
      </PanelHeader>
      {participantInfo !== null && participantInfo !== "error" && (
        <Placeholder
          icon={<img alt="Заглушка" className="emoji-placeholder" src={hi} />}
          header="Профиль"
        >
          Профиль
        </Placeholder>
      )}
      {participantInfo === null && <PanelSpinner />}
      {participantInfo === "error" && (
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
    participantInfo: { kek: 1 },
  };
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    ...bindActionCreators({}, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
