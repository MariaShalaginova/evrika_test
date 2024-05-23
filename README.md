# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

Требования к работе приложения

 На странице размещены 4 компонента таблицы. 
—  В таблице хранится информация о выбранных квартирах в формате: первый столбец подъезд, второй список номеров квартиры, выбранных в подъезде. 
Данный из таблице можно очистить нажатием кнопки с иконкой корзины.
Данный в таблицу можно добавить с помощью кнопки с иконкой плюса. При нажатии на неё открывается первое окно со списком подъездов, 
при выборе подъезда открывается второе окно со списком квартир, при нажатии на квартиру происходит её выбор. Выбор квартир должен быть
 множественным, можно выбрать как несколько квартир в одном подъезде, так и в разных подъездах. При нажатии на кнопку “Добавить” 
происходит добавление квартир в таблицу а окна выбора закрываются.  
