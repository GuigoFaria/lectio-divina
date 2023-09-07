export const mockUserRepository = {
  findOne: jest
    .fn((entity) => entity)
    .mockResolvedValue({
      id: '1',
      name: 'name',
      email: 'email',
      password: 'password',
      sequenceDays: 1,
      timeDisplayedInSeconds: 1,
      createdAt: new Date('01-01-2022'),
      updatedAt: new Date('01-01-2022'),
    }),
};
