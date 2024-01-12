import { Test, TestingModule } from '@nestjs/testing';
import { TrelloController } from './trello.controller';

describe('TrelloController', () => {
  let controller: TrelloController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TrelloController],
    }).compile();

    controller = module.get<TrelloController>(TrelloController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
