import { render, screen, fireEvent } from "@testing-library/react";
import Header from "../Header";
import i18n from "../../i18n";
import { I18nextProvider } from "react-i18next";

describe("Test header component", () => {
  beforeEach(() => {
    render(
      <I18nextProvider i18n={i18n}>
        <Header />
      </I18nextProvider>
    );
  });

  test("check language selector", () => {
    const selectLangElement = screen.getByText(/Select Language/i);
    expect(selectLangElement).toBeInTheDocument();
  });

  test("check language change", async () => {
    const selectLangElement = screen.getByTestId("select-lang");
    fireEvent.change(selectLangElement, {
      target: { value: "kn" },
    });
    const selectLabel = await screen.findByTestId("lan-select-label");
    expect(selectLabel).toHaveTextContent("ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ");
  });
});
