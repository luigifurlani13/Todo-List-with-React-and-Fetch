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

	let todo = variable.map((item, i) => {
		return (
			<li key={i}>
				{item}
				<button onClick={() => removeItem(i)}>X</button>
			</li>
		);
	});

	const removeItem = index => {
		console.log(index);
		const newArray = variable.filter((item, i) => i != index);
		setVariable(newArray);
	};

	const newTodo = onKeyDownEvent => {
		console.log(onKeyDownEvent);
		if (onKeyDownEvent.keyCode === 13) {
			let userInput = onKeyDownEvent.target.value;
			const newTodo = [...todo, userInput];
			setVariable(newTodo);
			onKeyDownEvent.target.value = "";
		}
	};

	return (
		<div>
			<input
				onKeyDown={newTodo}
				type="text"
				id="fname"
				placeholder="Task"
				name="fname"></input>
			<div>
				<ul>{todo}</ul>
				<div className="footer">{todo.length} item left</div>
			</div>
		</div>
	);
}