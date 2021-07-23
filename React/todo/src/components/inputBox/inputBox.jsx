import React, { Component } from 'react';

class InputBox extends Component {
    state = { 
        todoValue:"",
     };
     
     handleOnChange = (e)=>{
         let value = e.target.value;
         this.setState({
             todoValue:value
         })
     };

     handleAddTodo = (e)=>{
         let todo = this.state.todoValue;
         this.props.addTodo(todo);
         this.setState({
             todoValue:""
         })
     };

    render() { 
        let todoValue = this.state.todoValue;
        let handleOnChange = this.handleOnChange;
        let handleAddTodo = this.handleAddTodo;
        return(
            <div className="input-box container input-group mt-4">
                <input type="text"
                className="form-control"
                value={todoValue}
                onChange = {handleOnChange}
                />
                <button className="btn btn-primary" onClick={handleAddTodo}>
                    AddTodo
                </button>
            </div>
        );
    }
}
 
export default InputBox;