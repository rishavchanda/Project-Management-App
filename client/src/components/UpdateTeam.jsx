import { IconButton, Modal, Snackbar } from "@mui/material";
import React, { useState, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import styled from "styled-components";
import {
    Block,
    CloseRounded,
    EmailRounded,
    Visibility,
    VisibilityOff,
    PasswordRounded,
    TroubleshootRounded,
    SendRounded,
    SearchOutlined,
} from "@mui/icons-material";
import { tools } from "../data/data";
import { Avatar } from "@mui/material";
import { useSelector } from "react-redux";
import {
    inviteProjectMembers,
    inviteTeamMembers,
    searchUsers,
    createTeam,
    updateTeamMembers,
    removeTeamMembers,
    updateTeam
} from "../api/index";
import { openSnackbar } from "../redux/snackbarSlice";
import { useDispatch } from "react-redux";
import ImageSelector from "./ImageSelector";

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
  width: 100%;
  height: min-content;
  margin: 2%;
  max-width: 600px;
  border-radius: 16px;
  background-color: ${({ theme }) => theme.bgLighter};
  color: ${({ theme }) => theme.text};
  padding: 10px;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const Title = styled.div`
  font-size: 22px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
  margin: 12px 20px;
`;

const Desc = styled.textarea`
  width: 100%;
  border: none;
  font-size: 14px;
  border-radius: 3px;
  background-color: transparent;
  outline: none;
  padding: 10px 0px;
  color: ${({ theme }) => theme.textSoft};
`;

const Label = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.textSoft};
  margin: 12px 20px 0px 20px;
`;

const OutlinedBox = styled.div`
  min-height: 48px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.soft2};
  color: ${({ theme }) => theme.soft2};
  ${({ googleButton, theme }) =>
        googleButton &&
        `
    user-select: none; 
  gap: 16px;`}
  ${({ button, theme }) =>
        button &&
        `
    user-select: none; 
  border: none;
    font-weight: 600;
    font-size: 16px;
    background: ${theme.soft};
    color:'${theme.soft2}';`}
    ${({ activeButton, theme }) =>
        activeButton &&
        `
    user-select: none; 
  border: none;
    background: ${theme.primary};
    color: white;`}
  margin: 3px 20px;
  font-weight: 600;
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px 14px;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 0px;
  margin: 12px 20px;
  align-items: center;
  justify-content: space-between;
`;

const TextInput = styled.input`
  width: 100%;
  border: none;
  font-size: 14px;
  border-radius: 3px;
  background-color: transparent;
  outline: none;
  color: ${({ theme }) => theme.textSoft};
`;

const ToolsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 12px 18px;
`;

const Icon = styled.img`
  width: 16px;
  margin: 0px 6px 0px 0px;
`;

const AddMember = styled.div`
  margin: 22px;
  padding: 12px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.bgDark + "98"};
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
font-size: 12px;
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
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const InviteButton = styled.button`
  padding: 6px 14px;
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.primary};
  border-radius: 1px;
  font-weight: 600;
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

