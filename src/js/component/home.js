import React from "react";
import { useState, useEffect } from "react";

//include images into your bundle
// import rigoImage from "../../img/rigo-baby.jpg";

//create your first component

export function Home() {
	const [todoList, setTodoList] = useState([]);
	const [isShown, setIsShown] = useState({
		state: false,
		index: 0
	});

	const apiURL =
		"https://assets.breatheco.de/apis/fake/todos/user/luisfurlan";

	const addTodo = () => {
		return fetch(apiURL, {
			method: "PUT",
			body: JSON.stringify([
				{ label: "Make the bed", done: false },
				{ label: "Walk the dog", done: false },
				{ label: "Do the replits", done: false }
			]),
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(resp => resp.json())
			.then(resp => JSON.stringify(resp));
	};

	const eraseTodo = () => {
		fetch(apiURL, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(resp => resp.json())
			.then(resp => console.log(resp));
	};

	const fetchTodos = () => {
		fetch(apiURL)
			.then(response => response.json())
			.then(newTodo => setTodoList(newTodo))
			.catch(error => console.error("This is an error:", error));
	};

	useEffect(() => {
		fetchTodos();
	}, []);

	useEffect(() => {
		addTodo(apiURL, todoList);
	}, [todoList]);

	const todo = todoList.map((item, i) => {
		return (
			<div className="repeating" key={i}>
				<li
					onMouseEnter={() => setIsShown({ state: true, index: i })}
					onMouseLeave={() => setIsShown({ state: false, index: 0 })}>
					{item.label}

					{isShown.state === true && isShown.index === i ? (
						<button onClick={() => removeItem(i)}>X</button>
					) : (
						""
					)}
				</li>
			</div>
		);
	});

	const removeItem = index => {
		const newArray = todoList.filter((item, i) => i != index);
		setTodoList(newArray);
	};

	const newTodo = onKeyDownEvent => {
		if (onKeyDownEvent.keyCode === 13) {
			let userInput = onKeyDownEvent.target.value;
			const newTodo = [...todoList, { done: false, label: userInput }];
			setTodoList(newTodo);
			onKeyDownEvent.target.value = "";
		}
	};

	return (
		<div className="box">
			<h1 className="text-center">todos</h1>
			<input
				onKeyDown={newTodo}
				type="text"
				id="fname"
				placeholder="What needs to be done?"
				name="fname"></input>
			<div>
				<ul>{todo}</ul>
				<div>
					<ul className="counter">{todo.length} item left</ul>
					{/* <button onClick={() => eraseTodo()}>X</button> */}
				</div>
			</div>
		</div>
	);
}
