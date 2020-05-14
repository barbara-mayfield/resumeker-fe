import React, { useState } from "react";

import "../formStyles/reviewForm.css";

import WorkHistoryFormTemplate from "../formsTemplate/workHistoryFormTemplate"

//Icon import
import EditIcon from "@material-ui/icons/Edit";

import { CardContent, makeStyles, TextField, Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
    alignSelf: "center",
  },
  cardContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  textField: {
    textAlign: "center",
  },
  selectorForm: {
    width: "100%", // Fix IE 11 issue.
    // marginTop: theme.spacing(1),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  selectorText: {
    display: "flex",
    flexDirection: "column",
    marginLeft: "1rem",
    marginBottom: "100px",
  },
}));

function JobHistoryCard(props) {
  const [edit, setEdit] = useState(false);

  const [info, setInfo] = useState({
    jobTitle: `${props.job.jobTitle}`,
    companyName: `${props.job.companyName}`,
    startYear: `${props.job.startYear}`,
    endYear: `${props.job.endYear}`,
    jobDescription: `${props.job.jobDescription}`,
    id: props.job.id,
  });

  const saveInfo = (event) => {
    event.preventDefault();
    props.updateWorkData(info);
    setEdit(false);
  };

  const onChange = (event) => {
    event.preventDefault();
    setInfo({ ...info, [event.target.name]: event.target.value });
  };

  const classes = useStyles();

  if (edit) {
    return (
      <CardContent>
        <form onSubmit={saveInfo}>
          <WorkHistoryFormTemplate info={info} onChange={onChange} />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Save
          </Button>
        </form>
      </CardContent>
    );
  } else {
    return (
      <CardContent className={classes.cardContent}>
        <p>
          Job Title: {info.jobTitle}{" "}
          <EditIcon color="disabled" onClick={() => setEdit(!edit)}>
            Edit
          </EditIcon>
        </p>
        <p>Company Name: {info.companyName}</p>
        <p>Starting Date: {info.startYear}</p>
        <p>End Date: {info.endYear}</p>
        <p>Job Description: {info.jobDescription}</p>
      </CardContent>
    );
  }
}

export default JobHistoryCard;
