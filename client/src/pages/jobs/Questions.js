import { Button } from '@material-ui/core';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import YesNoQuestion from '../../components/YesNoQuestion';

// Redux
//import { connect } from 'react-redux';
import {useDispatch} from "react-redux";
import { updatePoints } from '../../redux/actions/userActions';


const QUESTION_LIST = [
  {
    name: 'psw_certification',
    question:
      'Do you have PSW certification from an approved and recognized educational institution?',
  },
  {
    name: 'other_certification',
    question: 'Do you have RN/RPN/DSW/HCA/Personal Attendant certification?',
  },
  {
    name: 'foreign_trained',
    question: 'Are you a Foreign trained Nurse, or Physicians?',
  },
  {
    name: 'experience',
    question:
      'Do you have Prior experience working in a Long-Term Care/Retirement home setting?',
  },
  { name: 'cpr', question: 'Do you have CPR and First Aid certification?' },
  {
    name: 'immunization',
    question: 'Do you have immunization for Influenza and Tuberculosis?',
  },
  {
    name: 'background_check',
    question: 'Do you have Criminal Background Check report?',
  },
  {
    name: 'food_safty',
    question: 'Do you have Food handler Safety certificate?',
  },
  {
    name: 'travel',
    question: 'Are you able to travel across GTA to various locations?',
  },
  {
    name: 'driver_license',
    question: "Do you have Valid G or G2 Driver's License?",
  },
  {
    name: 'dem_certification',
    question: 'Do you have Certificate in Dementia Care??',
  },
];

const Questions = () => {
  const [values, setValues] = useState(
    new Array(QUESTION_LIST.length).fill('', 0, QUESTION_LIST.length)
  );

  const history = useHistory();

  const handleChange = (e, index) => {
    const newValues = [...values];
    newValues[index] = e.target.value;
    setValues(newValues);
  };

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const points = values.filter((value) => value === 'yes').length;
    
    const pointData = {
      points
    };

    let token = window.localStorage.getItem('x-auth-token');
    const config = {
      headers: {
        "x-auth-token": token,
      },
    };
    dispatch(updatePoints(pointData, config, history));
  };

  return (
    <form onSubmit={handleSubmit}>
      {QUESTION_LIST.map((question, index) => (
        <YesNoQuestion
          key={index}
          value={values[index]}
          name={question.name}
          question={question.question}
          handleChange={(e) => handleChange(e, index)}
        />
      ))}
      <Button type="submit" variant="outlined" color="primary">
        Submit
      </Button>
    </form>
  );
};


export default Questions;
