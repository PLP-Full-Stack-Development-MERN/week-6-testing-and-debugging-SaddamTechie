const request = require('supertest');
const app = require('../server');
const mongoose = require('mongoose');
const Bug = require('../models/Bug');

jest.mock('../models/Bug');

describe('Bug API', () => {
  beforeAll(async () => {
    await mongoose.connect('mongodb://localhost/test');
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  test('GET /api/bugs returns all bugs', async () => {
    const mockBugs = [{ title: 'Test Bug', status: 'open' }];
    Bug.find.mockReturnValue({ sort: jest.fn().mockResolvedValue(mockBugs) });

    const response = await request(app).get('/api/bugs');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockBugs);
  });

  test('POST /api/bugs creates a new bug', async () => {
    const mockBug = { title: 'Test Bug', description: 'Test Desc' };
    Bug.prototype.save = jest.fn().mockResolvedValue(mockBug);

    const response = await request(app)
      .post('/api/bugs')
      .send(mockBug);

    expect(response.status).toBe(201);
    expect(response.body).toEqual(mockBug);
  });

  test('PUT /api/bugs/:id updates a bug', async () => {
    const mockBug = { _id: '1', title: 'Updated Bug', status: 'resolved' };
    Bug.findByIdAndUpdate = jest.fn().mockResolvedValue(mockBug);

    const response = await request(app)
      .put('/api/bugs/1')
      .send({ status: 'resolved' });

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockBug);
  });

  test('DELETE /api/bugs/:id deletes a bug', async () => {
    Bug.findByIdAndDelete = jest.fn().mockResolvedValue({ _id: '1' });

    const response = await request(app).delete('/api/bugs/1');
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Bug deleted successfully');
  });
});