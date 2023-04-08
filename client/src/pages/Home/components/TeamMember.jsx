import React from "react";
import styled from "styled-components";

const TeamMemberContainer = styled.div`
  width: 350px;
  display: flex;
  flex-direction: column;
  background-color: hsl(250, 24%, 9%);
  box-shadow: RGB(252, 3, 111, 0.15) 0px 4px 24px;
  border: 1px solid RGB(252, 3, 111,30%);
  padding: 24px 24px;
    border-radius: 12px;
    gap: 8px;
    cursor: pointer;
    @media (max-width: 925px) {
        width: 300px;
        }
`;

const Header = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 12px;
`;

const TeamMemberData = styled.div`
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: start;
    gap: 4px;
`;

const TeamMemberPhoto = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 2px solid #282D45;
  object-fit: cover;
`;

const TeamMemberName = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: ${({ theme }) => theme.text};
`;

const TeamMemberTitle = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.soft2 + '99'};
`;

const TeamMemberBio = styled.p`
    font-size: 16px;
    line-height: 1.5;
  color: ${({ theme }) => theme.soft2};
`;

const TeamMember = ({ photo, name, title, bio }) => {
    return (
        <TeamMemberContainer>
            <Header>
                <TeamMemberPhoto src={photo} alt={name} />
                <TeamMemberData>
                    <TeamMemberName>{name}</TeamMemberName>
                    <TeamMemberTitle>{title}</TeamMemberTitle>
                </TeamMemberData>
            </Header>
            <TeamMemberBio>{bio}</TeamMemberBio>
        </TeamMemberContainer>
    );
};

export default TeamMember;
