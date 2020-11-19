import React from "react";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import "bootstrap/dist/css/bootstrap.min.css";

const TodoForm = (props) => {
  
  const inputTextHandler = (e) => {
    props.setInputText(e.target.value);
  };
  function getCookie(name){
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
  const submitTodoHandler = (e) => {
    e.preventDefault();
    const csrftoken = getCookie('csrftoken');
    if(props.inputText !== "") {

      var url = 'http://127.0.0.1:8000/api/create/'
      
      fetch(url,{
        method:'POST',
        headers:{
          'Content-type':'application/json',
          'X-CSRFToken': csrftoken
        },
        body: JSON.stringify({ text: props.inputText })
      }).then((response) => {
        props.setTodos([
          ...props.todos,
          { text: props.inputText, completed: false}
        ]);
        props.setInputText("");
      }).catch(function(error) {
        window.alert(error)
      })
    }
  };

  const categoryHandler = (e) => {
    props.setCategory(e.target.value);
  };
  return (
    <div>
      <InputGroup className="mb-3 px-4 pt-4">
        <FormControl
          value={props.inputText}
          onChange={inputTextHandler}
          placeholder="Add a Todo"
          aria-label="Add a Todo"
          aria-describedby="basic-addon2"
        />
        <InputGroup.Append>
          <Button
            type="submit"
            onClick={submitTodoHandler}
            variant="outline-dark"
          >
            +
          </Button>
        </InputGroup.Append>
      </InputGroup>

      <Form className="mx-4">
        <Form.Group controlId="exampleForm.SelectCustomSizeSm">
          <Form.Control
            onChange={categoryHandler}
            as="select"
            size="sm tn-info"
            custom
          >
            <option>All</option>
            <option>Completed</option>
            <option>Incomplete</option>
          </Form.Control>
        </Form.Group>
      </Form>
    </div>
  );
};

export default TodoForm;
