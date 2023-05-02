import { useState, useEffect } from "react";
import "./App.css";

export default function App() {
	const [todo, setTodo] = useState("");
	const [todos, setTodos] = useState(() => {
		const savedTodos = localStorage.getItem("todos");
		if (savedTodos) {
			return JSON.parse(savedTodos);
		} else {
			return [];
		}
	});
	const [todoId, setTodoId] = useState(1);
	const [isEditing, setIsEditing] = useState(false);
	const [currentTodo, setCurrentTodo] = useState({});

	const handleInputChange = (e) => {
		setTodo(e.target.value);
	};

	const handleFormSubmit = (e) => {
		e.preventDefault();
		if (todo !== "") {
			const newTodos = [...todos, { id: todoId, title: todo.trim() }];
			setTodos(newTodos);
			setTodo("");
			setTodoId(todoId + 1);
			console.log(todos);
		}
	};

	const handleDeleteClick = (id) => {
		const newArray = todos.filter((todo) => todo.id !== id);
		setTodos(newArray);
	};

	const handleEditInputChange = (e) => {
		setCurrentTodo({ ...currentTodo, title: e.target.value });
		console.log("handleEditInputChange:", currentTodo);
	};

	const handleEditClick = (todo) => {
		setIsEditing(true);
		setCurrentTodo(todo);
		console.log("currentTodo:", currentTodo);
	};

	const handleUpdateTodo = (id, updatedTodo) => {
		const updatedItem = todos.map((todo) => {
			return todo.id === id ? updatedTodo : todo;
		});
		setIsEditing(false);
		setTodos(updatedItem);
	};

	const handleEditFormSubmit = (e) => {
		e.preventDefault();
		handleUpdateTodo(currentTodo.id, currentTodo);
		// setCurrentTodo({});
		// console.log(setCurrentTodo({}));
	};
	useEffect(() => {
		localStorage.setItem("todos", JSON.stringify(todos));
	}, [todos]);

	return (
		<div className='App'>
			{!isEditing ? (
				<form onSubmit={handleFormSubmit}>
					<label>Add Todo:</label>
					<input
						onChange={handleInputChange}
						type='text'
						placeholder='create a new todo!'
						value={todo}
					/>
					<button type='submit'>追加</button>
				</form>
			) : (
				<form onSubmit={handleEditFormSubmit}>
					<label>Edit Todo:</label>
					<input
						onChange={handleEditInputChange}
						type='text'
						value={currentTodo.title}
					/>
					<button type='submit'>更新</button>
					<button onClick={() => setIsEditing(false)}>中止</button>
				</form>
			)}
			<ul className='todo-list'>
				{todos.map((todo) => (
					<li key={todo.id}>
						{todo.title}
						<button onClick={() => handleEditClick(todo)}>編集</button>
						<button onClick={() => handleDeleteClick(todo.id)}>削除</button>
					</li>
				))}
			</ul>
		</div>
	);
}
