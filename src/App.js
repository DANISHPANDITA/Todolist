import React, {useState,useEffect} from 'react';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import './App.css';
import { InputLabel,Input, FormHelperText } from '@material-ui/core';
import Todo from './Todo';
import db from './firebase';
import firebase from "firebase";

function App() {
  //for every todo
const [todos, settodos] = useState([]) ;
//for each input value
const[input,setinput] =useState("") ; 

useEffect(() => {
  //order by time created in database(firestore)
  db.collection('todos').orderBy("timestamp","desc").onSnapshot(snapshot=> {
    settodos(snapshot.docs.map( doc => ({ id: doc.id, todo : doc.data().todo})));
  });
  }, []);

const funcclear = () =>{
  //clear the input field
  setinput("");
}
const addToDo = (event) =>{
  //prevent the default refresh
  event.preventDefault();
  //add to database
  db.collection('todos').add({
    todo: input,
    timestamp: firebase.firestore.FieldValue.serverTimestamp()
  });  
  setinput("");
};

  return (
    <div className="App">
      <h1> Actions To Do ❗👍   </h1>
      <form className="appform">
         <FormControl>
          <InputLabel > Enter Your Work</InputLabel>
          <Input value={input}  onChange={event => setinput(event.target.value)}/>
          <Button variant="contained" color="primary" disabled = {!input} type="submit" onClick={addToDo}>➕  Add to List</Button>
          <Button variant="contained" color="primary" disabled = {!input} type="submit" onClick={funcclear} > ❎ Clear</Button>
          <FormHelperText>*Add items to your List..</FormHelperText>
        </FormControl>
      </form>
          
      <ul> 
       {todos.map(todo => (
         //list of items
        <Todo todo={todo}/>))}
      </ul>
      
    </div>
  );
}

export default App;