import { CloseRounded, SearchOutlined, SendRounded } from "@mui/icons-material";
import { Modal } from "@mui/material";
import React from "react";
import styled from "styled-components";
import { Avatar } from "@mui/material";
import { useSelector } from "react-redux";
import { inviteTeamMembers, inviteProjectMembers, searchUsers } from "../api/index";
import { openSnackbar } from "../redux/snackbarSlice";
import { useDispatch } from "react-redux";

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
  width: 300px;
  height: min-content;
  border-radius: 16px;
  background-color: ${({ theme }) => theme.bgLighter};
  color: ${({ theme }) => theme.text};
  padding: 10px;
  display: flex;
  margin-top: 80px;
  flex-direction: column;
  position: relative;
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
  gap: 12px;
  justify-content: space-between;
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
  color: ${({ theme }) => theme.textSoft};
`;

const EmailId = styled.div`
  font-size: 10px;
  font-weight: 400;
  color: ${({ theme }) => theme.textSoft + "99"};
`;

const InviteButton = styled.button`
  padding: 4px 8px;
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
  const { currentUser } = useSelector((state) => state.user);
  const token = localStorage.getItem("token");

  const handleSearch = async (e) => {
    setSearch(e.target.value);
    searchUsers(search,token)
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleInvite = async (user) => {
    const User = {
      id: user._id,
      name: user.name,
      email: user.email
    };
    console.log(User);
    if(teamInvite){
    inviteTeamMembers(id, User,token)
      .then((res) => {
        console.log(res);
        dispatch(openSnackbar({ message: `Invitation sent to ${user.name}`, type: "success" }));
      })
      .catch((err) => {
        console.log(err);
      });
    }else{
      console.log("project");
      inviteProjectMembers(id, User,token)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
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
          <UsersList>
            {users.map((user) => (
              <MemberCard>
                <UserData>
                  <Avatar sx={{ width: "34px", height: "34px" }} src={user.img}>
                    {user.name.charAt(0)}
                  </Avatar>
                  <Details>
                    <Name>{user.name}</Name>
                    <EmailId>{user.email}</EmailId>
                  </Details>
                </UserData>
                <InviteButton onClick={() => handleInvite(user)}>
                  <SendRounded sx={{ fontSize: "13px" }} />
                  Invite
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
