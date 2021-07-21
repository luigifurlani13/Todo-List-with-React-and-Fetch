import React from "react";
import { useState, useEffect } from "react";

//include images into your bundle
// import rigoImage from "../../img/rigo-baby.jpg";

//create your first component

export function Home() {
	const [variable, setVariable] = useState([
		"Do Homework",
		"Do Laundry",
		"Walk the Dog"
	]);
	const [isShown, setIsShown] = useState({
		state: false,
		index: 0
	});

	const apiURL =
		"https://assets.breatheco.de/apis/fake/todos/user/luisfurlan";
		
		useEffect(() => {
			// PUT request using fetch inside useEffect React hook
			const newdata = {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ title: 'This is a test' })
			};
			fetch('https://jsonplaceholder.typicode.com/posts/1', requestOptions)
				.then(response => response.json())
				.then(data => setPostId(data.id));
		console.log(newdata)

	// fetch(apiURL)
	// 	.then(response => response.json())
	// 	.then(data => console.log(data));

	let todo = variable.map((item, i) => {
		return (
			<div className="repeating" key={i}>
				<li
					onMouseEnter={() => setIsShown({ state: true, index: i })}
					onMouseLeave={() => setIsShown({ state: false, index: 0 })}>
					{item}

					{isShown.state === true && isShown.index === i ? (
						<button setonClick={() => removeItem(i)}>X</button>
					) : (
						""
					)}
				</li>
			</div>
		);
	});

	const removeItem = index => {
		const newArray = variable.filter((item, i) => i != index);
		setVariable(newArray);
	};

	const newTodo = onKeyDownEvent => {
		if (onKeyDownEvent.keyCode === 13) {
			let userInput = onKeyDownEvent.target.value;
			const newTodo = [...variable, userInput];
			setVariable(newTodo);
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