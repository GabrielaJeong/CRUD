const express = require('express');
const app = express();
const PORT = 3000;

const postRouter = require('./routes/posts.router');

app.use(express.json()); // support parsing of application/json type post data
app.use(express.urlencoded({ extended: true })); // support parsing of application/x-www-form-urlencoded post data

app.use('/api/posts', postRouter);

app.listen(PORT, () => {
    console.log(`Server listen ${PORT}`)
});
