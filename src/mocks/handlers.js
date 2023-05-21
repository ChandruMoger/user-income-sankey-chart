import { rest } from "msw";
const url = "http://localhost:3001";

const users = [
  {
    name: "Chandru",
    income: 3000,
    expenditure: 2200,
    expenditures: {
      mobile_bill: 700,
      electricity_bill: 1500,
    },
    id: 1,
  },
  {
    id: 2,
    name: "Naveen",
    income: 5000,
    expenditure: 3000,
    expenditures: {
      mobile_bill: 1000,
      electricity_bill: 2000,
    },
  },
  {
    id: 3,
    name: "Mohini",
    income: 10000,
    expenditure: 7000,
    expenditures: {
      mobile_bill: 1000,
      electricity_bill: 6000,
    },
  },
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

  rest.put(`${url}/users/1`, (req, res, ctx) => {
    return res(
      // Respond with a 200 status code
      ctx.status(200),
      ctx.json([...users])
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
