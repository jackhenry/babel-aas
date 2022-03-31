import axios from "axios";

/**
 * 
 * @param {string} url - url of baas server
 * @param {object} body - json body
 * @returns 
 */
async function post(url, body) {
  const response = await axios.post(url, body);
  return response.data;
}

export default {
  post,
};