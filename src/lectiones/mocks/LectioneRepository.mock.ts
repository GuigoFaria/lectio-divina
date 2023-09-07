export const mockLectioneRepository = {
  findOne: jest.fn((entity) => entity),
  create: jest.fn((CreateLectioneDto) => CreateLectioneDto),
  find: jest.fn((id) => id),
  save: jest.fn((Lectione) => Lectione),
};
