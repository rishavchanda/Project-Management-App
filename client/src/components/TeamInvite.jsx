import React,{useEffect} from 'react'
import { useDispatch } from 'react-redux';
import {
    useParams,
    useLocation
} from "react-router-dom";
import { useNavigate } from 'react-router-dom'
import { verifyTeamInvite } from '../api';
import { openSnackbar } from "../redux/snackbarSlice";

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

    useEffect(() => {
        verifyTeamInvite(code, teamid, userid, access, role).then((res) => {
            console.log(res);
            dispatch(openSnackbar({ message: res.data.Message, type: "success" }));
            //navigate to project page
            navigate(`/teams/${teamid}`);
        }
        ).catch((err) => {
            console.log(err);
            navigate(`/`);
        }
        )
    }, [teamid, userid, access, role]);

    return (
        <div>{code}</div>
    )
}

export default TeamInvite