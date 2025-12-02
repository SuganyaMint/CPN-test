import { Provider } from "react-redux";
import { render } from "@testing-library/react";
import configureStore from "redux-mock-store";

const mockStore = configureStore([]);

export function renderWithStore(ui, initialState = {}) {
  const store = mockStore(initialState);
  return render(<Provider store={store}>{ui}</Provider>);
}
