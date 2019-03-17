//const port = 4040;
const port = process.env.PORT || 4040;
const express = require('express');
const bodyParser = require('body-parser');
var app = express();

const serviceController = require('./controller/serviceController.js');

app.use(bodyParser.json());
app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers', '*'); 
    /* res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');  */
    if (req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,PATCH');
        return res.status(200).json({});
    }
    next();
});
app.use('/video',serviceController);


//heroku link: https://video-store-service.herokuapp.com/
const server = app.listen(port, ()=>{
    console.log("** Started on port " + port + "  url:   localhost:" + port +"/video");
})
