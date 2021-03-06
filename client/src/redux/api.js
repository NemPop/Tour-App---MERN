import axios from "axios";

const devEnv = process.env.NODE_ENV !== "production";

const { REACT_APP_DEV_API, REACT_APP_PROD_API } = process.env;

const API = axios.create({
  baseURL: `${devEnv ? REACT_APP_DEV_API : REACT_APP_PROD_API}`,
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});
export const signIn = (formData) => API.post("/users/signin", formData);
export const signUp = (formData) => API.post("/users/signup", formData);
export const googleSignIn = (result) => API.post("/users/googleSignIn", result);

export const createTour = (tourData) => API.post("/tours", tourData);
export const getTours = (page) => API.get(`/tours?page=${page}`);
export const getTour = (id) => API.get(`/tours/${id}`);
export const deleteTour = (id) => API.delete(`/tours/${id}`);
export const updateTour = (updatedTourData, id) =>
  API.patch(`/tours/${id}`, updatedTourData); //tour Id
export const getToursByUser = (userId) => API.get(`/tours/userTours/${userId}`); //user Id
export const loadMoreTour = (skip) =>
  API.get(`/tours/loadMoreTour?skip=${skip}`);

export const getToursBySearch = (searchQuery) =>
  API.get(`/tours/search?searchQuery=${searchQuery}`);
export const getToursByTag = (tag) => API.get(`/tours/tag/${tag}`);
export const getRelatedTours = (tags) => API.post(`/tours/relatedTours`, tags);

export const likeTour = (_id) => API.patch(`/tours/like/${_id}`);
export const getAllTags = () => API.get("/tours/totalTags");
export const getUserProfile = (id) => API.get(`/profile/${id}`);
export const updateProfile = (id, userInfo) =>
  API.patch(`/profile/${id}`, userInfo);
