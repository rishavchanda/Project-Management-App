import axios from 'axios';
import jwt_decode from 'jwt-decode';
//https://vexa-server.herokuapp.com/api
//http://localhost:8800/api/
//https://dull-blue-dolphin-tutu.cyclic.app
//https://project-management-app-production-3d51.up.railway.app/
//http://localhost:8700/api/
const API = axios.create({ baseURL: 'http://localhost:8700/api/' });



//auth
export const signIn = async ({ email, password }) => await API.post('/auth/signin', { email, password });
export const signUp = async ({
    name,
    email,
    password,
}) => await API.post('/auth/signup', {
    name,
    email,
    password,
});
export const googleSignIn = async ({
    name,
    email,
    img,
}) => await API.post('/auth/google', {
    name,
    email,
    img,
},{ withCredentials: true });
export const findUserByEmail = async (email) => await API.get(`/auth/findbyemail?email=${email}`);
export const generateOtp = async (email,name,reason) => await API.get(`/auth/generateotp?email=${email}&name=${name}&reason=${reason}`);
export const verifyOtp = async (otp) => await API.get(`/auth/verifyotp?code=${otp}`);
export const resetPassword = async (email,password) => await API.put(`/auth/forgetpassword`,{email,password});

//user api
export const getUsers = async (token) => await API.get('/users/find', { headers: { "Authorization" : `Bearer ${token}` }},{
    withCredentials: true
    });
export const searchUsers = async (search,token) => await API.get(`users/search/${search}`,{ headers: { "Authorization" : `Bearer ${token}` }},{ withCredentials: true });
export const notifications = async (token) => await API.get('/users/notifications',{ headers: { "Authorization" : `Bearer ${token}` }},{ withCredentials: true });
export const getProjects = async (token) => await API.get(`/users/projects`, { headers: { "Authorization" : `Bearer ${token}` }},{ withCredentials: true });
export const userWorks = async (token) => await API.get('/users/works',{ headers: { "Authorization" : `Bearer ${token}` }},{ withCredentials: true });
export const userTasks = async (token) => await API.get('/users/tasks',{ headers: { "Authorization" : `Bearer ${token}` }},{ withCredentials: true });

//projects api
export const createProject = async (project,token) => await API.post('project/', project,{ headers: { "Authorization" : `Bearer ${token}` }},{ withCredentials: true });
export const getProjectDetails = async (id,token) => await API.get(`/project/${id}`,{ headers: { "Authorization" : `Bearer ${token}` }},{ withCredentials: true });
export const inviteProjectMembers = async (id, members,token) => await API.post(`/project/invite/${id}`, members,{ headers: { "Authorization" : `Bearer ${token}` }},{ withCredentials: true });
export const addWorks = async (id, works,token) => await API.post(`/project/works/${id}`, works,{ headers: { "Authorization" : `Bearer ${token}` }},{ withCredentials: true });
export const getWorks = async (id,token) => await API.get(`/project/works/${id}`,{ headers: { "Authorization" : `Bearer ${token}` }},{ withCredentials: true });


//teams api
export const createTeam = async (team,token) => await API.post('team/', team,{ headers: { "Authorization" : `Bearer ${token}` }},{ withCredentials: true });
export const getTeams = async (id,token) => await API.get(`/team/${id}`,{ headers: { "Authorization" : `Bearer ${token}` }},{ withCredentials: true });
export const inviteTeamMembers = async (id, members,token) => await API.post(`/team/invite/${id}`, members,{ headers: { "Authorization" : `Bearer ${token}` }},{ withCredentials: true });
export const addTeamProject = async (id, project,token) => await API.post(`/team/addProject/${id}`, project,{ headers: { "Authorization" : `Bearer ${token}` }},{ withCredentials: true });

