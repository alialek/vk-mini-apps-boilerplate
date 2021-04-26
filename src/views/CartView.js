import CartPanel from "../panels/CartPanel";

import React from "react";
import { View } from "@vkontakte/vkui";
import { PANEL_CART } from "../router";

const Cart = ({ id, popout, modal, activePanel }) => {
  return (
    <View id={id} popout={popout} modal={modal} activePanel={activePanel}>
      <CartPanel popout={popout} id={PANEL_CART} />
    </View>
  );
};

export default Cart;
