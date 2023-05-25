import { addLink, formatNodes } from "../common-utility";

describe.only("test common utilities", () => {
  test("test add link function", () => {
    const newLink = addLink(1, 2, 100);
    expect(newLink).toEqual({
      source: 1,
      target: 2,
      value: 100,
    });
  });

  test("test add node and link function", () => {
    let nodes = [];
    let links = [];
    const user = {
      name: "Chandru",
      incomes: [
        {
          name: "Salary",
          amount: 100000,
        },
        {
          name: "Freelance",
          amount: 50000,
        },
        {
          name: "Dancing",
          amount: 100000,
        },
      ],
      expenditures: [
        {
          name: "Mobile Bill",
          amount: 1200,
        },
        {
          name: "Internet",
          amount: 3000,
        },
        {
          name: "Shopping",
          amount: 10000,
        },
      ],
      id: 1,
    };
    formatNodes(1, 2, user.incomes, nodes, links);
    expect(nodes).toEqual([
      {
        name: "Salary",
        node: 0,
      },
      {
        name: "Freelance",
        node: 1,
      },
      {
        name: "Dancing",
        node: 2,
      },
    ]);
    expect(links).toEqual([
      {
        source: 1,
        target: 2,
        value: 250000,
      },
      {
        source: 2,
        target: 0,
        value: 100000,
      },
      {
        source: 2,
        target: 1,
        value: 50000,
      },
      {
        source: 2,
        target: 2,
        value: 100000,
      },
    ]);
  });
});
