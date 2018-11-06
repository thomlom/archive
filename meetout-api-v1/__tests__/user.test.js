const request = require('supertest');
const app = require('../server');

describe('GET /me', () => {
  let token;
  beforeAll(done => {
    request(app)
      .post('/login')
      .send({ email: 'admin@admin.com', password: 'admin' })
      .end((err, res) => {
        if (err) throw err;
        expect(res.statusCode).toBe(200);
        token = res.body.token; // eslint-disable-line
        done();
      });
  });

  it('gets the current user', done => {
    request(app)
      .get('/me')
      .set('Authorization', token)
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        expect(res.statusCode).toBe(200);
        done();
      });
  });
});
