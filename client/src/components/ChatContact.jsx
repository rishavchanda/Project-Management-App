import { Search } from '@mui/icons-material'
import { Avatar } from '@mui/material'
import React from 'react'
import styled from 'styled-components'

const Continer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    background-color:  ${({ theme }) => theme.card};
`

const TopBar = styled.div`
height: 70px;
border-bottom: 1px solid ${({ theme }) => theme.soft};
display: flex;
align-items: center;
padding: 0 16px;
@media (max-width: 800px) {
    height: 60px;
}
`
const Contacts = styled.div`
    flex: 1;
    overflow-y: scroll;
    background-color: ${({ theme }) => theme.contact_background};
    @media (max-width: 800px) {
        padding: 20px 0;
    }
    border-bottom-left-radius: 10px;
`


const Profile = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 16px;
    gap: 4px;
`
const Name = styled.span`
    font-weight: 500;
    font-size: 16px;
    color: ${({ theme }) => theme.text};
`

const SearchBar = styled.div`
    display: flex;
    align-items: center;
    padding: 0 16px;
    height: 56px;
    border-bottom: 1px solid ${({ theme }) => theme.soft};
    color: ${({ theme }) => theme.soft2};
    @media (max-width: 800px) {
        height: 46px;
    }
`
const SearchInput = styled.input`
    border: none;
    outline: none;
    background-color: transparent;
    font-size: 16px;
    color: ${({ theme }) => theme.text};
    margin-left: 16px;
    flex: 1;
    &::placeholder {
        color: ${({ theme }) => theme.soft2};
    }

`

const ContactCard = styled.div`
    display: flex;
    align-items: center;
    padding: 14px 12px;
    cursor: pointer;
    border-bottom: 1px solid ${({ theme }) => theme.soft};
    &:hover {
        background-color: ${({ theme }) => theme.soft};
    }
`

const Message = styled.span`
    font-size: 14px;
    color: ${({ theme }) => theme.soft2};
`
const Time = styled.span`   
    font-size: 12px;
    color: ${({ theme }) => theme.soft2};
    margin-left: auto;
`


const ChatContact = ({ showChat, setShowChat }) => {
    return (
        <Continer>
            <TopBar>
                <Avatar sx={{ width: "46px", height: '46px' }} />
                <Profile>
                    <Name><b>Messaging</b></Name>
                </Profile>
            </TopBar>
            <SearchBar>
                <Search />
                <SearchInput placeholder="Search messages" />
            </SearchBar>
            <Contacts>
                <ContactCard onClick={() => setShowChat(true)}>
                    <Avatar sx={{ width: "46px", height: '46px' }} />
                    <Profile>
                        <Name>John Doe</Name>
                        <Message>Test message this is</Message>
                    </Profile>
                    <Time>12:21 Pm</Time>
                </ContactCard>
                <ContactCard>
                    <Avatar sx={{ width: "46px", height: '46px' }} />
                    <Profile>
                        <Name>John Doe</Name>
                        <Message>Test message this is</Message>
                    </Profile>
                    <Time>12:21 Pm</Time>
                </ContactCard>
                <ContactCard>
                    <Avatar sx={{ width: "46px", height: '46px' }} />
                    <Profile>
                        <Name>John Doe</Name>
                        <Message>Test message this is</Message>
                    </Profile>
                    <Time>12:21 Pm</Time>
                </ContactCard>
                <ContactCard>
                    <Avatar sx={{ width: "46px", height: '46px' }} />
                    <Profile>
                        <Name>John Doe</Name>
                        <Message>Test message this is</Message>
                    </Profile>
                    <Time>12:21 Pm</Time>
                </ContactCard>
                <ContactCard>
                    <Avatar sx={{ width: "46px", height: '46px' }} />
                    <Profile>
                        <Name>John Doe</Name>
                        <Message>Test message this is</Message>
                    </Profile>
                    <Time>12:21 Pm</Time>
                </ContactCard>
                <ContactCard>
                    <Avatar sx={{ width: "46px", height: '46px' }} />
                    <Profile>
                        <Name>John Doe</Name>
                        <Message>Test message this is</Message>
                    </Profile>
                    <Time>12:21 Pm</Time>
                </ContactCard>
                <ContactCard>
                    <Avatar sx={{ width: "46px", height: '46px' }} />
                    <Profile>
                        <Name>John Doe</Name>
                        <Message>Test message this is</Message>
                    </Profile>
                    <Time>12:21 Pm</Time>
                </ContactCard>
                <ContactCard>
                    <Avatar sx={{ width: "46px", height: '46px' }} />
                    <Profile>
                        <Name>John Doe</Name>
                        <Message>Test message this is</Message>
                    </Profile>
                    <Time>12:21 Pm</Time>
                </ContactCard>
                <ContactCard>
                    <Avatar sx={{ width: "46px", height: '46px' }} />
                    <Profile>
                        <Name>John Doe</Name>
                        <Message>Test message this is</Message>
                    </Profile>
                    <Time>12:21 Pm</Time>
                </ContactCard>
            </Contacts>
        </Continer>
    )
}

export default ChatContact