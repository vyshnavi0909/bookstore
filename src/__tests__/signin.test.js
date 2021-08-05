import { mount } from "enzyme/build";
import "../setupTests";
import LoginSignup from "../pages/login-signup/LoginSignUp";
import Login from "../pages/login-page/Login";
import Signup from "../pages/signup-page/Signup";

const withChild = mount(<LoginSignup />);

describe("test if containers of home component are loaded", () => {
  it("test if main container is loaded", () => {
    expect(withChild.find(".page-container").exists()).toBe(true);
  });

  it("test if buttons container is loaded", () => {
    expect(withChild.find(".btns-div").exists()).toBe(true);
  });

  it("test if sub component is loaded", () => {
    expect(withChild.find(Login).exists()).toBe(true);
  });

  it("test if sign in comp is not loaded at initial stage", () => {
    expect(withChild.find(Signup).exists()).toBe(false);
  });

  it("test if container of childern component is loaded", () => {
    expect(withChild.find(".comp-div").exists()).toBe(true);
  });
});

describe("test if inner components and classes of login are working", () => {
  it("test if main container of login comp is loaded", () => {
    expect(withChild.find(".login-form").exists()).toBe(true);
  });
});

// describe("test if events are working", () => {
//   it("test if signup component is loaded after click event", () => {
//     const loginBtn = withChild.find(".btn-comp");
//     expect(withChild.find(Signup).exists()).toBe(false);
//     loginBtn.simulate("click");
//     withChild.update();
//     // expect(withChild.find(Signup).exists()).toBe(true);
//   });
// });
