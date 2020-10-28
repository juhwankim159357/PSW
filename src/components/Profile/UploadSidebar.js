import React, { Component, Fragment } from 'react'

//MUI Stuff
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

class UploadSidebar extends Component {
    render() {
        return (
            <Fragment>
                <Paper>
                    <Typography>Upload Resume</Typography>
                    <Typography>Upload Additional Materials</Typography>
                </Paper>
            </Fragment>
        )
    }
}

export default UploadSidebar
