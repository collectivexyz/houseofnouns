import { getAbsoluteUrl } from '..';

describe('getAbsoluteUrl()', () => {
  const OLD_ENV = process.env;
  const TEST_PATH = '/test';

  beforeEach(() => {
    jest.resetModules();
  });

  afterAll(() => {
    process.env = OLD_ENV;
  });

  test.each([
    { a: 'http://localhost:3000', b: 'http://localhost:3000', c: 'local', d: false },
    { a: 'http://githubpreview.dev', b: 'http://localhost:3000', c: 'github', d: true },
    { a: 'http://momentranks.com', b: 'http://momentranks.com', c: 'prod', d: true },
    { a: 'https://momentranks.com', b: 'https://momentranks.com', c: 'prod SSL', d: true },
  ])(
    'should return properly set URL and path with appropriate properties in $c env',
    ({ a, b, d }) => {
      const URL = a;
      const FINAL_URL = b;

      if (d) {
        process.env = { ...OLD_ENV, NEXT_PUBLIC_VERCEL_URL: URL };
      }

      const test = getAbsoluteUrl();
      expect(process.env.NEXT_PUBLIC_VERCEL_URL === URL);
      expect(test).toEqual(FINAL_URL);

      const testWithPath = getAbsoluteUrl(TEST_PATH);
      if (d) {
        expect(process.env.NEXT_PUBLIC_VERCEL_URL === URL);
      }
      expect(testWithPath).toEqual(`${FINAL_URL}/test`);
    }
  );
});
