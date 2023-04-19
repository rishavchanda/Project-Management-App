import React from "react";
import Styled, { useTheme } from "styled-components";
import ProjectStatCard from "../components/ProjectStatCard";
import { Add } from "@mui/icons-material";
import CircularProgress, {
  CircularProgressProps,
} from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { LinearProgress } from "@mui/material";

const Container = Styled.div`
  width: 100%;
`;

const TopBar = Styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;
  gap: 16px;
  margin: 20px 0px;
`;

const CreateButton = Styled.div`
  padding: 20px 30px;
  text-align: left;
  font-size: 16px;
  font-weight: 800;
  color: ${({ theme }) => theme.text};
  border-radius: 12px;
  background: linear-gradient(76.35deg, #801AE6 15.89%, #A21AE6 89.75%);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  transition: all 0.5s ease;
  &:hover {
    background: linear-gradient(76.35deg, #801AE6 15.89%, #A21AE6 89.75%);
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.25);
  }
  gap: 14px;

  ${({ btn }) =>
    btn === "team" &&
    `
    background: linear-gradient(76.35deg, #FFC107 15.89%, #FFC107 89.75%);
    &:hover {
      background: linear-gradient(76.35deg, #FFC107 15.89%, #FFC107 89.75%);
      box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.25);
    }
  `}
`;

const Icon = Styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background: ${({ theme }) => theme.text};
  color: ${({ theme }) => theme.primary};
  border-radius: 50%;
  padding: 4px;
`;

const StatsWrapper = Styled.div`
max-width: 600px;
  display: grid;
  grid-template-columns: repeat(2, minmax(250px, 1fr));
  grid-gap: 24px;
  margin: 20px 0px;
`;

const StatCard = Styled.div`
  width: 100%;
  height: 100%;
  padding: 4px;
  text-align: left;
  margin: 2px;
  font-size: 18px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
  border-radius: 12px;
  background-color: ${({ theme }) => theme.card};
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.20);
  transition: all 0.5s ease;
  &:hover {
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.25);
  }
`;

const Teams = Styled.div`
  width: 100%;
`;

const TotalProjects = Styled.div` 
  width: 100%;
  padding: 8px 12px;
`;

const TaskCompleted = Styled.div` 
  width: 100%;
  padding: 8px 12px;
`;

const Progress = Styled.div`
  width: 90%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  padding: 10px 0px 0 0;
`;

const ProgressText = Styled.div`
  font-size: 28px;
  font-weight: 600;
  color: ${({ theme }) => theme.text};
`;

const Desc = Styled.div`
  font-size: 12px;
  font-weight: 500;
  padding: 0px 4px;
  font-size: 13px;
  color: ${({ theme }) => theme.soft2};
`;

const TotalWorks = Styled.div`
  width: 100%;
  padding: 8px 12px;
`;

const Title = Styled.div`
  width: 100%;
  height: 100%;
  text-align: left;
  margin: 2px;
  font-size: 18px;
  font-weight: 600;
  color: ${({ theme }) => theme.text};
`;

const Span = Styled.span`
  font-weight: 600;
  color: ${({ theme }) => theme.primary};
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

function CircularProgressWithLabel(props
) {
  const theme = useTheme();
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress variant="determinate" {...props} thickness={6} size="60px" style={{ color: theme.primary }} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography
          variant="caption"
          component="div"
          color="inherit"
        >{`${Math.round(props.value)}`}</Typography>
      </Box>
    </Box>
  );
}

                  // backgroundColor: 'lightyellow',
                  // '& .MuiLinearProgress-bar': {
                  //   backgroundColor: 'orange'
                  // }

const Dashboard = () => {
  return (
    <Container>
      <TopBar>
        <CreateButton>
          <Icon>
            <Add style={{ color: 'inherit' }} />
          </Icon>
          Create New Project
        </CreateButton>
        <CreateButton btn="team">
          <Icon>
            <Add style={{ color: '#FFC107' }} />
          </Icon>
          Create New Team
        </CreateButton>
      </TopBar>
      <StatsWrapper>
        <StatCard>
          <TotalProjects>
            <Title>Total Projects Done</Title>
            <Progress>
              <LinearProgress
                sx={{ borderRadius: "10px", height: 7, width: "80%"
                }}
                variant="determinate"
                value={20}
              />
              <ProgressText>20</ProgressText>
            </Progress>
            <Desc>Working on <Span>2</Span>  projects</Desc>
          </TotalProjects>
        </StatCard>

        <StatCard>
          <TaskCompleted>
            <Title>Total Task Done</Title>
            <Progress>
              <LinearProgress
                sx={{ borderRadius: "10px", height: 7, width: "80%" }}
                variant="determinate"
                value={20}
                color={"success"}
              />
              <ProgressText>20</ProgressText>
            </Progress>
            <Desc><Span>2</Span>  Tasks are left</Desc>
          </TaskCompleted>
        </StatCard>

        {/* <StatCard>
          <TotalWorks>
            <Title>Total Works Done</Title>
          </TotalWorks>
        </StatCard> */}
      </StatsWrapper>
    </Container>
  );
};

export default Dashboard;
