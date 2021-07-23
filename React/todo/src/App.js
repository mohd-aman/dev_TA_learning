import React,{Component} from "react";
import InputBox from "./components/inputBox/inputBox";
import TodosList from "./components/todosList/todosList";

class App extends Component{
  state = {
    todos:[
      {id:"1",todo:"Learn JsX"},
      {id:"2",todo:"Learn CSS"},
      {id:"3",todo:"Learn ES6"},
      {id:"4",todo:"Learn React"},
      {id:"5",todo:"Learn Js"},
    ],
  };

  deleteTodo=(id)=>{
    let updatedTodos = this.state.todos.filter(function(todoObj){
      if(todoObj.id == id){
        return false;
      }
      return true;
    })
    this.setState({
      todos:updatedTodos,
    });
  };

  addTodo = (todo) => {
    let updatedTools = [
      ...this.state.todos,
      {id:this.state.todos.length+1,todo:todo},
    ];
    this.setState({
      todos:updatedTools,
    })
  };

  render(){
    let todos = this.state.todos;
    let deleteTodo = this.deleteTodo;
    let addTodo = this.addTodo;
    return(
      <div className="App">
        <InputBox addTodo={addTodo}></InputBox>
        <TodosList todos={todos} deleteTodo = {deleteTodo}></TodosList>
      </div>
    );
  }
}

export default App;
