import React, {Component} from "react";
import PropTypes from "prop-types";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

// Redux
import { connect } from "react-redux";

let testScore = 86;

class ScoreCircle extends Component {
    render() {
        const {classes} = this.props;
        return (
            <Box position="relative" display="inline-flex">
            <CircularProgress variant="static" {...this.props}/>
            <Box
              top={0}
              left={0}
              bottom={0}
              right={0}
              position="absolute"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Typography
                variant="caption"
                component="div"
                color="textSecondary"
              >{`${Math.round(this.props.value)}`}</Typography>
            </Box>
          </Box>
        )
    }
} 

const mapStateToProps = (state) => ({
    user: state.user,
  });
  
  ScoreCircle.propTypes = {
      value: PropTypes.number.isRequired
  };

export default connect(ScoreCircle);