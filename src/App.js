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

	const handleInputChange = (e) => {
		setTodo(e.target.value);
	};

	const handleFormSubmit = (e) => {
		e.preventDefault();
		if (todo !== "") {
			const newTodos = [...todos, { id: todos.length + 1, title: todo.trim() }];
			setTodos(newTodos);
			setTodo("");
			console.log(todos);
		}
	};

	const handleDeleteClick = (id) => {
		const newArray = todos.filter((todo) => todo.id !== id);
		setTodos(newArray);
	};

	useEffect(() => {
		localStorage.setItem("todos", JSON.stringify(todos));
	}, [todos]);

	return (
		<div className='App'>
			<form onSubmit={handleFormSubmit}>
				<input
					onChange={handleInputChange}
					type='text'
					placeholder='create a new todo!'
					value={todo}
				/>
			</form>
			<ul>
				{todos.map((todo) => (
					<li key={todo.id}>
						{todo.title}
						<button onClick={() => handleDeleteClick(todo.id)}>削除</button>
					</li>
				))}
			</ul>
		</div>
	);
}
