import api from "@/services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "expo-router";
import { useCallback, useMemo, useState } from "react";
import { useColorScheme } from "react-native";

export type Todo = {
  _id: string;
  text: string;
  completed: boolean;
}

export const useHomeHook = () => {
  const theme = useColorScheme() ?? "light";
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isPageLoading, setIsPageLoading] = useState(false);
  const [todoText, setTodoText] = useState<string>("");
  const [showUncheckedOnly, setShowUncheckedOnly] = useState<boolean>(false);

  const getToken = async () => {
    return await AsyncStorage.getItem("token");
  };

  const createTodo = async (text: string) => {
    const token = await getToken();
    if (token) {
      try {
        const { data } = await api.post('api/todo', { text }, {
          headers: { Authorization: `Bearer ${token}` }
        });
        return data;
      } catch (err) {
        console.error("Failed to create todo:", err);
      }
    }
  };

  const fetchTodos = async () => {
    setIsPageLoading(true);
    const token = await getToken();
    if (token) {
      try {
        const { data } = await api.get('api/todos', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setTodos(data);
      } catch (err) {
        console.error("Failed to fetch todos:", err);
      } finally {
        setIsPageLoading(false);
      }
    } else {
      setIsPageLoading(false);
    }
  };

  const deleteTodo = async (id: string) => {
    const token = await getToken();
    if (token) {
      try {
        await api.delete(`api/delete_todo/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } catch (err) {
        console.error("Failed to delete todo:", err);
      }
    }
  };

  const updateTodo = async (id: string, completed: boolean) => {
    const token = await getToken();
    if (token) {
      try {
        const { data } = await api.put(`api/update_todo/${id}`, { completed }, {
          headers: { Authorization: `Bearer ${token}` }
        });
        return data;
      } catch (err) {
        console.error("Failed to update todo:", err);
      }
    }
  };

  const onPressAdd = async () => {
    if (todoText.trim() === "") return;
    const newTodo = await createTodo(todoText.trim());
    if (newTodo) {
      setTodos(prevTodos => [...prevTodos, newTodo]);
      setTodoText("");
    }
    await fetchTodos();
  };

  const toggleCheck = async (itemId: string, completed: boolean) => {
    setTodos(prevItems =>
      prevItems.map(item =>
        item._id === itemId ? { ...item, completed: !item.completed } : item
      )
    );
    await updateTodo(itemId, !completed);
  };

  const filteredTodos = useMemo(() => {
    return showUncheckedOnly
      ? todos.filter(item => !item.completed)
      : todos;
  }, [todos, showUncheckedOnly]);

  useFocusEffect(
    useCallback(() => {
      fetchTodos();
    }, [])
  );

  return {
    todos,
    setTodos,
    fetchTodos,
    isPageLoading,
    deleteTodo,
    updateTodo,
    onPressAdd,
    todoText,
    setTodoText,
    toggleCheck,
    filteredTodos,
    showUncheckedOnly,
    setShowUncheckedOnly,
    theme,
  };
}