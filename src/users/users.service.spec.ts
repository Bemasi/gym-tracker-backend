import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { PrismaService } from '../prisma/prisma.service';

describe('UsersService', () => {
  let service: UsersService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, PrismaService],
    }).compile();

    service = module.get<UsersService>(UsersService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a user', async () => {
    prisma.user.create = jest.fn().mockResolvedValue({
      id: 1,
      email: 'mock@example.com',
      password: 'hashedpass',
    });

    const user = await service.create({
      email: 'mock@example.com',
      password: 'hashedpass',
    });

    expect(user).toHaveProperty('email', 'mock@example.com');
  });
});
