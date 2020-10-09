import React, {useState} from 'react';
import Add from './Add';
import Update from './Update';
import Remove from './Delete';
import admin from "../../../admin.png"

// buttons
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles } from '@material-ui/core/styles';




const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }));

export default function Admin(props) {

    const [add, showAdd] = useState(false);
    const [update, showUpdate] = useState(false);
    const [remove, showDelete] = useState(false);
    const classes = useStyles();

    function handleAdd() {
        showAdd(true);
        showUpdate(false);
        showDelete(false);
    }

    function handleUpdate() {
        showAdd(false);
        showUpdate(true);
        showDelete(false);
    }

    function handleDelete() {
        showAdd(false);
        showUpdate(false);
        showDelete(true);
    }

  return (
    <React.Fragment>
        <img id="adminLogo" src={admin}></img>
        <div className={classes.root}>
      <ButtonGroup size="large" color="primary" aria-label="large outlined primary button group">
        <Button onClick={handleAdd}>Add</Button>
        <Button onClick={handleUpdate}>Update</Button>
        <Button onClick={handleDelete}>Delete</Button>
      </ButtonGroup>
    </div>

    {/* Components */}
    <div className="content-wrapper">
    {add ? (<Add/>) : null}
    {update ? (<Update/>) : null}
    {remove ? (<Remove/>) : null}
    </div>

    </React.Fragment>
  );
}