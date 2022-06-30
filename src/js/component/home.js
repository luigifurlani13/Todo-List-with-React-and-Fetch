import React from "react";
import { useState, useEffect } from "react";
import ScrollToTop from "./scrollToTop";

export function Home() {
	const [todoList, setTodoList] = useState([]);
	const [isShown, setIsShown] = useState({
		state: false,
		index: 0
	});

	const apiURL =
		"https://assets.breatheco.de/apis/fake/todos/user/luisfurlan";

	const createTodoList = async () => {
		try {
			const response = await fetch(apiURL, {
				method: "POST",
				body: JSON.stringify(todoList),
				headers: {
					"Content-Type": "application/json"
				}
			});
			if (response.ok) {
				response.json();
			}
		} catch (error) {
			throw Error(error);
		}
	};

	const getTodos = async () => {
		try {
			const response = await fetch(apiURL);

			if (response.ok) {
				const data = await response.json();
				setTodoList(data);
			}
		} catch (error) {
			throw Error(error);
		}
	};

	const addTodo = async () => {
		try {
			const response = await fetch(apiURL, {
				method: "PUT",
				body: JSON.stringify(todoList),
				headers: {
					"Content-Type": "application/json"
				}
			});
			if (response.ok) {
				response.json();
				location.reload();
			}
		} catch (error) {
			throw Error(error);
		}
	};

	const removeTodo = async i => {
		try {
			const newArray = [...todoList];
			newArray.splice(i, 1);
			setTodoList(newArray);
			const response = await fetch(apiURL, {
				method: "PUT",
				body: JSON.stringify(newArray),
				headers: {
					"Content-Type": "application/json"
				}
			});
			if (response.ok) {
				response.json();
				location.reload();
			}
		} catch (error) {
			throw Error(error);
		}
	};

	useEffect(() => {
		getTodos();
	}, []);

	const todo = todoList.map((item, i) => {
		return (
			<div className="repeating" key={i}>
				<li
					onMouseEnter={() => setIsShown({ state: true, index: i })}
					onMouseLeave={() => setIsShown({ state: false, index: 0 })}>
					{item.label}

					{isShown.state === true && isShown.index === i ? (
						<button type="submit" onClick={() => removeTodo(i)}>
							X
						</button>
					) : (
						""
					)}
				</li>
			</div>
		);
	});

	const newTodo = onKeyDownEvent => {
		if (onKeyDownEvent.keyCode === 13) {
			let userInput = onKeyDownEvent.target.value;
			const allTodos = [...todoList, { done: false, label: userInput }];
			setTodoList(allTodos);
			onKeyDownEvent.target.value = "";
		}
	};

	return (
		<ScrollToTop>
			<div className="box">
				<h1 className="text-center">todos</h1>
				<li className="d-flex justify-content-between">
					<input
						onKeyDown={newTodo}
						type="text"
						id="fname"
						placeholder="What needs to be done?"
						name="fname"
					/>
					<button type="submit" onClick={addTodo}>
						Add
					</button>
				</li>

				<div>
					<ul>{todo}</ul>
					<div>
						<ul className="counter">{todo.length} item left</ul>
					</div>
				</div>
			</div>
		</ScrollToTop>
	);
}
