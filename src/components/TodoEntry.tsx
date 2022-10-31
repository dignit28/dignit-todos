interface TodoEntryProps {
  content: string;
  completed: boolean;
}

const TodoEntry: React.FunctionComponent<TodoEntryProps> = (props) => {
  return (
    <li>
      <input type="checkbox" checked={props.completed}></input>
      <p>{props.content}</p>
    </li>
  );
};

export default TodoEntry;
