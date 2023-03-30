import React from "react";
import styled from "styled-components";
import { tagColors } from "../data/data";
import { Avatar } from "@mui/material";

const Container = styled.div`
  padding: 6px 4px;
  text-align: left;
  margin: 1px 0px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Wrapper = styled.div`
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

const Role = styled.div`
  font-size: 10px;
  font-weight: 500;
  padding: 4px 8px;
  border-radius: 12px;
  color: ${({ tagColor, theme }) => tagColor + theme.lightAdd};
  background-color: ${({ tagColor, theme }) => tagColor + "10"};
`;

const Access = styled.div`
  font-size: 10px;
  font-weight: 500;
  color: ${({ theme }) => theme.soft2};
  padding: 4px 8px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.soft2 + "33"};
`;

const MemberCard = ({ member }) => {
  return (
    <Container>
      <Wrapper>
        <Avatar sx={{width: '34px', height: '34px'}} src={member.id.img} >{member.id.name.charAt(0)}</Avatar>
        <Details>
          <Name>{member.id.name}</Name>
          <EmailId>{member.id.email}</EmailId>
        </Details>
        <Role
          tagColor={tagColors[Math.floor(Math.random() * tagColors.length)]}
        >
          {member.role}
        </Role>
      </Wrapper>
      <Access>{member.access}</Access>
    </Container>
  );
};

export default MemberCard;
