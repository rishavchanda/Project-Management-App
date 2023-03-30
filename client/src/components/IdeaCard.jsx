import { Delete } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;
  border-radius: 10px;
  gap: 12px;
  justify-content: space-between;
`;

const Span = styled.div`
  font-size: 13px;
  font-weight: 600;
  margin-top: 1px;
  color: ${({ theme }) => theme.textSoft + "99"};
`;

const Text = styled.div`
  display: flex;
  gap: 8px;
  font-size: 13px;
  color: ${({ theme }) => theme.textSoft + "99"};
`;

const IcoButton = styled(IconButton)`
  color: ${({ theme }) => theme.textSoft + "99"} !important;
`;

const IdeaCard = ({ idea, no }) => {
  return (
    <Container>
      <Text>
        <Span>{no + 1}) </Span>
        {idea}
      </Text>
      <IcoButton>
        <Delete sx={{ fontSize: "18px" }} />
      </IcoButton>
    </Container>
  );
};

export default IdeaCard;
