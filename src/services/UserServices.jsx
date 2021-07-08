import AxiosServices from "./AxiosServices";
const axios = new AxiosServices();
const baseUrl = "https://new-bookstore-backend.herokuapp.com/";
const config = {
  header: {
    "Content-Type": "application/json",
    Authorization: localStorage.getItem("token"),
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
    return axios.getMethod(`${baseUrl}bookstore_user/get/book`, config);
  };
}

export default UserServices;
