import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import {
    useParams,
    useLocation
} from "react-router-dom";
import { useNavigate } from 'react-router-dom'
import { useSelector } from "react-redux";
import { verifyTeamInvite } from '../api';
import { openSnackbar } from "../redux/snackbarSlice";
import styled from 'styled-components';
import { CircularProgress } from '@mui/material';

const Joining = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    font-size: 2rem;
`;

const TeamInvite = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    function useQuery() {
        const { search } = useLocation();

        return React.useMemo(() => new URLSearchParams(search), [search]);
    }

    let query = useQuery();

    const { code } = useParams();
    const teamid = query.get("teamid");
    const userid = query.get("userid");
    const access = query.get("access");
    const role = query.get("role");

    const { currentUser } = useSelector((state) => state.user);

    useEffect(() => {
        verifyTeamInvite(code, teamid, userid, access, role).then((res) => {
            console.log(res);
            if (res.status === 200) {
                dispatch(openSnackbar({ message: res.data.Message, type: "success" }));
                //navigate to project page
                if (currentUser)
                    navigate(`/teams/${teamid}`);
                else
                    navigate(`/`);
            }
            else {
                navigate(`/`);
            }
        }
        ).catch((err) => {
            console.log(err);
            navigate(`/`);
        }
        )
    }, [teamid, userid, access, role]);

    return (
        <Joining>
            <CircularProgress />
        </Joining>
    )
}

export default TeamInvite