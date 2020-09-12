import React,{useState} from 'react';
import {List,ListItem, ListItemText, Tooltip } from '@material-ui/core';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import EditIcon from '@material-ui/icons/Edit';
import './Todo.css';
import db from './firebase';
import Modal from '@material-ui/core/Modal';
import CancelRoundedIcon from '@material-ui/icons/CancelRounded';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
//got code from material ui
function Todo(props) {
    const [open, setOpen] = useState(false);
    const[input,setinput] = useState();

    const useStyles = makeStyles((theme) => ({
        paper: {
          position: 'absolute',
          width: 400,
          backgroundColor: theme.palette.background.paper,
          border: '2px solid #000',
          boxShadow: theme.shadows[5],
          padding: theme.spacing(2, 4, 3),
          display: 'flex',
          alignItems :'center',
        },
      }));
      const classes = useStyles();
    const handleOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const updatetodo = () =>{
        db.collection("todos").doc(props.todo.id).set({
            todo: input
        },{merge: true});
        setOpen(false);
    };

const  body = (
    <div className={classes.paper}>
        <h2>Edit Your Work</h2>
        <input placeholder={props.todo.todo} value={input} onChange={e => setinput(e.target.value)} ></input>
        <Tooltip title="Cancel">
            <CancelRoundedIcon className="cancelbutton" onClick={handleClose}>Close</CancelRoundedIcon>
        </Tooltip>
        <Button onClick={updatetodo}>Update TODO</Button>
     </div>
);


    return (
        <div class="todo">
        <Modal
        open={open}
        onClose={handleClose}
         >
         {body}
         </Modal>
        <List>
            <ListItem>
               <ListItemText primary="What To Do ❓" secondary={props.todo.todo} ></ListItemText>
            </ListItem>
            <Tooltip title="Delete">
                    <DeleteRoundedIcon className="deletebutton" onClick={event => {db.collection("todos").doc(props.todo.id).delete()}}></DeleteRoundedIcon>
              </Tooltip>
              <Tooltip title="Edit">
                 
            <EditIcon className="editbutton" onClick={handleOpen}>Edit Todo</EditIcon>
           
            </Tooltip>
        </List>
            
        </div>
    )
}
export default Todo;
