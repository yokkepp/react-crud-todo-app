export default function EditForm({
	currentTodo,
	setIsEditing,
	onEditInputChange,
	onEditFormSubmit,
}) {
	return (
		<form onSubmit={onEditFormSubmit}>
			<label>Edit Todo:</label>
			<input
				onChange={onEditInputChange}
				type='text'
				value={currentTodo.title}
			/>
			<button type='submit'>更新</button>
			<button onClick={() => setIsEditing(false)}>中止</button>
		</form>
	);
}
