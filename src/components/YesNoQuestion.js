import {
    FormControl,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup,
  } from '@material-ui/core';
  import React from 'react';
  
  const YesNoQuestion = ({ question, name, value, handleChange }) => {
    return (
      <FormControl component="fieldset" fullWidth={true} required>
        <FormLabel component="legend">{question}</FormLabel>
        <RadioGroup name={name} value={value} onChange={handleChange}>
          <FormControlLabel
            value="yes"
            control={<Radio required />}
            label="Yes"
          />
          <FormControlLabel value="no" control={<Radio />} label="No" />
        </RadioGroup>
      </FormControl>
    );
  };
  
  export default YesNoQuestion;
  