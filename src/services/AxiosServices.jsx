import axios from "axios";

class AxiosServices {
  postMethod = (url, data, header) => {
    return axios.post(url, data, header);
  };

  getMethod = (url, header) => {
    return axios.get(url, header);
  };

  putMethod = (url, data, header) => {
    return axios.put(url, data, header);
  };

  deleteMethod = (url, header) => {
    return axios.delete(url, header);
  };
}

export default AxiosServices;
