import axios from 'axios';
import jwt_decode from 'jwt-decode';
//https://vexa-server.herokuapp.com/api
//http://localhost:8800/api/
//https://dull-blue-dolphin-tutu.cyclic.app
const API = axios.create({ baseURL: 'http://localhost:8700/api/' });


/** To get username from Token */
const token = localStorage.getItem('token');
const config = {
    headers: { Authorization: `${token}` }
};
//auth
export const signIn = async ({ email, password }) => await API.post('/auth/signin', { email, password },config);
export const signUp = async ({
    name,
    email,
    password,
}) => await API.post('/auth/signup', {
    name,
    email,
    password,
},config,{ withCredentials: true });
export const googleSignIn = async ({
    name,
    email,
    password,
}) => await API.post('/auth/google', {
    name,
    email,
    password,
},config,{ withCredentials: true });

//user api
export const getUsers = async () => await API.get('/users/find', {
    withCredentials: true
    });
export const searchUsers = async (search) => await API.get(`users/search/${search}`,config,{ withCredentials: true });
export const notifications = async () => await API.get('/users/notifications',config,{ withCredentials: true });
export const getProjects = async () => await API.get(`/users/projects`, config,{ withCredentials: true });
export const userWorks = async () => await API.get('/users/works',config,{ withCredentials: true });
export const userTasks = async () => await API.get('/users/tasks',config,{ withCredentials: true });

//projects api
export const createProject = async (project) => await API.post('project/', project,config,{ withCredentials: true });
export const getProjectDetails = async (id) => await API.get(`/project/${id}`,config,{ withCredentials: true });
export const inviteProjectMembers = async (id, members) => await API.post(`/project/invite/${id}`, members,config,{ withCredentials: true });
export const addWorks = async (id, works) => await API.post(`/project/works/${id}`, works,config,{ withCredentials: true });
export const getWorks = async (id) => await API.get(`/project/works/${id}`,config,{ withCredentials: true });


//teams api
export const createTeam = async (team) => await API.post('team/', team,config,{ withCredentials: true });
export const getTeams = async (id) => await API.get(`/team/${id}`,config,{ withCredentials: true });
export const inviteTeamMembers = async (id, members) => await API.post(`/team/invite/${id}`, members,config,{ withCredentials: true });
export const addTeamProject = async (id, project) => await API.post(`/team/addProject/${id}`, project,config,{ withCredentials: true });

