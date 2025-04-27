# My Movies App 🎬

his project is a single-page application (SPA) that displays a list of movies fetched from an API, with functionality to like, delete, create, edit, and filter movies.

You can view the live version of the project [here](https://irinarakhimova.github.io/My_movies/#/).

## Main Features

### Movie List
- The / page displays a list of movies.
- The page includes:
  - **Like buttons** that toggle the like status and change the icon color accordingly.
  - **Delete buttons** that remove the movie from the list.
  - A **filter** to show either all movies or only the favorite ones.
  - **Sorting** movies by rating.
- Movie cards display a limited amount of text to maintain consistent card heights.
- Clicking on any part of the card (except for the like and delete icons) opens a detailed page for the movie.

### Movie Detail Page
- The /:id page shows detailed information about a movie.
- A button is provided to return to the main movie list page.

### Adding Movies
- On the /create page, you can create your own movie by filling out a form.
- On the /find page, you can search for an existing movie using the TMDB API and add it to your collection directly.

### Bonus Features:
- **Pagination**: Added the ability to navigate between pages of movie lists for better usability.
- **Editing Movie Cards**: Allows editing existing movie information.
- **Additional Filtering**: Added a filter based on movie ratings.
- **Search Functionality**: Implemented a search for movies without needing to press a submit button.

## Tech Stack
- **React**: Used for building the user interface.
- **TypeScript**: For ensuring type safety across the project.
- **React Router**: For implementing routing and navigation.
- **Axios**: For fetching data from the [TMDB API](https://www.themoviedb.org/documentation/api).
- **Bootstrap**: For basic component styling.
- **GitHub Pages**: For deploying the app.

## How to Run the Project Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/IrinaRakhimova/My_movies.git
   cd My_movies
2.  Install dependencies:
    npm install
3.  Create a .env file in the root directory of the project and add your TMDB API key:  
    REACT_APP_API_KEY=your_tmdb_api_key_here
4. Start the application:
    npm start 

The app will be available at http://localhost:3000        

## API Used
The project uses the TMDB API to fetch movie data, including:

- **Title**
- **Description**
- **Poster**
- **Rating**

## Project Demo
- GitHub repository: [My_movies](https://github.com/IrinaRakhimova/My_movies)
- Live demo: [My Movies App](https://irinarakhimova.github.io/My_movies/#/)