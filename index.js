const express = require('express');
const dotenv = require('dotenv').config();
const port = process.env.PORT || 5000;

const app = express();

//Enable body parser (Taking data from the user)
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/openai', require('./routes/openaiRoutes.js'));

app.listen(port, () => {console.log(`Server started on port: ${port}`)});



