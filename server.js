const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const {BlogPosts} = require('./models');
const jsonParser = bodyParser.json();
const app = express();

app.use(morgan('common'));

BlogPosts.create('Huckleberry Finn', 'book', 'Mark Twain', 'Oct 5, 2017');
BlogPosts.create('Catch-22', 'book', 'Joseph Heller', 'Dec 7, 1778');
BlogPosts.create('Colder than Mars', 'newspaper article', 'Sam Odin', 'June 22, 2018');

app.get('/blog-posts', (req, res) => {
  res.json(BlogPosts.get());
});

app.post('/blog-posts', jsonParser, (req, res) => {
  const requiredFields = ['title', 'content', 'author', 'publishDate']
  for(let i = 0; i < requiredFields.length; i++){
    const field = requiredFields[i];
    if(!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`
      console.error(message);
      return res.status(400).send(message);
    }
  }
  const item = BlogPosts.create(req.body.title, req.body.content, req.body.author, req.body.publishDate);
  res.status(201).json(item);
})

app.listen(process.env.PORT || 8080, () => {
  console.log(`Your app is listening on port ${process.env.PORT || 8080}`);
});
