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

	// fetch(apiURL, {
	// 	method: "PUT",
	// 	headers: { "Content-Type": "application/json" },
	// 	body: JSON.stringify({ title: "This is a test" })
	// })
	// 	.then(response => response.json())
	// 	.then(data => console.log(data))
	// 	.catch(error => console.log("This is an error:", error));

	// fetch(apiURL)
	// 	.then(response => response.json())
	// 	.then(data => console.log(data));

	const addTodo = () => {
		return fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/luisfurlan",
			{
				method: "PUT",
				body: JSON.stringify([
					{ label: "Make the bed", done: false },
					{ label: "Walk the dog", done: false },
					{ label: "Do the replits", done: false }
				]),
				headers: {
					"Content-Type": "application/json"
				}
			}
		)
			.then(resp => {
				resp.json();
			})
			.then(data => console.log(data));
	};

	const fetchTodos = () => {
		fetch(apiURL)
			.then(response => response.json())
			.then(todos => setTodoList(todos))
			.catch(error => ("This is an error:", error));
	};

	useEffect(() => {
		fetchTodos();
	}, []);

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
			addTodo();
			// let userInput = onKeyDownEvent.target.value;
			// const newTodo = [...todoList, userInput];
			// setTodoList(newTodo);
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
					<ul className="bg-white">{todo.length} item left</ul>
				</div>
			</div>
		</div>
	);
}
