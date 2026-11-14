let page;

// Общая функция: ждёт появления h1 и возвращает его текст (принцип DRY)
const getH1Text = async () => {
  await page.waitForSelector("h1");
  return page.$eval("h1", (el) => el.textContent);
};

// Общие хуки: создают и закрывают страницу для каждого теста.
// Стартовую страницу (goto) каждый блок describe задаёт себе сам,
// поэтому хуки не конфликтуют и не повторяются (принцип DRY).
beforeEach(async () => {
  page = await browser.newPage();
});

afterEach(async () => {
  await page.close();
});

describe("Github page tests", () => {
  beforeEach(async () => {
    await page.goto("https://github.com/team");
  });

  test(
    "The h1 header content'",
    async () => {
      const firstLink = await page.$("header div div a");
      await firstLink.click();
      await page.waitForSelector("h1");
      const title2 = await page.title();
      expect(title2).toEqual(
        "GitHub · Change is constant. GitHub keeps you ahead. · GitHub · GitHub"
      );
    },
    60000
  );

  test(
    "The first link attribute",
    async () => {
      const actual = await page.$eval("a", (link) =>
        link.getAttribute("href")
      );
      expect(actual).toEqual("#start-of-content");
    },
    30000
  );

  test(
    "The page contains Sign in button",
    async () => {
      const btnSelector = 'a[href*="/join"]';
      await page.waitForSelector(btnSelector, {
        visible: true,
      });
      const actual = await page.$$eval(btnSelector, (links) =>
        links.some((link) => link.textContent.includes("Sign up for free"))
      );
      expect(actual).toBe(true);
    },
    30000
  );
});

// Новые тесты — за блоком describe выше.
// У каждого теста своя стартовая страница, поэтому общий beforeEach с goto
// здесь не подходит: каждая страница открывается внутри самого теста.
describe("Github other pages headers", () => {
  test(
    "The h1 header of the features page",
    async () => {
      await page.goto("https://github.com/features");
      const actual = await getH1Text();
      expect(actual).toContain("The tools you need to build what you want");
    },
    30000
  );

  test(
    "The h1 header of the enterprise page",
    async () => {
      await page.goto("https://github.com/enterprise");
      const actual = await getH1Text();
      expect(actual).toContain("GitHub for Enterprise");
    },
    30000
  );

  test(
    "The h1 header of the security page",
    async () => {
      await page.goto("https://github.com/security");
      const actual = await getH1Text();
      expect(actual).toContain("GitHub Security");
    },
    30000
  );
});
