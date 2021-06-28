import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, IconButton } from "@material-ui/core";
import { hideAlertAction } from "../../actions/alertActions";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import CloseIcon from '@material-ui/icons/Close';

const BottomAlert = () => {

    const open = useSelector((state) => state.alert.isOpen)
    const severity = useSelector((state) => state.alert.severity)
    const message = useSelector((state) => state.alert.message)

    const dispatch = useDispatch();

    const handleClose = () => {
        dispatch(hideAlertAction());
    }

    return(
        <Box>
            <Snackbar open={open} autoHideDuration={3500} onClose={handleClose}>
                <MuiAlert action={
                    <IconButton aria-label="close" color="inherit" size="small" onClick={handleClose}>
                        <CloseIcon fontSize="inherit" />
                    </IconButton>} severity={severity} elevation={6} variant="filled">
                    {message}
                </MuiAlert>
            </Snackbar>
        </Box>
    );
};

export default BottomAlert;