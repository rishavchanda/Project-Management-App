import React from "react";
import styled from "styled-components";
import LinearProgress from "@mui/material/LinearProgress";

const Container = styled.div`
  padding: 12px 16px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 6px;
  background-color: ${({ theme }) => theme.card};
  &:hover {
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
  }
`;

const Middle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Flex = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 30px;
`;

const Title = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.textSoft};
`;

const Desc = styled.div`
  font-size: 11px;
  font-weight: 500;
  color: ${({ theme }) => theme.textSoft + "99"};
`;

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  gap: 4px;
  margin-top: 4px;
`;

const Tag = styled.div`
  padding: 4px 10px;
  border-radius: 8px;
  color: ${({ tagColor, theme }) => tagColor + theme.lightAdd};
  background-color: ${({ tagColor, theme }) => tagColor + "10"};
  font-size: 10px;
  font-weight: 500;
`;

const TimeLeft = styled.div`
  font-size: 10px;
  font-weight: 500;
  color: #20B2AA;
  padding: 4px 8px;
  border-radius: 12px;
  background-color: #20B2AA10};
  width: fit-content;
  height: fit-content;
`;

const Progress = styled.div`
  margin: 4px 0px 4px 0px;
`;

const Text = styled.div`
  display: flex;
  align-items: center;
  font-size: 11px;
  font-weight: 400;
  color: ${({ theme }) => theme.soft2};
  margin: 0px 0px 6px 0px;
  line-height: 1.5;
  overflow: hidden;
  gap: 8px;
`;

const Span = styled.span`
  font-size: 12px;
  font-weight: 600;
  color: ${({ theme }) => theme.soft2};
  line-height: 1.5;
`;

const AvatarGroup = styled.div`
  display: flex;
  align-items: center;
`;

const Avatar = styled.img`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  margin-right: -12px;
  border: 3px solid ${({ theme }) => theme.bgLighter};
`;

const Hr = styled.hr`
  margin: 2px 0px;
  border: 0.5px solid ${({ theme }) => theme.soft + "99"};
`;

const ProjectStatCard = () => {
  return (
    <Container>
      <Title>Project Card</Title>
      <Desc>Lorem ipsum dolor sit amet consectetur adipisicing eli jbj</Desc>
      <Tags>
        <Tag tagColor="#FFC107">React</Tag>
        <Tag tagColor="#FFC107">Tag 2</Tag>
      </Tags>
        <Progress>
          <Text>
            Task Done :<Span>2/10</Span>
          </Text>
          <LinearProgress
            sx={{ borderRadius: "10px", height: 3 }}
            variant="determinate"
            value={20}
            color={"success"}
          />
        </Progress>
      <Hr />
      <Flex style={{alignItems: 'center'}}>
        <AvatarGroup>
          <Avatar src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUB8kqGZ74kvQczb_fL00a6LecB331zRp5SQ&usqp=CAU" />
          <Avatar src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUB8kqGZ74kvQczb_fL00a6LecB331zRp5SQ&usqp=CAU" />
        </AvatarGroup>
        <TimeLeft>12 days left</TimeLeft>
      </Flex>
    </Container>
  );
};

export default ProjectStatCard;
