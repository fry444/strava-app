import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Button } from "@material-ui/core";
import { hideDialogAction } from "../../actions/dialogActions";


const YesNoDialog = () => {
    
    const dispatch = useDispatch();

    const open = useSelector((state) => state.dialog.isOpen);
    const callback = useSelector((state) => state.dialog.callback);
    const title = useSelector((state) => state.dialog.title);
    const content = useSelector((state) => state.dialog.content);

    const handleConfirm = () => {
        callback();
        handleClose();
    }

    const handleClose = () => {
        dispatch(hideDialogAction());
    }

    return(
        <Dialog open={open} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
            <DialogTitle id="alert-dialog-title">
                {title}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {content}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="secondary">
                    Cancelar
                </Button>
                <Button onClick={handleConfirm} color="primary" autoFocus>
                    Confirmar
                </Button>
            </DialogActions>
        </Dialog>
     );
};

export default YesNoDialog;