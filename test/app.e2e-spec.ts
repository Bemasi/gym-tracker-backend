import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('App (e2e)', () => {
  let app: INestApplication;
  let server: any;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    server = app.getHttpServer();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should register a user', async () => {
    const res = await request(server)
      .post('/auth/register')
      .send({
        email: 'testuser@example.com',
        password: 'password123',
      })
      .expect(201);

    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('email', 'testuser@example.com');
  });

  it('should login and return JWT token', async () => {
    const res = await request(server)
      .post('/auth/login')
      .send({
        email: 'testuser@example.com',
        password: 'password123',
      })
      .expect(201);

    expect(res.body).toHaveProperty('access_token');
  });

  it('should return current user info with token', async () => {
    const login = await request(server)
      .post('/auth/login')
      .send({
        email: 'testuser@example.com',
        password: 'password123',
      });

    const token = login.body.access_token;

    const me = await request(server)
      .get('/auth/me')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(me.body).toHaveProperty('email', 'testuser@example.com');
  });
});
