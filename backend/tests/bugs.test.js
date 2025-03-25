const request = require('supertest');
const app = require('../server');
const mongoose = require('mongoose');
const Bug = require('../models/Bug');

describe('Bug API', () => {
  test('GET /api/bugs returns all bugs', async () => {
    await Bug.create({ title: 'Test Bug', status: 'open' });

    const response = await request(app).get('/api/bugs');
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
    expect(response.body[0].title).toBe('Test Bug');
  });

  test('POST /api/bugs creates a new bug', async () => {
    const mockBug = { title: 'Test Bug', description: 'Test Desc' };

    const response = await request(app)
      .post('/api/bugs')
      .send(mockBug);

    expect(response.status).toBe(201);
    expect(response.body.title).toBe(mockBug.title);
    expect(response.body.description).toBe(mockBug.description);
  });

  test('PUT /api/bugs/:id updates a bug', async () => {
    const bug = await Bug.create({ title: 'Bug to Update', status: 'open' });

    const response = await request(app)
      .put(`/api/bugs/${bug._id}`)
      .send({ status: 'resolved' });

    expect(response.status).toBe(200);
    expect(response.body.status).toBe('resolved');
  });

  test('DELETE /api/bugs/:id deletes a bug', async () => {
    const bug = await Bug.create({ title: 'Bug to Delete', status: 'open' });

    const response = await request(app).delete(`/api/bugs/${bug._id}`);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Bug deleted successfully');
  });
});