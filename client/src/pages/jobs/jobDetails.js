import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';
import { getJob } from "../../redux/actions/dataActions";


export class jobDetails extends Component {
    render() {
        // Job details are in data.job 
        const { data, classes } = this.props
        return (
            <div>
                <h3>Job Details</h3> 
                <h4>{data.job.positionTitle}</h4>
                <h4>{data.job.companyName}</h4>
            </div>
        )
    }
}

jobDetails.propTypes = {
    data: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  data: state.data,
});

const mapActionToProps = {
    getJob,
}

export default connect(mapStateToProps,mapActionToProps)(jobDetails);
