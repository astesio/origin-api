import { createServer } from './server';

describe('Server', () => {
  it('Should return server instance', async () => {
    const server = await createServer();
    expect(server).toBeDefined();
    await server.close();
  });
});
