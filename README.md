# Movie Search

##  Powered by The Movie Database

### Built With...
- NodeJS
- ExpressJS
- ReactJS
- MongoDB/Mongoose

### Available Routes
- "/" is the home route. Performs an AJAX request to TMDB to fetch recent popular movies and renders results to the screen
- "/saved" performs an database call to fetch any movies that have been saved to the database for favoriting
- "/movie/:id" display information on the chosen movie. When the component mounts, a database call is performedto check if it has been saved. If not, a request to TMDB is made in order to retrieve information. There is a button that either performs a POST or DELETE request in order to add/remove the selected movie from the database
- "/save" is called in order to add a movie to the database

![Reaction-Movies](https://raw.githubusercontent.com/mikebly/mikebly.github.io/master/assets/images/movies.png)
