import React, { useEffect } from "react";
import { Fragment, useState, useRef } from "react";
import styled from "styled-components";
import { CloseRounded } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { Avatar } from "@mui/material";
import { Modal } from "@mui/material";
import { addWorks } from "../api";
import CircularProgress from "@mui/material/CircularProgress";
import { useDispatch } from "react-redux";
import { openSnackbar } from "../redux/snackbarSlice";

const Container = styled.div`
  padding: 12px 14px;
  text-align: left;
  margin: 2px 0px;
  font-size: 16px;
  font-weight: 500;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.card};
  color: ${({ theme }) => theme.text};
  cursor: pointer;
  box-shadow: 0 0 16px 0 rgba(0, 0, 0, 0.09);
  &:hover {
    transition: all 0.6s ease-in-out;
    box-shadow: 0 0 18px 0 rgba(0, 0, 0, 0.5);
  }
`;

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.textSoft};
  flex: 7;
  line-height: 1.5;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* number of lines to show */
  line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const Desc = styled.div`
  font-size: 14px;
  font-weight: 400;
  color: ${({ theme }) => theme.soft2};
  margin-top: 4px;
  line-height: 1.5;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 5; /* number of lines to show */
  line-clamp: 5;
  -webkit-box-orient: vertical;
`;

const Task = styled.div`
  margin: 12px 0px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 2px 0px;
`;

const Members = styled.div`
  display: flex;
  flex: 1;
  justify-content: start;
  align-items: center;
  gap: 2px;
  flex-wrap: wrap;
`;
const MemberGroup = styled.div`
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.soft};
  padding: 4px 4px;
  gap: 1px;
  border-radius: 100px;
`;

const IcoButton = styled(IconButton)`
  color: ${({ theme }) => theme.textSoft} !important;
`;

const TextBtn = styled.div`
  flex: 0.6;
  font-size: 12px;
  font-weight: 500;
  color: #0094ea;
  &:hover {
    color: #0094ea99;
  }
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

const TextArea = styled.textarea`
  width: 100%;
  border: none;
  font-size: 14px;
  border-radius: 3px;
  background-color: transparent;
  outline: none;
  font-family: "Poppins", sans-serif;
  padding: 8px 0px;
  color: ${({ theme }) => theme.textSoft};
`;
const OutlinedBox = styled.div`
  min-height: 34px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.soft2};
  color: ${({ theme }) => theme.soft2};
  ${({ button, theme }) =>
    button &&
    `
    user-select: none; 
  border: none;
  font-weight: 600;
  height: 38px;
    background: ${theme.soft};
    color:'${theme.soft2}';`}
  ${({ activeButton, theme }) =>
    activeButton &&
    `
    user-select: none; 
  border: none;
  height: 38px;
    background: ${theme.primary};
    color: white;`}
  margin: 6px 0px;
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  padding: 0px 10px;
`;
const FlexDisplay = styled.div`
  display: flex;
  gap: 6px;
  align-items: center;
  justify-content: space-between;
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #000000a7;
  display: flex;
  justify-content: center;
