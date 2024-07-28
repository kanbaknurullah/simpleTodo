import Todo from "../models/todo";

export const createTodo = async (req, res) => {
	try {
		const userId = req.userId;
		const { text } = req.body;
		const todo = await new Todo({
			userId,
			text,
			completed: false,
		});
		const data = await todo.save();
		res.status(200).json(data)
	} catch (err) {
		console.log(err);
		res.status(400).json({message: err.message})
	}
};

export const getTodos = async (req, res) => {
	try {
		const userId = req.userId;
		const data = await Todo.find({ userId });
		console.log('qwe', userId, data)
		res.json(data)
	} catch (error) {
		res.status(500).json({message: error.message})
	}
};

export const updateTodo = async (req, res) => {
	try {
		const id = req.params.id;
		const { text, completed } = req.body;
		const updatedTodo = await Todo.updateOne(
			{_id: id},
			{$set: { text: text, completed: completed}},
		)
		res.json(updatedTodo)
	} catch (err) {
		res.status(500).json({message: err.message})
	}
};

export const deleteTodo = async (req, res) => {
	try {
		const todo = await Todo.findById(req.params.id);
		if (!todo) {
				res.status(400);
				throw new Error('Todo not found');
		}
		await todo.remove();
		res.status(200).json({ id: req.params.id });
	} catch (err) {
		res.status(500).json({message: err.message})
	}
};