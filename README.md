# My Movies App

Этот проект — это одностраничное приложение (SPA), которое отображает список фильмов, загружаемых из API, с возможностью ставить лайки, удалять, создавать, редактировать и фильтровать фильмы.

Вы можете посмотреть рабочую версию проекта [здесь](https://irinarakhimova.github.io/My_movies/#/products).

## Основные функции

### Список продуктов
- На странице `/products` отображается список фильмов.
- На каждой карточке фильма есть:
  - **Кнопка лайка** (с иконкой), которая меняет статус лайка и изменяет цвет иконки в зависимости от статуса.
  - **Кнопка удаления** (с иконкой), которая удаляет фильм из списка.
  - **Фильтр** для отображения всех фильмов или только фильмов, добавленных в избранное.
  - **Сортировка** фильмов по рейтингу.
- Карточки фильмов отображают ограниченное количество текста для обеспечения одинаковой высоты карточек.
- Клик по любой части карточки (кроме иконок лайка и удаления) открывает страницу с подробной информацией о фильме.

### Страница продукта
- На странице `/products/:id` отображается подробная информация о фильме.
- Добавлена кнопка для возврата на главную страницу со списком продуктов.

### Создание продукта
- На отдельной странице `/create-product` реализована форма для создания нового фильма.
  - Форма содержит обязательные поля с базовой валидацией.
  - После отправки формы данные сохраняются в общем хранилище.

### Бонусные функции:
- **Пагинация**: Добавлена возможность переключения страниц со списком фильмов для улучшения навигации.
- **Редактирование карточки**: Реализована возможность редактировать информацию о фильме.
- **Дополнительная фильтрация**: Добавлен фильтр для фильмов на основе рейтинга.
- **Поиск фильмов**: Реализован поиск фильмов без необходимости нажимать кнопку отправки.

## Технологический стек

- **React**: Использован для построения пользовательского интерфейса.
- **TypeScript**: Для обеспечения типизации в проекте.
- **React Router**: Для реализации маршрутизации и навигации.
- **Axios**: Для получения данных с [TMDB API](https://www.themoviedb.org/documentation/api).
- **Bootstrap**: Для базовой стилизации компонентов.
- **GitHub Pages**: Для деплоя приложения.

## Как запустить проект локально

1. Клонируйте репозиторий:
   ```bash
   git clone https://github.com/IrinaRakhimova/My_movies.git
   cd My_movies
2.  Установите зависимости:
    npm install
3.  Создайте файл .env в корневой директории проекта и добавьте ваш ключ TMDB API:  
    REACT_APP_API_KEY=your_tmdb_api_key_here
4. Запустите приложение:
    npm start 

Приложение будет доступно по адресу http://localhost:3000        

## Используемое API
Проект использует TMDB API для получения данных о фильмах, включая:

- **Название**
- **Описание**
- **Постер**
- **Рейтинг**

## Демо проекта
- Репозиторий на GitHub: [My_movies](https://github.com/IrinaRakhimova/My_movies)
- Живая демонстрация: [My Movies App](https://irinarakhimova.github.io/My_movies/#/products)