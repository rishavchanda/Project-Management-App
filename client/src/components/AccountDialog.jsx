import { Avatar, Popover } from "@mui/material";
import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { logout } from "../redux/userSlice";
import {useNavigate} from 'react-router-dom';

const Wrapper = styled.div`
  min-width: 200px;
  display: flex;
  flex-direction: column;
  position: relative;
  gap: 12px;
  padding: 6px 2px;
  background-color: ${({ theme }) => theme.card};
`;

const Account = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 16px 6px 16px;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 0px 16px 0px 0px;
`;

const Name = styled.div`
  font-size: 17px;
  font-weight: 600;
  color: ${({ theme }) => theme.textSoft};
`;

const Email = styled.div`
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.textSoft + "99"};
`;

const Hr = styled.hr`
  background-color: ${({ theme }) => theme.soft + "99"};
  border: none;
  width: 100%;
  height: 1px;
  margin: 0;
`;

const Logout = styled.div`
  padding: 0px 0px 12px 0px;
  display: flex;
  align-items: center;
  justify-content: center;;
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.textSoft};
  cursor: pointer;
`;

const OutlinedBox = styled.div`
  border-radius: 6px;
  padding: 4px 16px;
  border: 1px solid ${({ theme }) => theme.soft2+"99"};
  color: ${({ theme }) => theme.soft2+"99"};
  font-size: 12px;
  &:hover {
    background-color: ${({ theme }) => theme.soft2 + "33"};
    }
`;

const AccountDialog = ({ open, id, anchorEl, handleClose, currentUser }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const logoutUser = () => {
      dispatch(logout())
      navigate('/');
    }
  return (
    <Popover
      anchorReference="anchorPosition"
      open={open}
      onClose={handleClose}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      anchorPosition={{ top: 60, left: 1800 }}
    >
      <Wrapper>
        <Account>
          <Avatar
            sx={{ width: "50px", height: "50px" }}
            src={currentUser.img}
          >{currentUser.name.charAt(0)}</Avatar>
          <Details>
            <Name>{currentUser.name}</Name>
            <Email>{currentUser.email}</Email>
          </Details>
        </Account>
        <Hr />
        <Logout>
          <OutlinedBox onClick={logoutUser}>Logout</OutlinedBox>
        </Logout>
      </Wrapper>
    </Popover>
  );
};

export default AccountDialog;
