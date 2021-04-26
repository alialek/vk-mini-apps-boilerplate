import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  ConfigProvider,
  ScreenSpinner,
  Root,
  ModalRoot,
} from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";

import Intro from "./views/IntroView";
import Main from "./views/MainView";
import {
  VIEW_INTRO,
  VIEW_MAIN,
  MODAL_ABOUT,
  POPOUT_CONFIRM,
  PAGE_MAIN,
  PAGE_INTRO,
  MODAL_HISTORY,
  POPOUT_SPINNER,
} from "./router";
import "./App.css";
import { auth } from "./api";
import { useLocation, useRouter } from "@happysanta/router";
import { getUserInfo, isIntroViewed, STORAGE_KEYS } from "./api/vk/index";
import Confirm from "./components/ConfirmationPopout";
import AboutModalCard from "./modals/AboutModalCard";
import HistoryModalPage from "./modals/HistoryModalPage";
import { setIsNotificationsEnabled } from "./store/data/actions";

const App = ({ setIsNotificationsEnabled, colorScheme }) => {
  const location = useLocation();
  const router = useRouter();
  const popout = () => {
    if (location.getPopupId() === POPOUT_CONFIRM) {
      return <Confirm />;
    } else if (location.getPopupId() === POPOUT_SPINNER) {
      return <ScreenSpinner />;
    }
  };

  useEffect(() => {
    const fetchUserInfo = async () => await getUserInfo();
    fetchUserInfo();
  }, []);

  useEffect(() => {
    const checkIntroStatus = async () => {
      if ((await isIntroViewed()) === STORAGE_KEYS.VIEWED) {
        router.replacePage(PAGE_MAIN);
      } else {
        router.replacePage(PAGE_INTRO);
      }
    };
    checkIntroStatus();
  }, [router]);
  useEffect(() => {
    auth(window.location.search);
    setIsNotificationsEnabled(
      !!+window.location.search
        .split("vk_are_notifications_enabled=")[1]
        .slice(0, 1),
    );
  }, [setIsNotificationsEnabled]);

  const modal = (
    <ModalRoot
      onClose={() => router.popPage()}
      activeModal={location.getModalId()}
    >
      <AboutModalCard id={MODAL_ABOUT} />
      <HistoryModalPage onClose={() => router.popPage()} id={MODAL_HISTORY} />
    </ModalRoot>
  );
  return (
    <ConfigProvider isWebView={true} scheme={colorScheme}>
      <Root activeView={location.getViewId()}>
        <Intro
          popout={popout}
          activePanel={location.getViewActivePanel(VIEW_INTRO)}
          id={VIEW_INTRO}
        />
        <Main
          activePanel={location.getViewActivePanel(VIEW_MAIN)}
          history={location.getViewHistory(VIEW_MAIN)}
          id={VIEW_MAIN}
          modal={modal}
          popout={popout}
        />
      </Root>
    </ConfigProvider>
  );
};
const mapStateToProps = (state) => {
  return {
    colorScheme: state.data.colorScheme,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    ...bindActionCreators({ setIsNotificationsEnabled }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
