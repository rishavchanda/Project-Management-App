import React from 'react'
import styled from 'styled-components'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Footer from './components/Footer'
import Features from './components/Features'
import Testimonials from './components/Testimonials'
import Team from './components/Team'
import Benefits from './components/Benifits'
import About from './components/About'
import SignUp from '../../components/SignUp'
import SignIn from '../../components/SignIn'
import Faq from './components/Faq'

const Body = styled.div`
    background-color: ${({ theme }) => theme.bg};
    display: flex;
    justify-content: center;
    overflow-x: hidden;
`

const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
      padding: 0px 0px !important;
`
const Content = styled.div`
    width: 100%;
    height: 100%;
    background-color: ${({ theme }) => theme.card};
`

const Home = () => {
    const [SignInOpen, setSignInOpen] = React.useState(false);
    const [SignUpOpen, setSignUpOpen] = React.useState(false);

    return (
        <Body>
            <Container>
                <Navbar setSignInOpen={setSignInOpen} />
                <Hero setSignInOpen={setSignInOpen} />
                <Content>
                    <Features/>
                    {/* <Testimonials/> */}
                    <Benefits/>
                    {/* <Faq/> */}
                    <Team/>
                    <About/>
                </Content>
                <Footer />
                {SignUpOpen && (
                    <SignUp setSignUpOpen={setSignUpOpen} setSignInOpen={setSignInOpen} />
                )}
                {SignInOpen && (
                    <SignIn setSignInOpen={setSignInOpen} setSignUpOpen={setSignUpOpen} />
                )}
            </Container>
        </Body>
    )
}

export default Home