`;

const Body = styled.div`
  width: 100%;
  height: min-content;
  margin: 2%;
  max-width: 300px;
  border-radius: 16px;
  background-color: ${({ theme }) => theme.bgLighter};
  color: ${({ theme }) => theme.text};
  padding: 10px;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const UsersList = styled.div`
  padding: 18px 8px;
  display: flex;
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

const AddWork = ({ ProjectMembers, ProjectId, setCreated }) => {
  const dispatch = useDispatch();
  //hooks for different steps of the work card
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [selectMember, setSelectMember] = useState(false);
  //the work card hook
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [tags, setTags] = useState("");
  const [taskIndex, setTaskIndex] = useState(0);

  const token = localStorage.getItem("token");

  //tasks
  const [task, setTask] = useState([
    {
      task: "",
      start_date: "",
      end_date: "",
      members: [],
    },
  ]);
  const handleTaskChange = (index, event) => {
    let data = [...task];
    data[index][event.target.name] = event.target.value;
    setTask(data);
  };

  const goToAddTask = () => {
    //check if all the fields are filled
    if (!title || !desc) {
      alert("Please fill all the fields");
      return;
    } else {
      setStep(step + 1);
    }
  };

  const addTasks = () => {
    let newfield = { task: "", start_date: "", end_date: "", members: [] };
    setTask([...task, newfield]);
  };

  const deleteTasks = (index) => {
    let data = [...task];
    data.splice(index, 1);
    setTask(data);
  };

  //task member
  const addMember = (index) => {
    setSelectMember(true);
    setTaskIndex(index);
  };

  const removeMember = (index, memberIndex) => {
    let data = [...task];
    data[index].members.splice(memberIndex, 1);
    setTask(data);
  };

  const AddToMember = (member, index) => {
    //if member exist dont add

    if (task[index].members.find((item) => item.id === member.id._id)) return;

    let data = [...task];
    data[index].members.push({ id: member.id._id, img: member.id.img });

    setTask(data);
  };

  //create new work card
  const createWorkCard = () => {
    //check if all the tasks are filled
    let check = task.find((item) => !item.task || !item.start_date);
    if (check) {
      alert("Please fill all the tasks");
      return;
    }
    //check if all the members are added
    let checkMember = task.find((item) => item.members.length === 0);
    if (checkMember) {
      alert("Please add members to all the tasks");
      return;
    }

    //create new work card with the members id only
    let newTask = task.map((item) => {
      let members = item.members.map((member) => member.id);
      return {
        task: item.task,
        start_date: item.start_date,
        end_date: item.end_date,
        members,
      };
    });

    let newWorkCard = {
      title,
      desc,
      //array of tags seperated by comma
      tags: tags.split(","),
      tasks: newTask,
    };

    console.log(newWorkCard);
    setLoading(true);
    addWorks(ProjectId, newWorkCard,token)
      .then((res) => {
        setLoading(false);
        emptyForm();
        setCreated(true);
        dispatch(
          openSnackbar({
            message: "Created a work card Successfully",
            severity: "success",
          })
        );
      })
      .catch((err) => {
        console.log(err);
        dispatch(
          openSnackbar({
            message: err.message,
            severity: "error",
          })
        );
        setLoading(false);
      });
  };

  const emptyForm = () => {
    setTitle("");
    setDesc("");
    setTags("");
    setTask([
      {
        task: "",
        start_date: "",
        end_date: "",
        members: [],
      },
    ]);
    setStep(0);
  };

  return (
    <Container className={"item"}>
      {step === 0 && (
        <>
          <Top>
            <Title>Create new work</Title>
          </Top>
          <OutlinedBox style={{ marginTop: "8px" }}>
            <TextInput
              placeholder="Title card"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </OutlinedBox>
          <OutlinedBox>
            <TextArea
              placeholder="What is the new work about?"
              name="desc"
              rows={4}
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
          </OutlinedBox>
          <OutlinedBox>
            <TextArea
              placeholder="Tags seperated by comma"
              name="tags"
              rows={2}
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
          </OutlinedBox>
          <OutlinedBox
            button
            activeButton
            style={{ marginTop: "14px" }}
            onClick={() => goToAddTask()}
          >
            Next
          </OutlinedBox>
        </>
      )}
      {step === 1 && (
        <>
          <Top>
            <Title>Add Tasks </Title>
          </Top>
          {task.map((task, index) => (
            <Task>
              <OutlinedBox style={{ marginTop: "8px" }}>
                <TextInput
                  placeholder="Task"
                  type="text"
                  name="task"
                  value={task.task}
                  onChange={(e) => handleTaskChange(index, e)}
                />
              </OutlinedBox>
              <FlexDisplay>
                <OutlinedBox style={{ marginTop: "0px" }}>
                  <TextInput
                    type="text"
                    onFocus={(e) => (e.target.type = "date")}
                    onBlur={(e) => (e.target.type = "text")}
                    id="start"
                    name="start_date"
                    style={{ fontSize: "12px" }}
                    placeholder="Start date"
                    value={task.start_date}
                    onChange={(e) => handleTaskChange(index, e)}
                  />
                </OutlinedBox>
                -
                <OutlinedBox style={{ marginTop: "0px" }}>
                  <TextInput
                    type="text"
                    onFocus={(e) => (e.target.type = "date")}
                    onBlur={(e) => (e.target.type = "text")}
                    id="end"
                    name="end_date"
                    style={{ fontSize: "12px" }}
                    placeholder="End date"
                    value={task.end_date}
                    onChange={(e) => handleTaskChange(index, e)}
                  />
                </OutlinedBox>
              </FlexDisplay>
              <Bottom>
                <Members>
                  {task.members.map((member, memberIndex) => (
                    <MemberGroup>
                      <Avatar
                        sx={{ width: "20px", height: "20px" }}
                        src={member.img}
                      />
                      <CloseRounded
                        onClick={() => removeMember(index, memberIndex)}
                        style={{ fontSize: "18px" }}
                      />
                    </MemberGroup>
                  ))}
                </Members>
                <TextBtn
                  style={{ padding: "6px", textAlign: "end" }}
                  onClick={() => addMember(index)}
                >
                  Add member
                </TextBtn>
              </Bottom>
              <TextBtn
                style={{
                  marginLeft: "2px",
                  marginBottom: "10px",
                  marginTop: "4px",
                  color: "#ff4444",
                }}
                onClick={() => deleteTasks(index)}
              >
                Remove Task
              </TextBtn>
            </Task>
          ))}
          <Modal open={selectMember} onClose={() => setSelectMember(false)}>
            <Wrapper>
              <Body>
                <FlexDisplay>
                  <IconButton
                    style={{
                      position: "absolute",
                      right: "10px",
                      cursor: "pointer",
                      color: "inherit",
                    }}
                    onClick={() => setSelectMember(false)}
                  >
                    <CloseRounded style={{ color: "inherit" }} />
                  </IconButton>
                  <Title style={{ paddingLeft: "10px" }}>Select member</Title>
                </FlexDisplay>

                <UsersList>
                  {ProjectMembers.map((user) => (
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
                      {!task[taskIndex].members.find(
                        (member) => member.id === user.id._id
                      ) && (
                        <InviteButton
                          onClick={() => AddToMember(user, taskIndex)}
                        >
                          Add
                        </InviteButton>
                      )}
                    </MemberCard>
                  ))}
                </UsersList>
              </Body>
            </Wrapper>
          </Modal>
          <OutlinedBox
            button
            activeButton
            style={{ height: "30px", backgroundColor: "#0094ea" }}
            onClick={() => addTasks()}
          >
            Add task
          </OutlinedBox>

          <FlexDisplay>
            <OutlinedBox
              button
              style={{ width: "100%" }}
              onClick={() => setStep(step - 1)}
            >
              Back
            </OutlinedBox>
            <OutlinedBox
              button
              activeButton
              style={{ width: "100%" }}
              onClick={() => createWorkCard()}
              // onClick={() => setStep(step + 1)}
            >
              {loading ? <CircularProgress size={20} /> : "Create"}
            </OutlinedBox>
          </FlexDisplay>
        </>
      )}
    </Container>
  );
};

export default AddWork;
