const server = require('../../build/devserver.js')

// initialize Testcafe
(async function () {
  const createTestCafe = require('testcafe');
  const testCafe = await createTestCafe('localhost', 1337, 1338);
  const runner = testcafe.createRunner();

  const failedCount = await runner
      .src('tests/e2e/fixtures')
      .browsers(['chrome'])
      .run();
})();
