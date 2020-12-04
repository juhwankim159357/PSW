import React, { Component } from 'react';
import axios from "axios";

// Mui
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";

export class reset extends Component {
    componentDidMount() {
        axios.get(`/users/reset-password/${this.props.match.params.token}`)
        .then((res) => {
            console.log(res.data);
        })
    }


    render() {
        return (
            <h3>reset</h3>
        )
    }
}

export default reset
