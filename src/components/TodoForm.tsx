import React from "react";

const TodoForm = () => {
  const [inputData, setInputData] = React.useState("");

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setInputData(event.target.value);
  };

  const handleButtonClick = (event: React.SyntheticEvent): void => {
    event.preventDefault();
    console.log(inputData);
  };

  return (
    <form onSubmit={handleButtonClick}>
      <input onChange={handleInputChange} value={inputData}></input>
      <button>+</button>
    </form>
  );
};

export default TodoForm;
