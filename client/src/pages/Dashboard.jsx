import React from "react";
import Styled from "styled-components";
import ProjectStatCard from "../components/ProjectStatCard";

const Container = Styled.div`
  width: 100%;
`;

const ProjectStats = Styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 12px 0px;
`;

const Title = Styled.div`
  width: 100%;
  height: 100%;
  padding: 4px;
  text-align: left;
  margin: 2px;
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;

const CardWrapper = Styled.div`
padding: 12px 0px;
display: grid;
grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
grid-gap: 8px;
`;

const Tasks = Styled.div`
  width: 100%;
  padding: 4px;
  text-align: left;
  margin: 2px;
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
  border-radius: 12px;
  background-color: ${({ theme }) => theme.card};
`;

const TaskCardWrapper = Styled.div`
  padding: 12px 0px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-gap: 8px;
`;

const TaskCard = () => {
  return (
    <Tasks>
      <Title>Tasks</Title>
      <TaskCardWrapper>
        <ProjectStatCard
          title="Total Tasks"
          value="10"
          color="#FFC107"
          icon="fas fa-tasks"
        />
      </TaskCardWrapper>
    </Tasks>
  );
};

const Dashboard = () => {
  return (
    <Container>
      <ProjectStats>
        <Title>Project Statistics</Title>
        <CardWrapper>
          <ProjectStatCard />
          <ProjectStatCard />
          <ProjectStatCard />
          <ProjectStatCard />
          <ProjectStatCard />
          <ProjectStatCard />
        </CardWrapper>
      </ProjectStats>
    </Container>
  );
};

export default Dashboard;
