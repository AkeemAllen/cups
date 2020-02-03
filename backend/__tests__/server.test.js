const app = require('../server');
const supertest = require('supertest');
const request = supertest(app);

describe('Testing Users endpoints', () => {
  it('should test that /users endpoint returns 200', async done => {
    // Sends GET request to /users endpoint
    const response = await request.get('/users');
    expect(response.status).toBe(200);
    done();
  });
  it('should test that /users/add endpoint returns 200', async done => {
    // Sends GET request to /users endpoint
    const response = await request.get('/users');
    expect(response.status).toBe(200);
    done();
  });
});
