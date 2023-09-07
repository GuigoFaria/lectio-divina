export const mockLectioneRepository = {
  findOne: jest.fn((entity) => entity),
  create: jest.fn((CreateLectioneDto) => CreateLectioneDto),
  save: jest.fn((Lectione) => Lectione),
};
