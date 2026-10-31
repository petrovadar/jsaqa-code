const sorting = require("../../app");

describe("Books names test suit", () => {
  it("Books names should be sorted in ascending order", () => {
    expect(
      sorting.sortByName([
        "Гарри Поттер",
        "Властелин Колец",
        "Волшебник изумрудного города",
      ])
    ).toEqual([
      "Властелин Колец",
      "Волшебник изумрудного города",
      "Гарри Поттер",
    ]);
  });
});

describe("Books names additional branches", () => {
  it("sorts names in descending input order", () => {
    expect(
      sorting.sortByName(["Гарри Поттер", "Властелин Колец"])
    ).toEqual(["Властелин Колец", "Гарри Поттер"]);
  });

  it("keeps equal names in place", () => {
    expect(
      sorting.sortByName(["Книга", "Книга"])
    ).toEqual(["Книга", "Книга"]);
  });
});
