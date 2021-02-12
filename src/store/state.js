export const state = {
  slideIndex: 0,
  quiz: [
    {
      id: 0,
      type: "reusable",
      image: "https://www.babista.nl/blog/wp-content/uploads/2017/11/titel-2.jpg",
      header: "Опрос про кино",
      text: "Ваше мнение очень важно(нет)",
      questions: [
        {
          type: "single",
          title: "Сколько лет Навальному",
          answer: ["35 лет", "31 годик", "3.5 лет колонии"]
        },
        {
          type: "multi",
          title: "Сколько звезд на небе?",
          answer: ["Что-то около бесконечности", "Там есть звезды?", "3, 5, 10, 15..."]
        },
        {
          type: "input",
          title: "Сколько ты спишь?",
          answer: ["Введите здесь текст"]
        },
        {
          type: "file",
          title: "Какая у тебя последняя фотография?",
          answer: ["Загрузите файл"]
        },
      ]
    },
    {
      id: 1,
      type: "disposable",
      show: true,
      text: "Как часто вы чистите зубы?)",
      firstAnswer: "> 2 раз в день",
      secondAnswer: "2 раз в день",
      thirdAnswer: "1 раз в день",
    },
    {
      id: 2,
      type: "reusable",
      image: "https://images.unsplash.com/photo-1603928726698-a015a1015d0e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80",
      header: "Опрос про здоровье",
      text: "Ваше мнение очень важно(нет)",
      questions: [
        {
          type: "single",
          title: "Какую таблетку выберешь?",
          answer: ["Красную", "Синию", "Обе"]
        },
        {
          type: "single",
          title: "Сколько тебе осталось жить?",
          answer: ["Больше 50 лет", "Я бессмертен", "На сегодня хватит"]
        },
        {
          type: "single",
          title: "Сколько ты спишь?",
          answer: ["8 часов", "3 часа", "Что такое сон?"]
        },
        {
          type: "single",
          title: "Как называется любое массовое заболевание людей?",
          answer: ["Эпидемия", "Пандемия", "Смэртъ"]
        },
        {
          type: "single",
          title: "Тренировка организма холодом называется?",
          answer: ["Закаливание", "Охлаждение", "Смэртъ"]
        },
        {
          type: "single",
          title: "Жидкость, переносящая в организме кислород, - это…",
          answer: ["Желтая жидкость", "Красная жидкость", "Черная жидкость"]
        },
      ],
    },

  ]
}