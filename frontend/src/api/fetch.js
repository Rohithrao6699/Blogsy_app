import axios from "axios";

const Base_Url = "http://localhost:3000";

//useFetch(method, url, data, headers, params)

export async function fetchAllBlogs(page, limit) {
  const res = await axios.get(
    `${Base_Url}/user/allblogs?page=${page}&limit=${limit}`
  );
  const data = res.data;
  return data;
  //totlPages, blogs, currentPage
}

export async function signup(signUpdata) {
  const res = await axios.post(`${Base_Url}/user/signup`, signUpdata);
  const data = res.data;
  return data;
}

export async function signin(signindata) {
  const res = await axios.post(`${Base_Url}/user/signin`, signindata);
  const data = res.data;
  return data;
}

export async function myblogs() {
  const token = localStorage.getItem("token");
  const res = await axios.get(`${Base_Url}/user/myblogs`, {
    headers: { token: token },
  });
  const data = res.data;
  return data;
  //blogs, msg
}

export async function createblog(blogdata) {
  const token = localStorage.getItem("token");
  const res = await axios.post(`${Base_Url}/user/createblog`, blogdata, {
    headers: { token: token },
  });
  const data = res.data;
  return data;
  //blogs, success
}

export async function updateblog(updatedData) {
  const token = localStorage.getItem("token");
  const res = await axios.put(`${Base_Url}/user/updateblog`, updatedData, {
    headers: { token },
  });
  const data = res.data;
  return data;
}

export async function deleteblog(blogId) {
  const token = localStorage.getItem("token");
  const res = await axios.delete(`${Base_Url}/user/deleteblog`, {
    headers: { token },
    data: { blogId },
  });
  const data = res.data;
  return data;
}

export async function authorblogs(userId) {
  console.log(userId);
  const res = await axios.get(`${Base_Url}/user/authorblogs?userId=${userId}`);
  const data = res.data;
  return data;
  //blogs, success
}
