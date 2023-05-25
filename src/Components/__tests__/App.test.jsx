import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "../../App";
import i18n from "../../i18n";
import { I18nextProvider } from "react-i18next";
import { act } from "react-dom/test-utils";

describe("Test header component", () => {
  beforeEach(() => {
    render(
      <I18nextProvider i18n={i18n}>
        <App />
      </I18nextProvider>
    );
  });

  test("check language selector", async () => {
    const userTableTitle = await screen.findByText(/Users Details/i);
    expect(userTableTitle).toBeInTheDocument();
  });

  test("check number of users", async () => {
    const userTableTitle = await screen.findByText(/Users Details/i);
    const userTableRows = await screen.findAllByTestId("table-body-row");
    expect(userTableTitle).toBeInTheDocument();
    expect(userTableRows).toHaveLength(3);
  });

  // test("check add user form check", async () => {
  //   const addUserBtn = await screen.findByText(/Add User/i);
  //   await act(async () => {
  //     fireEvent.click(addUserBtn);
  //   });
  //   await waitFor(() => screen.getByTestId("modal-title"));
  //   let modalTitleElement = screen.getByTestId("modal-title");
  //   expect(modalTitleElement).toBeInTheDocument();
  //   expect(screen.getByTestId("submit-btn")).toHaveAttribute("disabled");

  //   await act(async () => {
  //     fireEvent.change(screen.getByTestId("name"), {
  //       target: { value: "Jacob" },
  //     });
  //     fireEvent.change(screen.getByTestId("income"), {
  //       target: { value: 8000 },
  //     });
  //     fireEvent.change(screen.getByTestId("expenditure"), {
  //       target: { value: 5000 },
  //     });
  //     fireEvent.change(screen.getByTestId("mobile_bill"), {
  //       target: { value: 3000 },
  //     });
  //     fireEvent.change(screen.getByTestId("electricity_bill"), {
  //       target: { value: 2000 },
  //     });
  //   });
  //   await waitFor(() =>
  //     expect(screen.getByTestId("submit-btn")).not.toBeDisabled()
  //   );
  //   await act(async () => {
  //     fireEvent.click(screen.getByTestId("submit-btn"));
  //   });

  //   await waitFor(async () =>
  //     expect(await screen.findAllByTestId("table-body-row")).toHaveLength(4)
  //   );
  // });

  // test("check update user form check", async () => {
  //   expect(await screen.findAllByTestId("table-body-row")).toHaveLength(3);
  //   const allEditBtns = await screen.findAllByTestId("update-button");
  //   expect(allEditBtns[0]).toHaveTextContent("Edit");
  //   await act(async () => {
  //     fireEvent.click(allEditBtns[0]);
  //   });

  //   await waitFor(() => screen.getByTestId("modal-title"));
  //   let modalTitleElement = screen.getByTestId("modal-title");
  //   expect(modalTitleElement).toBeInTheDocument();
  //   expect(screen.getByTestId("submit-btn")).toHaveAttribute("disabled");
  //   await act(async () => {
  //     fireEvent.change(screen.getByTestId("name"), {
  //       target: { value: "Rani" },
  //     });
  //   });
  //   await waitFor(() =>
  //     expect(screen.getByTestId("submit-btn")).not.toBeDisabled()
  //   );
  //   await act(async () => {
  //     fireEvent.click(screen.getByTestId("submit-btn"));
  //     expect(await screen.findAllByTestId("table-body-row")).toHaveLength(3);
  //   });
  // });

  // test("check update user form check", async () => {
  //   expect(await screen.findAllByTestId("table-body-row")).toHaveLength(3);
  //   const allEditBtns = await screen.findAllByTestId("delete-button");
  //   expect(allEditBtns[0]).toHaveTextContent("Delete");
  //   await act(async () => {
  //     fireEvent.click(allEditBtns[0]);
  //   });

  //   await waitFor(async () =>
  //     expect(await screen.findAllByTestId("table-body-row")).toHaveLength(2)
  //   );
  // });
});
