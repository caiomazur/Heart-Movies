# Heart Movies

<br>

## Description

Search platform for tv and film where you can search and add your favorites to your profile.

<br>

https://nice-lime-kitten-tutu.cyclic.app/

<br>

## User Stories

- **404** - As a user I want to see a nice 404 page when I go to a page that doesn't exist so that I know it was my fault
- **500** - As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault
- **homepage** - As a user I want to be able to access the homepage and filter by movie name or genre, log in and sign up.
- **sign up** - As a user I want to sign up on the web page so that I can add favorite films to my list.
- **login** - As a user I want to be able to log in on the web page so that I can get back to my account
- **logout** - As a user I want to be able to log out from the web page so that I can make sure no one will access my account
- **favorite list** - As a user I want to see the list of my favorite and delete them.
- **edit user** - As a user I want to be able to edit my profile.
- **result** - As a user I want to see the list of films filtered by my preferences.
- **movies listing** - As a user I want to see more details of the movie, be able to see the poster, title, director and genre.

- **BONUS: Who likes it** - As a user I want to be able to check who favourited an specific film.

- **BONUS: Comments** - As a user I want to be able to check who favourited an specific film.

- **BONUS: Responsive** - As a user I want to be able to check the website in different devices.
-

<br>

## Server Routes (Back-end):

| **Method** | **Route**                      | **Description**                                                          | Request - Body                                           |
| ---------- | ------------------------------ | ------------------------------------------------------------------------ | -------------------------------------------------------- | --------------------- |
| `GET`      | `/`                            | Main page route. Renders home `index` view.                              |                                                          |
| `GET`      | `/login`                       | Renders `login` form view.                                               |                                                          |
| `POST`     | `/login`                       | Sends Login form data to the server.                                     | { email, password }                                      |
| `GET`      | `/signup`                      | Renders `signup` form view.                                              |                                                          |
| `POST`     | `/signup`                      | Sends Sign Up info to the server and creates user in the DB.             | { email, password }                                      |
| `GET`      | `/profile`                     | Profile route. Renders `profile` view.                                   |                                                          |
| `GET`      | `/profile/edit-profile`        | Private route. Renders `edit-profile` form view.                         |                                                          |
| `POST`     | `/profile/edit-profile`        | Private route. Sends edit-profile info to server and updates user in DB. | { email, password, [firstName], [lastName], [imageUrl] } |
| `GET`      | `/profile/favorites`           | Private route. Render the `favorites` view.                              |                                                          |
| `POST`     | `/profile/favorites/`          | Private route. Adds a new favorite for the current user.                 | { name, director, year, }                                |
| `POST`     | `/profile/favorites/:moviesId` | Private route. Deletes the existing favorite from the current user.      |                                                          |
| `GET`      | `/movies`                      | Renders `movie-list` view.                                               |                                                          |
| `GET`      | `/movies/details/:id`          | Renders `movie-details` view for the particular movie.                   | `GET`                                                    | `/movies/details/:id` |
| `GET`      | `/search-movies`               | Renders `search-movies` view to perform the search req.query.            |

                                                          |

## Models

User model

```javascript
{

    {
    username: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    favorites: [
      {
        type: Schema.Types.ObjectId,
        ref: 'favorites',
      },
    ],
  },
  {
    timestamps: true,
  }

```

Favorites model

```javascript
{
  placeId: String,
}

```

<br>

## API's

https://imdb-api.com/



<br>

## Packages

<br>

## Backlog

[See the Trello board.](https://trello.com/b/Ni3giVKf/ironhackproject)

<br>

## Links

### Git

The url to your repository and to your deployed project

[Repository Link]()

[Deploy Link]()

<br>

### Slides

The url to your presentation slides

[Slides Link](https://docs.google.com/presentation/d/1P5FIi0vHZBUcgUtmt1M4_lLCO5dwdJ4UOgtJa4ehGfk/edit?usp=sharing)

### Contributors

Caio Mazur - [`<github-username>`](https://github.com/person1-username) - [`<linkedin-profile-link>`](https://www.linkedin.com/in/person1-username)

Marisha Deroubaix - [`<github-username>`](https://github.com/person2-username) - [`<linkedin-profile-link>`](https://www.linkedin.com/in/person2-username)
