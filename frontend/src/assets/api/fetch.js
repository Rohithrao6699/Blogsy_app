import axios from "axios";
import { useFetch } from "../../hooks/useFetch";

const Base_Url = "http://localhost:3000";

//useFetch(method, url, data, headers, params)

export async function fetchAllBlogs(page, limit) {
  const params = { page, limit };
  const { data, loader, error } = useFetch(
    "GET",
    `${Base_Url}/user/allblogs`,
    {},
    {},
    params
  );
  return data;
}

export async function signup(signUpdata) {
  const { data, loader, error } = useFetch(
    "POST"`${Base_Url}/user/signup`,
    signUpdata,
    {},
    {}
  );
  return data;
}

export async function signin(signindata) {
  const { data, loader, error } = useFetch(
    "POST",
    `${Base_Url}/user/signin`,
    signindata,
    {},
    {}
  );
  return data;
}

export async function myblogs() {
  const token = localStorage.getItem("token");
  const { data, loader, error } = useFetch(
    "GET",
    `${Base_Url}/user/myblogs`,
    {},
    token,
    {}
  );
  return data;
}

export async function createblog(blogdata) {
  const token = localStorage.getItem("token");
  const { data, loader, error } = useFetch(
    "POST",
    `${Base_Url}/user/createblog`,
    blogdata,
    token,
    {}
  );
  return data;
}

export async function updateblog(updatedData) {
  const token = localStorage.getItem("token");

  const { data, loader, error } = useFetch(
    "PUT",
    `${Base_Url}/user/updateblog`,
    updatedData,
    token,
    {}
  );
  return data;
}

export async function deleteblog(blogId) {
  const token = localStorage.getItem("token");

  const { data, loader, error } = useFetch(
    "DELETE",
    `${Base_Url}/user/deleteblog`,
    blogId,
    token,
    {}
  );
  return data;
}

export async function authorblogs(userId) {
  console.log(userId);
  const params = { userId };

  const { data, loader, error } = useFetch(
    "GET",
    `${Base_Url}/user/authorblogs`,
    {},
    {},
    params
  );
  return data;
}
