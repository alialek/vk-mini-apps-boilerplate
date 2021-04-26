import MainPanel from "../panels/MainPanel";

import React from "react";
import { View } from "@vkontakte/vkui";
import { PANEL_MAIN } from "./../router";
import { PANEL_COFFEESHOP } from "./../router";
import CoffeeShopPanel from "../panels/CoffeeShopPanel";

const Main = ({ id, popout, modal, activePanel }) => {
  return (
    <View id={id} popout={popout} modal={modal} activePanel={activePanel}>
      <MainPanel id={PANEL_MAIN} />
      <CoffeeShopPanel id={PANEL_COFFEESHOP} />
    </View>
  );
};

export default Main;
