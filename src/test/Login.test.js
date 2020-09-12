import React from "react";
// import API mocking utilities from Mock Service Worker.
import { rest } from "msw";
import { setupServer } from "msw/node";
// import testing utilities
import { render, fireEvent, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Login from "../Login";
const baseURL = "http://localhost:4000/";
const server = setupServer(
  rest.get(`${baseURL}login`, (req, res, ctx) => {
    return res(
      ctx.json({
        data: {
          username: "admin@admin.com",
          password: "password",
        },
      })
    );
  })
);
beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  window.localStorage.removeItem("token");
});
afterAll(() => server.close());
describe("Test Login Component", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = render(<Login />);
  });
  test("allows the user to login successfully", async () => {
    // fill out the form
    fireEvent.change(screen.getByLabelText(/Email address/i), {
      target: { value: "chuck@gmail.com" },
    });
    screen.debug();
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: "norris" },
    });

    await userEvent.click(screen.getByText(/submit/i));
    //  fireEvent.click(screen.getByText(/submit/i));
    const message = await screen.findByText(/Incorrect username or password/);

    expect(message).toBeInTheDocument();

    // just like a manual tester, we'll instruct our test to wait for the alert
    // to show up before continuing with our assertions.
    const alert = await screen.getByTestId("errorID");

    // .toHaveTextContent() comes from jest-dom's assertions
    // otherwise you could use expect(alert.textContent).toMatch(/congrats/i)
    // but jest-dom will give you better error messages which is why it's recommended
    expect(alert).toHaveTextContent(/Incorrect username or password/i);

    // expect(window.localStorage.getItem('token')).toEqual(fakeUserResponse.token)
  });
});
