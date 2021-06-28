import React from "react";
import { useSelector } from "react-redux";
import { LinearProgress, Box } from "@material-ui/core";

const ProgressBar = () => {

    const isVisible = useSelector((state) => state.progressBar.isVisible)

    return(
        <Box display="flex" flexDirection="column" height="4px" marginBottom="16px" >
            <LinearProgress hidden={!isVisible} />
        </Box>
    );
};

export default ProgressBar;