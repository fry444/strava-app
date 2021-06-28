import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Dialog from '@material-ui/core/Dialog';
import { hideModalAction } from "../../actions/modalActions";

const Modal = () => {
    
    const dispatch = useDispatch();

    useEffect(() => {
        document.addEventListener("keydown", handleClose, false);
        return () => {
            document.removeEventListener("keydown", handleClose, false);
        }
    });

    const handleClose = (e) => {
        if (e.keyCode === 27) {
            dispatch(hideModalAction({
                isOpen: false
            }));
        }
    }

    const isOpen = useSelector((state) => state.modal.isOpen);
    const component = useSelector((state) => state.modal.component);

    return(
        <Dialog open={isOpen} maxWidth={false}>
            {component}
        </Dialog>
     );
};

export default Modal;