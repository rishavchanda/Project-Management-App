import React from 'react'
import styled from "styled-components";


const Container = styled.div`
    padding: 8px 16px;
    font-weight: 500;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 6px;
    border: 1.2px solid ${({ theme }) => theme.soft2 + "99"};
    color: ${({ theme }) => theme.soft2+"99"};
    border-radius: 12px
`;

const Img = styled.img`
    width: 16px;
    height: 16px;
`;

const Text = styled.div`
    font-size: 12px;
    font-weight: 500;
    color: ${({ theme }) => theme.soft2};
`;

const ToolsCard = ({tool}) => {
    const openWebsite = () => {
        window.open(tool.link, "_blank");
    }
  return (
   <Container onClick={openWebsite}>
        <Img src={tool.icon}/>
        <Text>{tool.name}</Text>
   </Container>
  )
}

export default ToolsCard