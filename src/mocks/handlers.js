import { rest } from "msw";
const url = "http://localhost:3001";

const users = [
  {
    "name": "Chandru",
    "incomes": [
      {
        "name": "Salary",
        "amount": 100000
      },
      {
        "name": "Freelance",
        "amount": 50000
      },
      {
        "name": "Share Market",
        "amount": 100000
      }
    ],
    "expenditures": [
      {
        "name": "Mobile Bill",
        "amount": 1200
      },
      {
        "name": "Internet",
        "amount": 3000
      },
      {
        "name": "Shopping",
        "amount": 10000
      }
    ],
    "id": 1
  },
  {
    "name": "Mohini",
    "incomes": [
      {
        "name": "Salary",
        "amount": 90000
      },
      {
        "name": "Business",
        "amount": 200000
      }
    ],
    "expenditures": [
      {
        "name": "Mobile Bill",
        "amount": 12000
      },
      {
        "name": "Internet",
        "amount": 5000
      },
      {
        "name": "Medical",
        "amount": 50000
      },
      {
        "name": "Shopping",
        "amount": 30000
      }
    ],
    "id": 2
  },
  {
    "name": "Naveen",
    "incomes": [
      {
        "name": "Salary",
        "amount": 15000
      },
      {
        "name": "Business",
        "amount": 300000
      }
    ],
    "expenditures": [
      {
        "name": "Home Maintainance",
        "amount": 25000
      },
      {
        "name": "Finance",
        "amount": 20000
      }
    ],
    "id": 3
  }
]
export const handlers = [
  // Handles a POST /login request
  rest.get(`${url}/users`, (req, res, ctx) => {
    return res(
      // Respond with a 200 status code
      ctx.status(200),
      ctx.json([...users])
    );
  }),
  rest.post(`${url}/users`, (req, res, ctx) => {
    return res(
      // Respond with a 200 status code
      ctx.status(200),
      ctx.json({
        "name": "Naveen",
        "incomes": [
          {
            "name": "Salary",
            "amount": 15000
          },
          {
            "name": "Business",
            "amount": 300000
          }
        ],
        "expenditures": [
          {
            "name": "Home Maintainance",
            "amount": 25000
          },
          {
            "name": "Finance",
            "amount": 20000
          }
        ],
        "id": 3
      })
    );
  }),

  rest.put(`${url}/users/1`, (req, res, ctx) => {
    return res(
      // Respond with a 200 status code
      ctx.status(200),
      ctx.json([...users[0]])
    );
  }),
  rest.delete(`${url}/users/1`, (req, res, ctx) => {
    return res(
      // Respond with a 200 status code
      ctx.status(200),
      ctx.json({
        name: "Sanjeeth",
        income: 3000,
        expenditure: 2200,
        expenditures: {
          mobile_bill: 700,
          electricity_bill: 1500,
        },
        id: 1,
      })
    );
  }),
];
