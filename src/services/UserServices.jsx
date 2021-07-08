import AxiosServices from "./AxiosServices";
const axios = new AxiosServices();
const baseUrl = "https://new-bookstore-backend.herokuapp.com/";
const config = {
  headers: {
    "Content-Type": "application/json",
    "x-access-token": localStorage.getItem("token"),
  },
};

class UserServices {
  signup = (data) => {
    return axios.postMethod(
      `${baseUrl}bookstore_user/registration`,
      data,
      config
    );
  };

  login = (data) => {
    return axios.postMethod(`${baseUrl}bookstore_user/login`, data, config);
  };

  getBooks = () => {
    return axios.getMethod(`${baseUrl}bookstore_user/get/book`);
  };

  addToCart = (product_id) => {
    // console.log(config.header.Authorization);
    return axios.postMethod(
      `${baseUrl}bookstore_user/add_cart_item/${product_id}`,
      null,
      config
    );
  };

  getFromCart = () => {
    return axios.getMethod(`${baseUrl}bookstore_user/get_cart_items`, {
      headers: {
        accept: "application/json",
        "x-access-token": localStorage.getItem("token"),
      },
    });
  };
}

export default UserServices;
