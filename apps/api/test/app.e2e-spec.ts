import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

// Skipping rigorous DB mock interactions for brevity, focusing on route registration and dependency injection
describe('Umrah API Integration (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/ (GET) Application Health Check', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('/trips (GET) Unauthorized fetch', () => {
    return request(app.getHttpServer())
      .get('/trips')
      // Currently the Trips Module GET requires authentication
      .expect(401);
  });

  it('/auth/login (POST) Validation Error', () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({ invalidField: 'test' })
      .expect(400); // Bad Request (DTO validation)
  });
});
