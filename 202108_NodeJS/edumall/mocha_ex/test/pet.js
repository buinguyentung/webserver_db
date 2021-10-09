//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
// Override 'should' property of Object for testing
let should = chai.should();

chai.use(chaiHttp);
// test-suite
describe('Pets', () => {
  // beforeEach is a hook.
  // It runs before each test case and initializes the test environment.
  beforeEach((done) => {
    //Before each test we empty the database in your case
    done();
  })
  /**
   * Test the GET route
   */
  describe('/GET pets', () => {
    it('it should GET all the pets', (done) => {
      chai.request(server)
        .get('/pets')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(9); // should be fixed
          done();
        });
    });
  });
});