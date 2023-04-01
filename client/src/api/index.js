import axios from 'axios';
import jwt_decode from 'jwt-decode';
//https://vexa-server.herokuapp.com/api
//http://localhost:8800/api/
//https://dull-blue-dolphin-tutu.cyclic.app
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
    password,
}) => await API.post('/auth/google', {
    name,
    email,
    password,
},{ withCredentials: true });

export const generateOtp = async () => await API.get('/auth/generateotp');
export const verifyOtp = async (otp) => await API.get(`/auth/verifyotp?code=${otp}`);

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

