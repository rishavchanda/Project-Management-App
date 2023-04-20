import React, { useEffect } from 'react'
import ChatContainer from '../components/ChatContainer'
import ChatContact from '../components/ChatContact'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-color: ${({ theme }) => theme.bg};
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  height: 85vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 12px 0px;
  @media (max-width: 800px) {
      height: 82vh;
      border-radius: 0px;
      height: 87vh;
  }
`

const ChatsContact = styled.div`
margin: 12px 0px;
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 360px;
    height: 100%;
    background-color:  ${({ theme }) => theme.card};
    border-right: 1px solid ${({ theme }) => theme.soft};
    @media (max-width: 800px) {border-right: 1px solid ${({ theme }) => theme.soft};
    border-right: none;
    border-radius: 0px 0px 0px 0px;
    }
    border-radius: 10px 0px 0px 10px;
`

const ChatsContainer = styled.div`

margin: 12px 0px;
display: flex;
max-width: 800px;
width: 100%;
height: 100%;
flex-direction: column;
background-color:  ${({ theme }) => theme.card};
border-radius: 0px 10px 10px 0px;
`

const Chats = () => {
  //get the window size and hide the chat container for mobile and dislay it for desktop
  const [width, setWidth] = React.useState(window.innerWidth)
  const breakpoint = 768

  useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth)
    window.addEventListener("resize", handleWindowResize)
    return () => window.removeEventListener("resize", handleWindowResize)
  }, [])

  const [showChat, setShowChat] = React.useState(false)

  return (
    <Container>
      <Wrapper>
        {width < breakpoint ?
          (showChat ?
            <ChatContainer showChat={showChat} setShowChat={setShowChat} />
            :
            <ChatContact showChat={showChat} setShowChat={setShowChat} />)
          : (
            <>
              <ChatsContact>
                <ChatContact showChat={showChat} setShowChat={setShowChat} />
              </ChatsContact>
              <ChatsContainer>
                <ChatContainer showChat={showChat} setShowChat={setShowChat} />
              </ChatsContainer>
            </>
          )}
      </Wrapper>
    </Container>
  )
}

export default Chats