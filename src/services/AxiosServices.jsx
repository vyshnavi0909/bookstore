import axios from "axios";

class AxiosServices {
  postMethod = (url, data, header) => {
    return axios.post(url, data, header);
  };

  getMethod = (url, header) => {
    return axios.get(url, header);
  };
}

export default AxiosServices;
