import React, { useEffect, useMemo } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getJob } from "../../redux/actions/dataActions";
import { Link } from "react-router-dom";

const SingleJob = props => {
  // console.log(props.match.params.id);
  const job = useMemo(() => props.data?.job, [props.data.job]);
  useEffect(() => {
    props.getJob(props.match.params.id);
    return () => {};
  }, []);
  console.log(job);

  return (
    <div>
      <h2 style={{ fontSize: "35px", color: "#00b2ca" }}>Job details</h2>
      <hr />
      <h5 style={{ fontSize: "25px", color: "#00b2ca" }}>
        Position :{" "}
        <span style={{ fontSize: "20px", color: "#000", fontWeight: "normal" }}>
          {job.positionTitle}
        </span>
      </h5>
      <h5 style={{ fontSize: "25px", color: "#00b2ca" }}>
        Job Description : &nbsp;
        <span style={{ fontSize: "20px", color: "#000", fontWeight: "normal" }}>
          {job.description}
        </span>
      </h5>
      <h5 style={{ fontSize: "25px", color: "#00b2ca" }}>
        Company Name : &nbsp;
        <span style={{ fontSize: "20px", color: "#000", fontWeight: "normal" }}>
          {job.companyName}
        </span>
      </h5>
      <h5 style={{ fontSize: "25px", color: "#00b2ca" }}>
        Contract Type : &nbsp;
        <span style={{ fontSize: "20px", color: "#000", fontWeight: "normal" }}>
          {job.contractType}
        </span>
      </h5>
      <h5 style={{ fontSize: "25px", color: "#00b2ca" }}>
        <ul style={{ listStylePosition: "inside" }}>
          duties : &nbsp;
          {job.duties === undefined
            ? ""
            : job.duties.map((duty, index) => (
                <li
                  style={{
                    fontSize: "20px",
                    color: "#000",
                    fontWeight: "normal",
                  }}
                  key={index}
                >
                  {duty}
                </li>
              ))}
        </ul>
      </h5>
      <h5 style={{ fontSize: "25px", color: "#00b2ca" }}>
        <ul style={{ listStylePosition: "inside" }}>
          requirements : &nbsp;
          {job.requirements === undefined
            ? ""
            : job.requirements.map((requirement, index) => (
                <li
                  style={{
                    fontSize: "20px",
                    color: "#000",
                    fontWeight: "normal",
                  }}
                  key={index}
                >
                  {requirement}
                </li>
              ))}
        </ul>
      </h5>
      <h5 style={{ fontSize: "25px", color: "#00b2ca" }}>
        <ul style={{ listStylePosition: "inside" }}>
          applicants : &nbsp;
          {job.applicants === undefined
            ? ""
            : job.applicants.map((applicant, index) => (
                <li
                  style={{
                    fontSize: "20px",
                    color: "#000",
                    fontWeight: "normal",
                  }}
                  key={index}
                >
                  {applicant}
                </li>
              ))}
        </ul>
      </h5>

      <Link to={`/Questions`}>
        <button
          style={{
            fontSize: "20px",
            color: "#000",
            fontWeight: "normal",
            padding: "20px",
            color: "#fff",
            backgroundColor: "#00b2ca",
            border: "none",
            borderRadius: "20% 5%",
            marginLeft: "20px",
            outline: "none",
          }}
        >
          Apply
        </button>
      </Link>
    </div>
  );
};

const mapStateToProps = state => ({
  data: state.data,
});
export default withRouter(connect(mapStateToProps, { getJob })(SingleJob));
