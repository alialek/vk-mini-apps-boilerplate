import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  ConfigProvider,
  ScreenSpinner,
  Root,
  ModalRoot,
  View,
  Tabbar,
  TabbarItem,
  Panel,
} from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";

import Main from "./views/MainView";
import {
  router,
  VIEW_MAIN,
  MODAL_ABOUT,
  POPOUT_CONFIRM,
  PAGE_MAIN,
  PAGE_INTRO,
  MODAL_HISTORY,
  POPOUT_SPINNER,
  PAGE_CART,
  VIEW_CART,
} from "./router";
import "./App.css";
import { auth } from "./api";
import { withRouter } from "@happysanta/router";
import { getUserInfo, isIntroViewed } from "./api/vk/index";
import Confirm from "./components/ConfirmationPopout";
import AboutModalCard from "./modals/AboutModalCard";
import HistoryModalPage from "./modals/HistoryModalPage";
import {
  Icon28ShoppingCartOutline,
  Icon28StorefrontOutline,
} from "@vkontakte/icons";
import { Epic } from "@vkontakte/vkui/dist/components/Epic/Epic";
import Profile from "./views/CartView";
import IntroView from "./views/IntroView";
import {
  setIsOnboardingViewed,
  setIsNotificationsEnabled,
} from "./store/data/actions";

class App extends React.Component {
  popout() {
    const { location } = this.props;
    if (location.getPopupId() === POPOUT_CONFIRM) {
      return <Confirm />;
    } else if (location.getPopupId() === POPOUT_SPINNER) {
      return <ScreenSpinner />;
    }
  }

  async componentDidMount() {
    getUserInfo();
    if ((await isIntroViewed()) === "viewed") {
      router.replacePage(PAGE_MAIN);
    } else {
      router.replacePage(PAGE_INTRO);
    }

    auth(window.location.search);
  }

  render() {
    const { location, colorScheme, router, snackbar } = this.props;
    const popout = this.popout();
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
        <Root activeView={this.props.isOnboardingViewed ? "main" : "intro"}>
          <IntroView id="intro" activePanel="intro-1" />
          <View id="main" activePanel="main-1">
            <Panel id="main-1">
              <Epic
                activeStory={location.getViewId()}
                tabbar={
                  <Tabbar>
                    <TabbarItem
                      onClick={() => router.replacePage(PAGE_CART)}
                      selected={VIEW_CART === location.getViewId()}
                      data-story={VIEW_CART}
                      text="Кофейни"
                    >
                      <Icon28StorefrontOutline />
                    </TabbarItem>

                    <TabbarItem
                      onClick={() => router.replacePage(PAGE_MAIN)}
                      selected={VIEW_MAIN === location.getViewId()}
                      data-story={VIEW_MAIN}
                      text="Корзина"
                    >
                      <Icon28ShoppingCartOutline />
                    </TabbarItem>
                  </Tabbar>
                }
              >
                <Profile
                  activePanel={location.getViewActivePanel(VIEW_CART)}
                  history={location.getViewHistory(VIEW_CART)}
                  id={VIEW_CART}
                  modal={modal}
                  popout={popout}
                />

                <Main
                  activePanel={location.getViewActivePanel(VIEW_MAIN)}
                  history={location.getViewHistory(VIEW_MAIN)}
                  id={VIEW_MAIN}
                  modal={modal}
                  popout={popout}
                />
              </Epic>
              {snackbar}
            </Panel>
          </View>
        </Root>
      </ConfigProvider>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    snackbar: state.data.snackbar,
    colorScheme: state.data.colorScheme,
    isOnboardingViewed: state.data.isOnboardingViewed,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    ...bindActionCreators(
      { setIsOnboardingViewed, setIsNotificationsEnabled },
      dispatch,
    ),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
