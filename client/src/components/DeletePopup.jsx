import { CloseRounded } from '@mui/icons-material';
import { CircularProgress, Modal } from '@mui/material';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import { deleteProject, deleteTeam } from '../api';
import { useDispatch } from 'react-redux';
import { openSnackbar } from '../redux/snackbarSlice';


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
  width: 430px;
  height: min-content;
  border-radius: 16px;
  background-color: ${({ theme }) => theme.bgLighter};
  color: ${({ theme }) => theme.text};
  padding: 10px;
  display: flex;
  margin-top: 80px;
  flex-direction: column;
  position: relative;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Heading = styled.div`
  font-size: 20px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
  margin: 12px 12px 0 12px;
`;

const Text = styled.div`
  font-size: 14px;
  font-weight: 400;
  color: ${({ theme }) => theme.soft2};
  margin: 12px ;
  line-height: 1.5;
`;

const Input = styled.input`
  border: none;
  font-size: 14px;
  padding: 14px 20px;
  margin: 12px;
  border-radius: 12px;
  color: ${({ theme }) => theme.textSoft};
  background-color: ${({ theme }) => theme.bgDark};
  &:focus {
    outline: 1px solid ${({ theme }) => theme.primary};
  }
`;

const Button = styled.button`
  border: none;
  font-size: 14px;
  padding: 14px 20px;
  margin: 0px 12px 12px 12px;
  font-size: 14px;
  border-radius: 12px;
  font-weight: 600;
  color: ${({ theme }) => theme.text};
  background: ${({ theme }) => theme.primary};
  cursor: pointer;
  ${({ disabled, theme }) =>
    disabled &&
    `
    background: ${theme.soft};
    color: ${theme.soft2};
    cursor: not-allowed;
  `
  }
`;


const DeletePopup = ({ openDelete, setOpenDelete }) => {

  const [name, setName] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [disabled, setDisabled] = React.useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (name === openDelete.name) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [name, openDelete.name]);

  const handleDelete = () => {
    setLoading(true);
    setDisabled(true);
    if (openDelete.type === "Project") {
      DeleteProject();
    } else if (openDelete.type === "Team") {
      DeleteTeam();
    } else if (openDelete.type === "Work") {
      deleteWork();
    }

  }

  const DeleteProject = async () => {
    await deleteProject(openDelete.id, openDelete.token)
      .then((res) => {
        console.log(res);
        dispatch(openSnackbar
          ({
            message: "Project deleted successfully",
            type: "success",
          }));

        handleDeleteSuccess("/projects");
      })
      .catch((err) => {
        dispatch(openSnackbar
          ({
            message: err.message,
            type: "error",
          }));
      })
  }

  const DeleteTeam = async () => {
    await deleteTeam(openDelete.id, openDelete.token)
    .then((res) => {
      console.log(res);
      dispatch(openSnackbar
        ({
          message: "Team deleted successfully",
          type: "success",
        }));

      handleDeleteSuccess("/");
    }
    ).catch((err) => {
      dispatch(openSnackbar
        ({
          message: err.message,
          type: "error",
        }));
    }
    )
  }

  const deleteWork = () => {
  }


  const handleDeleteSuccess = (link) => {
    setLoading(false);
    setOpenDelete({ ...openDelete, state: false });
    navigate(`${link}`);
  }



  return (
    <Modal open={true} onClose={() => setOpenDelete({ ...openDelete, state: false })}>
      <Container>
        <Wrapper>
          <CloseRounded
            sx={{ fontSize: "22px" }}
            style={{
              position: "absolute",
              top: "20px",
              right: "20px",
              cursor: "pointer",
            }}
            onClick={() => setOpenDelete({ ...openDelete, state: false })}
          />
          <Heading>Delete {openDelete.type}</Heading>
          <Text>Are you sure you want to delete this {openDelete.type} <b>{openDelete.name}</b>.<br /> This will permanently delete <b>{openDelete.name}</b> {openDelete.type}'s comments, tools, tasks, workflow runs, and remove all collaborator associations.</Text>
          <Input type="text" placeholder={`Enter the name of the ${openDelete.type} to confirm`} value={name} onChange={(e) => setName(e.target.value)} />
          <Button disabled={disabled} onClick={() => handleDelete()}>
            {loading ? <CircularProgress size="14px" color="inherit" />
              : "Confirm"}
          </Button>
        </Wrapper>
      </Container>
    </Modal>
  )
}

export default DeletePopup