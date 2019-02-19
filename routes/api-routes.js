const db = require('../models/index.js');

module.exports = function(app){
  app.post('/save',async (req,res) => {
    console.log(`in post route`);
    console.log(req.body);
    const {id,title,poster_path,backdrop_path,overview,release_date} = req.body;
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

  app.delete('/save',async (req,res) => {
    console.log(`in delete route`);
    await db.Movie.findByIdAndDelete({
      'id':req.body.id
    })
  });
}