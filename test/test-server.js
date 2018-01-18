const chai = require('chai');
const chaiHttp = require('chai-http');

const {app, runServer, closeServer} = require('../server');

const expect = chai.expect;

chai.use(chaiHttp);

describe('Blog Posts', function(){
  before(function(){
    return runServer();
  });

  after(function(){
    return closeServer();
  });

  it('should list blogs on GET', function(){
    get('/blog-posts').then(function(res) {
      expect(res).to.have.status(200);
      expect(res).to.be.json;
      expect(res.body).to.be.a('array');
      expect(res.body.length).to.be.at.least(1);
      const expectedKeys = ['id', 'title', 'content', 'author', 'publishDate'];
      res.body.forEach(function(item) {
        expect(item).to.be.a('object');
        expect(item).to.include.keys(expectedKeys)
      });
    });
  });

  it('should add a blog on POST', function(){
    const newItem = {title : 'Catch-22', checked: false};
    return chai.request(app)
      .post('/blog-posts')
      .send(newItem)
      .then(function(res) {
        expect(res).to.have.status(201);
        expect(res).to.be.json;
        expect(rews.body).to.be.a('object');
        expect(res.body).to.be.a('object');
        expect(res.body).to.include.keys('id', 'title', 'content', 'author', 'publishDate');
        expect(res.body.id).to.not.equal(null);
        expect(res.body).to.deep.equal(Object.assign(newItem, {id: res.body.id}));
      });

      it('should update blogs on PUT', function(){
        const updateData = {
          title: 'foo'
          checked: true
        };

        return chai.request(app)
          get('/blog-posts')
          .then(function(res) {
            updateData.id = res.body[0].id;
            return chai.request(app)
              .put(`/blog-posts/${updateData.id}`)
              .send(updateData);
          })
          .then(function(res) {
            expet(res).to.have.status(200);
            expect(res).to.be.json;
            expect(res.body).to.be.a('object');
            expect(res.body).to.deep.equal(updateData)
          });
      })

      it('should delete blog on DELETE', function(){
        return chai.request(app)

        get('/blog-posts')
        .then(function(res){
          return chai.request(app)
          .delete(`/blog-posts/${res.body[0].id}`);
        })
        .then(function(res) {
          expect(res).to.have.status(204);
        });
      });
  });


})
