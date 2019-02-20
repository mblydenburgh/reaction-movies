const db = require('../models/index.js');

module.exports = function(app){

  //* POST route to add a movie to the database
  app.post('/save',async (req,res) => {
    console.log(`in post route`);
    console.log(req.body);
    const {id,title,poster_path,backdrop_path,overview,release_date} = req.body.movie;
    try{
      await db.Movie.create({
        id:id,
        title:title,
        poster_path:poster_path,
        backdrop_path:backdrop_path,
        overview:overview,
        release_date:release_date
      })
      res.redirect(`/${id}`);
    }
    catch(error){
      console.log(error);
      res.error(error);
    }
  });

  //* DELETE route to remove movie from database
  app.delete('/movie/:id',async (req,res) => {
    console.log(`in delete route`);
    try{
      const id = parseInt(req.params.id);

      const response = await db.Movie.findOneAndDelete({'id':id})
      res.send(response);
    }
    catch(error){
      console.log(error);
      res.send(error)
    }
  });

  //* GET route to look up individual movie from database
  app.get('/movie/:id',async (req,res) => {
    const id = req.params.id;
    console.log(`looking up id ${id} in db`);
    try{
      const movie = await db.Movie.findOne({'id':id});
      console.log(`sending movie: ${movie}`);
      res.send(movie);
    }
    catch(error){
      res.send(null);
    }
  });

  //* GET route to look up all saved favorites
  app.get('/saved',async(req,res) => {
    console.log('looking up favorites');
    try{
      const favorites = await db.Movie.find({});
      res.send(favorites);
    }
    catch(error){
      res.send(error);
    }
  })
}