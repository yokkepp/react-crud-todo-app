export default function TodoItem({
	todo,
	onHandleEditClick,
	onHandleDeleteClick,
}) {
	return (
		<li key={todo.id}>
			{todo.title}
			<button onClick={() => onHandleEditClick(todo)}>編集</button>
			<button onClick={() => onHandleDeleteClick(todo.id)}>削除</button>
		</li>
	);
}
