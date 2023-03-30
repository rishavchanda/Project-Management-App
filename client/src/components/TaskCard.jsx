import React from "react";
import styled from "styled-components";
import { Avatar } from "@mui/material";

const Card = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 10px;
  gap: 8px;
  border-left: 1.8px solid ${({ theme }) => theme.soft + "99"};
  border-right: 1.8px solid ${({ theme }) => theme.soft + "99"};
  border-bottom: 1.8px solid ${({ theme }) => theme.soft + "99"};
  background-color: ${({ theme }) => theme.card};
  color: ${({ theme }) => theme.text};
  cursor: pointer;
  &:hover {
    transition: all 0.2s ease-in-out;
    background-color: ${({ theme }) => theme.bgDark + "40"};
  }

  ${({ completed, theme }) =>
    completed === "Completed" &&
    `
    background-color: ${theme.soft + "30"};
    `}
`;

const No = styled.div`
  width: 4%;
  font-size: 12px;
  text-overflow: ellipsis;
  font-weight: 500;
  color: ${({ theme }) => theme.soft2};
  display: -webkit-box;
  -webkit-line-clamp: 5; /* number of lines to show */
  line-clamp: 5;
  -webkit-box-orient: vertical;

  ${({ completed, theme }) =>
    completed === "Completed" &&
    `
    text-decoration: line-through;
    `}
`;

const Task = styled.div`
  width: 50%;
  font-size: 12px;
  font-weight: 500;
  color: ${({ theme }) => theme.soft2};
  display: -webkit-box;
  -webkit-line-clamp: 5; /* number of lines to show */
  line-clamp: 5;
  -webkit-box-orient: vertical;
  padding: 6px;

  ${({ completed, theme }) =>
    completed === "Completed" &&
    `
    text-decoration: line-through;
    `}
`;

const Date = styled.div`
  font-size: 12px;
  font-weight: 500;
  text-align: center;
  text-overflow: ellipsis;
  width: 14%;
  color: ${({ theme }) => theme.soft2};
  ${({ enddate, theme }) =>
    enddate &&
    `
    color: ${theme.pink};
    `}
  display: -webkit-box;
  -webkit-line-clamp: 5; /* number of lines to show */
  line-clamp: 5;
  -webkit-box-orient: vertical;

  ${({ completed, theme }) =>
    completed === "Completed" &&
    `
  text-decoration: line-through;
  `}
`;

const Status = styled.div`
  font-size: 12px;
  font-weight: 500;
  text-align: center;
  width: 10%;
  color: ${({ theme }) => theme.yellow};
  padding: 4px 8px;
  background: ${({ theme }) => theme.yellow + "10"};
  border-radius: 8px;

  ${({ completed, theme }) =>
    completed === "Completed" &&
    `
    color: ${theme.green};
    background: ${theme.green + "10"};
    `}
`;

const Members = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const TaskCard = ({item,index,members}) => {
  return (
    <Card completed={item.status}>
      <No completed={item.status}>{index + 1}.</No>
      <Task completed={item.status}>{item.task}</Task>
      <Date completed={item.status}>
        {item.start_date.split("-").reverse().join("-")}
      </Date>
      <Date enddate completed={item.status}>
        {item.end_date.split("-").reverse().join("-")}
      </Date>
      <Status completed={item.status}>{item.status}</Status>
      <Members
        style={{
          justifyContent: "center",
          width: "20%",
        }}
      >
        {item.members.slice(0, 5).map((member) => (
          <Avatar
            sx={{
              marginRight: "-13px",
              width: "28px",
              height: "28px",
              fontSize: "16px",
            }}
            src={member.img}
          >
            {member.name.charAt(0)}
          </Avatar>
        ))}

        {item.members.length > 5 && (
          <Avatar
            sx={{
              marginRight: "-13px",
              width: "28px",
              height: "28px",
              fontSize: "12px",
            }}
          >
            +{members.length - 9}
          </Avatar>
        )}
      </Members>
    </Card>
  );
};

export default TaskCard;
