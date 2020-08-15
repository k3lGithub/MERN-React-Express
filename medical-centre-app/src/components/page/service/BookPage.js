import React from "react";

// grid
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

import TextField from "@material-ui/core/TextField";

// dropdowns
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import ListSubheader from "@material-ui/core/ListSubheader";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

// date picker
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";

// time slot
// import clsx from 'clsx';
// import Input from '@material-ui/core/Input';
// import ListItemText from '@material-ui/core/ListItemText';
// import Checkbox from '@material-ui/core/Checkbox';
// import Chip from '@material-ui/core/Chip';

// radio buttons
import clsx from "clsx";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  formRoot: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  gridRoot: {
    flexGrow: 1,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },

  // chips: {
  //   display: 'flex',
  //   flexWrap: 'wrap',
  // },
  // chip: {
  //   margin: 2,
  // },
  // noLabel: {
  //   marginTop: theme.spacing(3),
  // },
  radioRoot: {
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  icon: {
    borderRadius: "50%",
    width: 16,
    height: 16,
    boxShadow:
      "inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)",
    backgroundColor: "#f5f8fa",
    backgroundImage:
      "linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))",
    "$root.Mui-focusVisible &": {
      outline: "2px auto rgba(19,124,189,.6)",
      outlineOffset: 2,
    },
    "input:hover ~ &": {
      backgroundColor: "#ebf1f5",
    },
    "input:disabled ~ &": {
      boxShadow: "none",
      background: "rgba(206,217,224,.5)",
    },
  },
  checkedIcon: {
    backgroundColor: "#137cbd",
    backgroundImage:
      "linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))",
    "&:before": {
      display: "block",
      width: 16,
      height: 16,
      backgroundImage: "radial-gradient(#fff,#fff 28%,transparent 32%)",
      content: '""',
    },
    "input:hover ~ &": {
      backgroundColor: "#106ba3",
    },
  },
}));

const timeSlots = [
  "7am - 8am",
  "8am - 9am",
  "9am - 10am",
  "10am - 11am",
  "11am - 12pm",
];

// Inspired by blueprintjs
function StyledRadio(props) {
  const classes = useStyles();

  return (
    <Radio
      className={classes.radioRoot}
      disableRipple
      color="default"
      checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
      icon={<span className={classes.icon} />}
      {...props}
    />
  );
}

export default function Booking(props) {
  const classes = useStyles();

  const [selectedDate, setSelectedDate] = React.useState(
    new Date("2014-08-18T21:11:54")
  );

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <React.Fragment>
      <div className={classes.gridRoot}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <form className={classes.formRoot} noValidate autoComplete="off">
              <Grid item xs={12}>
                <TextField required id="standard-required" label="First Name" />
                <TextField required id="standard-required" label="Last Name" />
              </Grid>

              {/* DOCTOR */}
              <Grid item xs={12}>
                <FormControl required className={classes.formControl}>
                  <InputLabel htmlFor="grouped-native-select">
                    Doctor
                  </InputLabel>
                  <Select native defaultValue="" id="grouped-native-select">
                    <option aria-label="None" value="" />
                    <optgroup label="general-practitioners">
                      <option value={1}>Placeholder 1</option>
                      <option value={2}>Placeholder 2</option>
                    </optgroup>
                    <optgroup label="Physiotherapists">
                      <option value={3}>placeholder 3</option>
                      <option value={4}>Placeholder 4</option>
                    </optgroup>
                  </Select>
                </FormControl>
              </Grid>

              {/* DATE PICKER */}
              <Grid item xs={12}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <Grid container justify="space-around">
                    <KeyboardDatePicker
                      disableToolbar
                      variant="inline"
                      format="dd/MM/yyyy"
                      margin="normal"
                      id="booking-date"
                      label="Booking Date"
                      value={selectedDate}
                      onChange={handleDateChange}
                      KeyboardButtonProps={{
                        "aria-label": "change date",
                      }}
                    />
                  </Grid>
                </MuiPickersUtilsProvider>
              </Grid>

              {/* TIME */}
              {/* <FormControl className={classes.formControl}>
                <InputLabel shrink htmlFor="select-multiple-native">
                  Native
        </InputLabel>
                <Select
                  multiple
                  native
                  value={timeSlots}
                  onChange={handleChangeMultiple}
                  inputProps={{
                    id: 'select-multiple-native',
                  }}
                >
                  {timeSlots.map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </Select>
              </FormControl> */}
              <Grid item xs={12}>
                <FormControl className={classes.formControl}>
                  <InputLabel shrink htmlFor="select-multiple-native">
                    Appointment Time
                  </InputLabel>
                  <br></br>
                  <RadioGroup
                    defaultValue=""
                    aria-label="time"
                    name="customized-radios"
                  >
                    {timeSlots.map((time) => (
                      <FormControlLabel
                        value={time}
                        control={<StyledRadio />}
                        label={time}
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
                <div>
                  <Button variant="contained" color="primary">
                    Book
                  </Button>
                </div>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </div>
    </React.Fragment>
  );
}
