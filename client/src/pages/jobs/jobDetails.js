import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';
import { getJob } from "../../redux/actions/dataActions";


export class jobDetails extends Component {

    componentDidMount() {
        //this.props.getJob(this.props);
    }


    render() {
        const { classes } = this.props
        return (
            <div>
                
            </div>
        )
    }
}

jobDetails.propTypes = {
    data: PropTypes.object.isRequired,
    getJob: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  data: state.data,
});

const mapActionToProps = {
    getJob,
}

export default connect(mapStateToProps,mapActionToProps)(jobDetails);