const UpdateTeam = ({ openUpdate, setOpenUpdate }) => {
    const [Loading, setLoading] = useState(false);
    const [disabled, setDisabled] = useState(true);
    const [backDisabled, setBackDisabled] = useState(false);

    const [showAddTeam, setShowAddTeam] = useState(true);
    const [showTools, setShowTools] = useState(false);
    const [showAddMember, setShowAddMember] = useState(false);
    const token = localStorage.getItem("token");

    const goToAddTeam = () => {
        setShowAddTeam(true);
        setShowTools(false);
        setShowAddMember(false);
    };

    const goToAddTools = () => {
        setShowAddTeam(false);
        setShowAddMember(false);
        setShowTools(true);
    };

    const goToAddMember = () => {
        setShowAddTeam(false);
        setShowTools(false);
        setShowAddMember(true);
    };

    useEffect(() => {

        if (openUpdate.type === "all") {
            goToAddTeam();
        } else if (openUpdate.type === "tool") {
            goToAddTools();
        } else if (openUpdate.type === "member") {
            goToAddMember();
        }

    }, [openUpdate]);

    //add member part

    const [search, setSearch] = React.useState("");
    const [users, setUsers] = React.useState([]);
    const { currentUser } = useSelector((state) => state.user);
    const [role, setRole] = useState("");
    const [access, setAccess] = useState("");
    const [selectedUsers, setSelectedUsers] = React.useState([]);
    const [inputs, setInputs] = useState({ id: openUpdate.data._id, img: openUpdate.data.img, name: openUpdate.data.name, desc: openUpdate.data.desc, tags: openUpdate.data.tags, tools: openUpdate.data.tools, members: openUpdate.data.members });

    const handleSearch = async (e) => {
        setSearch(e.target.value);
        searchUsers(e.target.value, token)
            .then((res) => {
                if (res.status === 200) {
                    setUsers(res.data);
                }
                else {
                    setUsers([]);
                }
            })
            .catch((err) => {
                setUsers([]);
            });
    };

    const handleSelect = (user) => {
        const User = {
            id: user._id,
            name: user.name,
            email: user.email,
        };
        if (selectedUsers.find((u) => u.id === User.id)) {
        } else {
            setSelectedUsers([...selectedUsers, {
                id: user._id,
                name: user.name,
                email: user.email,
                role: role,
                access: access,
            }]);
            setUsers([]);
            setSearch("");
        }
    };

    //remove members from selected users
    const handleRemove = (user) => {
        setSelectedUsers(selectedUsers.filter((u) => u.id !== user.id));
    };

    const handleInviteAll = (id) => {
        let teamInvite = true;
        if (teamInvite) {
            selectedUsers.map((user) => {
                inviteTeamMembers(id, user, token)
                    .then((res) => {
                        console.log(res);
                        dispatch(
                            openSnackbar({
                                message: `Invitation sent to ${user.name}`,
                                type: "success",
                            })
                        );
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            });
        } else {
            selectedUsers.map((user) => {
                inviteTeamMembers(id, user, token)
                    .then((res) => {
                        console.log(res); dispatch(
                            openSnackbar({
                                message: `Invitation sent to ${user.name}`,
                                type: "success",
                            })
                        );
                    })
                    .catch((err) => {
                        console.log(err); dispatch(
                            openSnackbar({
                                message: `Invitation cant be sent to ${user.name}`,
                                type: "error",
                            })
                        );
                    });
            });
        }
    };

    const handleChange = (e) => {
        setInputs((prev) => {
            if (e.target.name === "tags") {
                return { ...prev, [e.target.name]: e.target.value.split(",") };
            } else {
                return { ...prev, [e.target.name]: e.target.value };
            }
        });
    };

    //add tools part

    const [TeamTools, setTeamTools] = useState([
        { name: "", icon: "", link: "" },
        { name: "", icon: "", link: "" },
        { name: "", icon: "", link: "" },
        { name: "", icon: "", link: "" },
        { name: "", icon: "", link: "" },
        { name: "", icon: "", link: "" },
    ]);

    //from the tools array in input fields find the name and check it with tools array and and at that index add the link for that tool
    useEffect(() => {
        tools.map((tool, index) => {
            inputs.tools.map((inputTool) => {
                if (tool.name === inputTool.name) {
                    setTeamTools((prev) => {
                        return prev.map((item, i) => {
                            if (i === index) {
                                return { ...item, link: inputTool.link, icon: inputTool.icon, name: inputTool.name };
                            }
                            return item;
                        });
                    });
                }
            });
        });
    }, []);

    const handleToolschange = (index, event, icon) => {
        let data = [...TeamTools];
        //add it to input fields
        data[index].name = event.target.name;
        data[index].icon = icon;
        data[index].link = event.target.value;
        setTeamTools(data);
    };

    const updateTeamData = () => {
        setLoading(true);
        setDisabled(true);
        setBackDisabled(true);
        //remove the empty link objects of Team tools
        const tools = TeamTools.filter((tool) => tool.link !== "");
        const Team = {
            ...inputs,
            tools: tools,
        };
        //remove the members from project
        delete Team.members;
        delete Team.id;

        updateTeam(inputs.id, Team, token)
            .then((res) => {
                // get the id from res and invite members function call
                //handleInviteAll(res.data._id);
                setLoading(false);
                setOpenUpdate({ ...openUpdate, state: false });
                dispatch(
                    openSnackbar({
                        message: "Team updated successfully",
                        type: "success",
                    })
                );
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
                setDisabled(false);
                setBackDisabled(false);
                dispatch(
                    openSnackbar({
                        message: err.message,
                        type: "error",
                    })
                );
            });
    };

    useEffect(() => {
        if (inputs.name === "" || inputs.desc === "") {
            setDisabled(true)
        } else {
            setDisabled(false)
        }
    }, [inputs])


    const updateteamMembers = (member, id) => {

        //SET THE MEMBERS ID TO ONLY ID STRING REMOVE THE OTHER PROPERTIES

        var updatedMember = {
            id: member.id._id,
            role: member.role,
            access: member.access,
        }
        console.log(updatedMember)
        setLoading(true);
        updateTeamMembers(inputs.id, updatedMember, token)
            .then((res) => {
                setLoading(false);
                setOpenUpdate({ ...openUpdate, state: false });
                dispatch(
                    openSnackbar({
                        message: "Team updated successfully",
                        type: "success",
                    })
                );
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
                setDisabled(false);
                setBackDisabled(false);
                dispatch(
                    openSnackbar({
                        message: err.message,
                        type: "error",
                    })
                );
            });

    }
    const removeteamMembers = (member, id) => {
        var updatedMember = {
            id: member.id._id,
            role: member.role,
            access: member.access,
        }
        setLoading(true);
        removeTeamMembers(inputs.id, updatedMember, token)
            .then((res) => {
                setLoading(false);
                setOpenUpdate({ ...openUpdate, state: false });
                dispatch(
                    openSnackbar({
                        message: "Team updated successfully",
                        type: "success",
                    })
                );
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
                setDisabled(false);
                setBackDisabled(false);
                dispatch(
                    openSnackbar({
                        message: err.message,
                        type: "error",
                    })
                );
            });
    }


    const dispatch = useDispatch();

    return (
        <Modal open={true} onClose={() => setOpenUpdate({ ...openUpdate, state: false })}>
            <Container>
                <Wrapper>
                    <IconButton
                        style={{
                            position: "absolute",
                            top: "18px",
                            right: "30px",
                            cursor: "pointer",
                            color: "inherit",
                        }}
                        onClick={() => setOpenUpdate({ ...openUpdate, state: false })}
                    >
                        <CloseRounded style={{ color: "inherit" }} />
                    </IconButton>
                    <Title>Update Team</Title>

                    {showAddTeam && (
                        <>
                            <Label>Team Details :</Label>
                            <ImageSelector inputs={inputs} setInputs={setInputs} style={{ marginTop: "12px" }} />
                            <OutlinedBox style={{ marginTop: "12px" }}>
                                <TextInput
                                    placeholder="Team Name (Required)*"
                                    type="text"
                                    name="name"
                                    value={inputs.name}
                                    onChange={handleChange}
                                />
                            </OutlinedBox>
                            <OutlinedBox style={{ marginTop: "6px" }}>
                                <Desc
                                    placeholder="Description (Required)* "
                                    name="desc"
                                    rows={5}
                                    value={inputs.desc}
                                    onChange={handleChange}
                                />
                            </OutlinedBox>
                            <OutlinedBox style={{ marginTop: "6px" }}>
                                <Desc
                                    placeholder="Tags: seperate by , eg- Mongo Db , React JS .."
                                    name="tags"
                                    rows={4}
                                    value={inputs.tags}
                                    onChange={handleChange}
                                />
                            </OutlinedBox>

                            <OutlinedBox
                                button={true}
                                activeButton={!disabled}
                                style={{ marginTop: "22px", marginBottom: "18px" }}
                                onClick={() => { !disabled && goToAddTools() }}
                            >
                                Next
                            </OutlinedBox>
                        </>
                    )}

                    {showTools && (
                        <>
                            <Label>Tools :</Label>
                            <ToolsContainer>
                                {tools.map((tool, index) => (
                                    <OutlinedBox style={{ marginTop: "8px" }} key={index}>
                                        <Icon src={tool.icon} />
                                        <TextInput
                                            name={tool.name}
                                            placeholder={`${tool.name} Link`}
                                            type="text"
                                            value={TeamTools[index].link}
                                            onChange={(event) =>
                                                handleToolschange(index, event, tool.icon)
                                            }
                                        />
                                    </OutlinedBox>
                                ))}
                            </ToolsContainer>

                            <ButtonContainer>
                                {openUpdate.type === "all" && (
                                <OutlinedBox
                                    button={true}
                                    activeButton={false}
                                    style={{ marginTop: "18px", width: "100%" }}
                                    onClick={() => { !backDisabled && goToAddTeam() }}
                                >
                                    Back
                                </OutlinedBox>
                                )}
                                <OutlinedBox
                                    button={true}
                                    activeButton={!disabled}
                                    style={{ marginTop: "18px", width: "100%" }}
                                    onClick={() => {
                                        if (openUpdate.type === "tool") {
                                            updateTeamData();
                                        } else {
                                            goToAddMember();
                                        }
                                    }}
                                >
                                    {Loading ? (
                                        <CircularProgress color="inherit" size={20} />
                                    ) : (<>
                                        {openUpdate.type === "all" ? "Next" : "Update"}
                                    </>)}
                                </OutlinedBox>
                            </ButtonContainer>
                        </>
                    )}

                    {showAddMember && (
                        <>
                            <Label>Update Members :</Label>

                            <AddMember>
                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '12px', marginTop: '6px' }}>Previous Members</div>
                                <UsersList>
                                    {inputs.members.map((user) => (
                                        <MemberCard>
                                            <UserData>
                                                <Avatar
                                                    sx={{ width: "34px", height: "34px" }}
                                                    src={user.id.img}
                                                >
                                                    {user.id.name.charAt(0)}
                                                </Avatar>
                                                <Details>
                                                    <Name>{user.id.name}</Name>
                                                    <EmailId>{user.id.email}</EmailId>
                                                </Details>
                                            </UserData>
                                            <Flex>
                                                <Access>
                                                    <Select name="Role" onChange={(e) => setInputs({
                                                        ...inputs,
                                                        members: inputs.members.map((member) => {
                                                            if (member.id.email === user.id.email) {
                                                                return {
                                                                    ...member,
                                                                    access: e.target.value,
                                                                };
                                                            } else {
                                                                return member;
                                                            }
                                                        }
                                                        )
                                                    })}>
                                                        <option value={user.access} selected disabled hidden>{user.access}</option>
                                                        <option value="Owner">Owner</option>
                                                        <option value="Admin">Admin</option>
                                                        <option value="Member">Member</option>
                                                        <option value="Editor">Editor</option>
                                                        <option value="View Only">View Only</option>
                                                    </Select>
                                                </Access>
                                                <Role>
                                                    <Input style={{ width: '70px', fontSize: '12px', padding: '8px 10px' }} type="text" placeholder="Role" value={user.role} onChange={(e) => setInputs(
                                                        {
                                                            ...inputs,
                                                            members: inputs.members.map((member) => {
                                                                if (member.id.email === user.id.email) {
                                                                    return {
                                                                        ...member,
                                                                        role: e.target.value,
                                                                    };
                                                                } else {
                                                                    return member;
                                                                }
                                                            }
                                                            )
                                                        }
                                                    )} />
                                                </Role>

                                            </Flex>
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                                                <InviteButton onClick={() => updateteamMembers(user, inputs.id)}>
                                                    {Loading ? (
                                                        <CircularProgress color="inherit" size={20} />
                                                    ) : (
                                                        "Update")}
                                                </InviteButton>
                                                <InviteButton onClick={() => removeteamMembers(user, inputs.id)}>
                                                    {Loading ? (
                                                        <CircularProgress color="inherit" size={20} />
                                                    ) : (
                                                        "Remove")}
                                                </InviteButton>
                                            </div>
                                        </MemberCard>
                                    ))}
                                </UsersList>
                            </AddMember>
                            {openUpdate.type === "all" && (
                            <ButtonContainer>
                                <OutlinedBox
                                    button={true}
                                    activeButton={false}
                                    style={{ marginTop: "18px", width: "100%" }}
                                    onClick={() => { !backDisabled && goToAddTools() }}
                                >
                                    Back
                                </OutlinedBox>
                                <OutlinedBox
                                    button={true}
                                    activeButton={!disabled}
                                    style={{ marginTop: "18px", width: "100%" }}
                                    onClick={() => { !disabled && updateTeamData() }}
                                >
                                    {Loading ? (
                                        <CircularProgress color="inherit" size={20} />
                                    ) : (
                                        "Update Team"
                                    )}
                                </OutlinedBox>
                            </ButtonContainer>
                            )}
                        </>
                    )}
                </Wrapper>
            </Container>
        </Modal>
    );
};

export default UpdateTeam;
