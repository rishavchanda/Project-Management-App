import logo from './logo.svg';
import { ThemeProvider } from "styled-components";
import { useState } from "react";
import { darkTheme, lightTheme } from "./utils/Theme";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom"
import Menu from './components/Menu';
import Navbar from './components/Navbar';
import styled from 'styled-components';
import Dashboard from './pages/Dashboard';
import Works from './pages/Works';
import Projects from './pages/Projects';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import ProjectDetails from './pages/ProjectDetails';
import Teams from './pages/Teams';
import ToastMessage from './components/ToastMessage';
import Community from './pages/Community';
import { useSelector } from "react-redux";
import AddNewTeam from './components/AddNewTeam';
import { useEffect } from 'react';
import { getUsers } from './api';
import { useDispatch } from 'react-redux';
import Home from './pages/Home/Home';
import Chats from './pages/Chats';
import ProjectInvite from './components/ProjectInvite';
import TeamInvite from './components/TeamInvite';
import AddNewProject from './components/AddNewProject';

const Container = styled.div`
height: 100vh;
  display: flex; 
  background-color: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text};
  overflow-x: hidden;
`;

const Main = styled.div`
  flex: 7;
`;
const Wrapper = styled.div`
  padding: 0% 1%;
  overflow-y: scroll !important;
`;

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [menuOpen, setMenuOpen] = useState(true);
  const [newTeam, setNewTeam] = useState(false);
  const [newProject, setNewProject] = useState(false);
  const { open, message, severity } = useSelector((state) => state.snackbar);
  const [loading, setLoading] = useState(false);


  const { currentUser } = useSelector(state => state.user);


  //set the menuOpen state to false if the screen size is less than 768px
  useEffect(() => {
    const resize = () => {
      if (window.innerWidth < 1110) {
        setMenuOpen(false);
      } else {
        setMenuOpen(true);
      }
    }
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <DndProvider backend={HTML5Backend}>
      <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>

        <BrowserRouter>
          {currentUser ?
            <Container >
              {loading ? <div>Loading...</div> : <>
                {menuOpen && <Menu setMenuOpen={setMenuOpen} setDarkMode={setDarkMode} darkMode={darkMode} setNewTeam={setNewTeam} />}
                <Main>
                  <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
                  <Wrapper>
                    {newTeam && <AddNewTeam setNewTeam={setNewTeam} />}
                    {newProject && <AddNewProject setNewProject={setNewProject} />}
                    <Routes>
                      <Route >
                        <Route exact path="/" element={<Dashboard setNewTeam={setNewTeam} setNewProject={setNewProject}/>} />
                        <Route path="projects" element={<Projects newProject={newProject} setNewProject={setNewProject}/>} />
                        <Route path="teams">
                          <Route path=":id" element={<Teams />} />
                        </Route>
                        <Route path="team/invite">
                          <Route path=":code" element={<TeamInvite />} />
                        </Route>
                        <Route path="projects">
                          <Route path=":id" element={<ProjectDetails />} />
                        </Route>
                        <Route path="projects/invite">
                          <Route path=":code" element={<ProjectInvite />} />
                        </Route>

                        <Route path="works" element={<Works />} />
                        <Route path="community" element={<Community />} />
                        <Route path="chats" element={<Chats />} />
                        <Route path="*" element={<div>Not Found</div>} />
                      </Route>
                    </Routes>
                  </Wrapper>
                </Main>
              </>}
            </Container>
            : <ThemeProvider theme={darkTheme}
            >

              <Routes>
                <Route exact path="/">
                  <Route index element={
                    <Home />} />
                  <Route path="team/invite">
                    <Route path=":code" element={<TeamInvite />} />
                  </Route>
                  <Route path="projects/invite">
                    <Route path=":code" element={<ProjectInvite />} />
                  </Route>
                </Route>
              </Routes>
            </ThemeProvider>}
          {open && <ToastMessage open={open} message={message} severity={severity} />}

        </BrowserRouter>
      </ThemeProvider>
    </DndProvider>
  );
}

export default App;
