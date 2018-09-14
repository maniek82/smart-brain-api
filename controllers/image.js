const Clarifai = require('clarifai');


const app = new Clarifai.App({
    apiKey: '1fd483ce94b64fd2a3cf4fb876315671'
   });
   
const handleApiCall = (req,res)=> {
    app.models
    .predict( Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data=> {
        res.json(data)
    })
    .catch(err=> res.status(400).json("unable to work with API"))
}
  

const imageHandler = (req,res)=> {
    const {id} = req.body;
    
    db('users')
        .where('id', '=', id)
        .increment('entries',1)
        .returning('entries')
        .then(entries => {
            res.json(entries[0]);
        })
        .catch(err=> {
            res.status(400).json("unable to get entries");
        })
}

module.exports = {
    imageHandler: imageHandler,
    handleApiCall: handleApiCall
}