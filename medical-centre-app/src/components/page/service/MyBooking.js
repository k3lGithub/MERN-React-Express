import React, { useState, useEffect } from "react";
import jwt from "jwt-decode";
// Table
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import { getBookings } from "../../../api";
import { getDoctorsbyId } from "../../../api";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function MuyBooking(props) {
  const [booking, setBooking] = useState([]);
  const [doctorInfo, setInfo] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    refreshBooking();
  }, [props.loggedIn]);

  const refreshBooking = async () => {
    const allBooking = await getBookings();
    console.log("Booking", allBooking);

    const userBooking = await allBooking.data.filter(
      (e) => e.owner == jwt(window.localStorage.getItem("token")).userId
    );

    // Add logic to handle My Booking page when no bookings here later

    setBooking(userBooking);
    console.log("doctorInfo", booking);

    const getGp = await getDoctorsbyId(userBooking[0].doctorId);
    const doctorInfo = getGp.status.message;

    setInfo(doctorInfo);
    // console.log("doctorInfo", getGp)
  };

  return (
    <React.Fragment>
      {booking ? (
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Doctor Name</TableCell>
                <TableCell align="right">Service</TableCell>
                <TableCell align="right">Date</TableCell>
                <TableCell align="right">Time</TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody class="tableBody">
              {booking.map((e) => (
                <TableRow key={doctorInfo.name}>
                  <TableCell component="th" scope="row">
                    {doctorInfo.name}
                  </TableCell>
                  <TableCell align="right">
                    {doctorInfo.specialization}
                  </TableCell>
                  <TableCell align="right">{e.date}</TableCell>
                  <TableCell align="right">{e.time}</TableCell>
                  <TableCell align="right">
                    {/* Add on Click to remove items here */}
                    <button>Cancel</button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <p>There are no bookings yet</p>
      )}
    </React.Fragment>
  );
}
