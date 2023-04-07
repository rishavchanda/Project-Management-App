import { CloseRounded, SearchOutlined, SendRounded } from "@mui/icons-material";
import { Modal } from "@mui/material";
import React, { useState } from "react";
import styled from "styled-components";
import { Avatar } from "@mui/material";
import { useSelector } from "react-redux";
import { inviteTeamMembers, inviteProjectMembers, searchUsers } from "../api/index";
import { openSnackbar } from "../redux/snackbarSlice";
import { useDispatch } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #000000a7;
  display: flex;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 430px;
  height: min-content;
  border-radius: 16px;
  background-color: ${({ theme }) => theme.bgLighter};
  color: ${({ theme }) => theme.text};
  padding: 10px;
  display: flex;
  margin-top: 80px;
  flex-direction: column;
  position: relative;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Title = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
  margin: 12px;
`;

const Search = styled.div`
  margin: 6px 6px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 12px;
  color: ${({ theme }) => theme.textSoft};
  background-color: ${({ theme }) => theme.bgDark};
`;

const Input = styled.input`
  width: 100%;
  border: none;
  font-size: 14px;
  padding: 10px 20px;
  border-radius: 100px;
  background-color: transparent;
  outline: none;
  color: ${({ theme }) => theme.textSoft};
`;

const UsersList = styled.div`
  padding: 18px 8px;
  display: flex;
  margin-bottom: 12px;
  flex-direction: column;
  gap: 12px;
  border-radius: 12px;
  color: ${({ theme }) => theme.textSoft};
`;

const MemberCard = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  justify-content: space-between;
  @media (max-width: 768px) {
    gap: 6px;
  }
`;
const UserData = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Details = styled.div`
  gap: 4px;
`;

const Name = styled.div`
  font-size: 13px;
  font-weight: 500;
  max-width: 100px;
  word-wrap: break-word;
  color: ${({ theme }) => theme.textSoft};
`;

const EmailId = styled.div`
  font-size: 10px;
  font-weight: 400;
  max-width: 100px;
  word-wrap: break-word;
  color: ${({ theme }) => theme.textSoft + "99"};
`;

const Flex = styled.div`
display: flex;
flex-direction: row;
gap: 2px;
@media (max-width: 768px) {
  display: flex;
  flex-direction: column;
  align-items: center;
}
`;

const Access = styled.div`
padding: 6px 10px;
border-radius: 12px;
display: flex;
align-items: center;
justify-content: center;
background-color: ${({ theme }) => theme.bgDark};
`;

const Select = styled.select`
  border: none;
  font-size: 12px;
  background-color: transparent;
  outline: none;
  color: ${({ theme }) => theme.text};
  background-color: ${({ theme }) => theme.bgDark};
`;

const Role = styled.div`
  background-color: ${({ theme }) => theme.bgDark};
  border-radius: 12px;
`;

const InviteButton = styled.button`
  padding: 6px 8px;
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.primary};
  border-radius: 1px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 11px;
  border-radius: 10px;
  transition: all 0.3s ease;
  &:hover {
    background-color: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.text};
  }
`;

const InviteMembers = ({ setInvitePopup, id, teamInvite }) => {
  const [search, setSearch] = React.useState("");
  const [users, setUsers] = React.useState([]);
  const [message, setMessage] = React.useState("");
  const { currentUser } = useSelector((state) => state.user);
  const token = localStorage.getItem("token");

  const [role, setRole] = React.useState("Member");
  const [access, setAccess] = React.useState("View Only");
  const [Loading, setLoading] = React.useState(false);

  const handleSearch = async (e) => {
    setSearch(e.target.value);
    searchUsers(e.target.value, token)
      .then((res) => {
        if (res.status === 200) {
          setUsers(res.data);
          setMessage("");
        }
        else {
          setUsers([]);
          setMessage(res.status);
        }
      })
      .catch((err) => {
        setUsers([]);
        setMessage(err.message);
      });
  };

  const handleInvite = async (user) => {
    setLoading(true);
    const User = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: role,
      access: access,
    };
    console.log(User);
    if (teamInvite) {
      inviteTeamMembers(id, User, token)
        .then((res) => {
          console.log(res);
          if (res.status === 200)
            dispatch(openSnackbar({ message: `Invitation sent to ${user.name}`, type: "success" }));
          setLoading(false);
        })
        .catch((err) => {
          dispatch(openSnackbar({ message: err.message, type: "error" }));
          setLoading(false);
          console.log(err);
        });
    } else {
      console.log("project");
      inviteProjectMembers(id, User, token)
        .then((res) => {
          if (res.status === 200)
            dispatch(openSnackbar({ message: `Invitation sent to ${user.name}`, type: "success" }));
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          dispatch(openSnackbar({ message: err.message, type: "error" }));
          setLoading(false);
        });
    }
  };

  const dispatch = useDispatch();

  return (
    <Modal open={true} onClose={() => setInvitePopup(false)}>
      <Container>
        <Wrapper>
          <CloseRounded
            sx={{ fontSize: "22px" }}
            style={{
              position: "absolute",
              top: "20px",
              right: "20px",
              cursor: "pointer",
            }}
            onClick={() => setInvitePopup(false)}
          />
          <Title>Invite Members</Title>
          <Search>
            <Input
              placeholder="Search by email..."
              onChange={(e) => handleSearch(e)}
            />
            <SearchOutlined
              sx={{ fontSize: "20px" }}
              style={{ marginRight: "12px", marginLeft: "12px" }}
            />
          </Search>
          {message && <div style={{ color: "red" }}>{message}</div>}
          <UsersList>
            {users.map((user) => (
              <MemberCard key={user._id}>
                <UserData>
                  <Avatar sx={{ width: "34px", height: "34px" }} src={user.img}>
                    {user.name[0]}
                  </Avatar>
                  <Details>
                    <Name>{user.name}</Name>
                    <EmailId>{user.email}</EmailId>
                  </Details>
                </UserData>
                <Flex>
                  <Access>
                    <Select name="Role" onChange={(e) => setAccess(e.target.value)}>
                      <option value="" selected disabled hidden>Access</option>
                      <option value="Admin">Admin</option>
                      <option value="Member">Member</option>
                      <option value="Editor">Editor</option>
                      <option value="View Only">View Only</option>
                    </Select>
                  </Access>
                  <Role>
                    <Input style={{ width: '70px', fontSize: '12px', padding: '8px 10px' }} type="text" placeholder="Role" onChange={(e) => setRole(e.target.value)} />
                  </Role>

                </Flex>
                <InviteButton onClick={() => handleInvite(user)}>
                  {Loading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : (<>
                    <SendRounded sx={{ fontSize: "13px" }} />
                    Invite</>
                  )}
                </InviteButton>
              </MemberCard>
            ))}
          </UsersList>

        </Wrapper>
      </Container>
    </Modal>
  );
};

export default InviteMembers;
