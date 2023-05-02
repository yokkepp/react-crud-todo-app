import React from "react";

export default function AddTodoForm({
	onAddFormSubmit,
	onAddInputChange,
	todo,
}) {
	return (
		<form onSubmit={onAddFormSubmit}>
			<label>Add Todo:</label>
			<input
				name='todo'
				type='text'
				placeholder='create a new todo!'
				value={todo}
				onChange={onAddInputChange}
			/>
			<button type='submit'>追加</button>
		</form>
	);
}
