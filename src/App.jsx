import { useState, useEffect } from "react";
import "./App.css";
import TodoItem from "./TodoItem";
import AddTodoForm from "./AddTodoForm";
import EditForm from "./EditForm";
import { v4 as uuidv4 } from "uuid";

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
	const [isEditing, setIsEditing] = useState(false);
	const [currentTodo, setCurrentTodo] = useState({});

	const handleInputChange = (e) => {
		setTodo(e.target.value);
	};

	const handleFormSubmit = (e) => {
		e.preventDefault();
		if (todo !== "") {
			const newTodos = [...todos, { id: uuidv4(), title: todo.trim() }];
			setTodos(newTodos);
			setTodo("");
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
	};

	useEffect(() => {
		localStorage.setItem("todos", JSON.stringify(todos));
	}, [todos]);

	return (
		<div className='App'>
			{isEditing ? (
				<EditForm
					currentTodo={currentTodo}
					setIsEditing={setIsEditing}
					onEditInputChange={handleEditInputChange}
					onEditFormSubmit={handleEditFormSubmit}
				/>
			) : (
				<AddTodoForm
					todo={todo}
					onAddFormSubmit={handleFormSubmit}
					onAddInputChange={handleInputChange}
				/>
			)}
			<ul className='todo-list'>
				{todos.map((todo) => (
					<TodoItem
						todo={todo}
						onHandleEditClick={handleEditClick}
						onHandleDeleteClick={handleDeleteClick}
					/>
				))}
			</ul>
		</div>
	);
}
