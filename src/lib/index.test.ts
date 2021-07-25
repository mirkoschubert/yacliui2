import { main } from './index';

describe('main()', () => {
  test('print message', () => {
    const log = jest.spyOn(console, 'log').mockReturnValue();
    main();
    expect(log).nthCalledWith(1, 'Hello, world!');
    log.mockRestore();
  });
});
