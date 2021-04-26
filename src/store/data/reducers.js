import {
  SET_COLOR_SCHEME,
  SET_SNACKBAR,
  SET_IS_NOTIFICATIONS_ENABLED,
  SET_IS_ONBOARDING_VIEWED,
} from "./actionTypes";

const initialState = {
  colorScheme: "client_light",
  isOnboardingViewed: true,
  isNotificationsEnabled: false,
  coffeeShops: [
    {
      photo: "https://burobiz-a.akamaihd.net/uploads/images/55072/large_1.jpg",
      title: "Кофейня #1 на восстания",
      description: "Кофейня премиум-класса",
      address: "ул.Восстания, д.1",
    },
  ],
  coffeeShop: {
    photo: "https://burobiz-a.akamaihd.net/uploads/images/55072/large_1.jpg",
    title: "Кофейня #1 на восстания",
    description: "Кофейня премиум-класса",
    address: "ул.Восстания, д.1",
    cart: [{}],
    menu: {
      Выпечка: [
        {
          title: "Круассан",
          price: "100",
          photo:
            "https://static-sl.insales.ru/images/products/1/4339/349892851/%D0%BA%D1%80%D1%83%D0%B0%D1%81%D1%81%D0%B0%D0%BD.jpg",
          description: "Хрустящий и маслянистый",
          available: true,
        },
      ],
      Кофе: [
        {
          title: "Капучино",
          price: "100",
          photo: "https://www.weclever.ru/img/actions/88317/1-650x350.jpg",
          description: "Бодрящий",
          available: true,
        },
        {
          title: "Американо",
          price: "60",
          photo:
            "https://www.pizzasushishop.ru/wp-content/uploads/2018/03/%D0%9A%D0%BE%D1%84%D0%B5-%D0%B0%D0%BC%D0%B5%D1%80%D0%B8%D0%BA%D0%B0%D0%BD%D0%BE.jpg",
          description: "Бодрящий",
          available: false,
        },
      ],
    },
  },
  snackbar: null,
};

export const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_COLOR_SCHEME: {
      return {
        ...state,
        colorScheme: action.payload.data,
      };
    }
    case SET_SNACKBAR: {
      return {
        ...state,
        snackbar: action.payload.data,
      };
    }
    case SET_IS_ONBOARDING_VIEWED: {
      return {
        ...state,
        isOnboardingViewed: action.payload.data,
      };
    }
    case SET_IS_NOTIFICATIONS_ENABLED: {
      return {
        ...state,
        isNotificationsEnabled: action.payload.data,
      };
    }
    default: {
      return state;
    }
  }
};
