import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useReducer, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Todo {
    id: string;
    text: string;
}

interface State {
    todos: Todo[];
}

interface AddTodoAction {
    type: 'ADD_TODO';
    payload: string;
}

interface DeleteTodoAction {
    type: 'DELETE_TODO';
    payload: string;
}
interface SetTodoAction {
    payload: Todo[];
    type: 'SET_TODOS';
}

type Action = AddTodoAction | DeleteTodoAction | SetTodoAction;

const initialState: State = { todos: [] };

const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'ADD_TODO':
            const newTodos = [
                ...state.todos,
                { id: Date.now().toString(), text: action.payload },
            ];
            saveTodosToStorage(newTodos);
            return { todos: newTodos };
        case 'DELETE_TODO':
            const filteredTodos = state.todos.filter((todo) => todo.id !== action.payload);
            saveTodosToStorage(filteredTodos);
            return { todos: filteredTodos };
        case 'SET_TODOS':
            return {
                todos: action.payload,
            };
        default:
            return state;
    }
};

// Function to save todos to AsyncStorage
const saveTodosToStorage = async (todos: Todo[]) => {
    try {
        const jsonValue = JSON.stringify(todos);
        await AsyncStorage.setItem('@todos', jsonValue);
    } catch (error) {
        console.error('Error saving todos:', error);
    }
};

// Function to load todos from AsyncStorage
const loadTodosFromStorage = async (dispatch: React.Dispatch<Action>) => {
    try {
        const jsonValue = await AsyncStorage.getItem('@todos');
        if (jsonValue !== null) {
            const todos: Todo[] = JSON.parse(jsonValue);
            dispatch({ type: 'SET_TODOS', payload: todos });
        }
    } catch (error) {
        console.error('Error loading todos:', error);
    }
};


const ToDoInLocalStorage = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        loadTodosFromStorage(dispatch);
    }, []);

    const handleAddTodo = () => {
        if (inputValue.trim()) {
            dispatch({ type: 'ADD_TODO', payload: inputValue });
            setInputValue('');
        }
    };

    const handleDeleteTodo = (id: string) => {
        dispatch({ type: 'DELETE_TODO', payload: id });
    };

    return (
        <View style={styles.container}>
            {/* <Text style={styles.header}>To-Do List</Text> */}
            <TextInput
                placeholder="Enter a Todo"
                value={inputValue}
                onChangeText={setInputValue}
                style={styles.input}
            />
            <Button title="Add Todo" onPress={handleAddTodo} color="#4CAF50" />

            <FlatList
                data={state.todos}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.todoItem}>
                        <Text style={styles.todoText}>{item.text}</Text>
                        <TouchableOpacity
                            onPress={() => handleDeleteTodo(item.id)}
                            style={styles.deleteButton}
                        >
                            <Text style={styles.deleteButtonText}>Delete</Text>
                        </TouchableOpacity>
                    </View>
                )}
                style={styles.todoList}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: '#FAF3E0', // Soft beige background
        padding: 20,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#3E3E3E', // Dark gray for a classic look
    },
    input: {
        borderWidth: 1,
        borderColor: '#B5A478', // Subtle gold accent for borders
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
        backgroundColor: '#FFF8E7', // Off-white background for inputs
    },
    todoList: {
        marginTop: 20,
    },
    todoItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        borderRadius: 5,
        backgroundColor: '#EDE4D1', // Light sand color for to-do items
        marginBottom: 10,
    },
    todoText: {
        fontSize: 18,
        color: '#3E3E3E', // Dark gray for text
    },
    deleteButton: {
        backgroundColor: '#8B5E3C', // Muted brown for delete button
        padding: 8,
        borderRadius: 5,
    },
    deleteButtonText: {
        color: '#FFF8E7', // Off-white text on delete button
        fontWeight: 'bold',
    },
});

export default ToDoInLocalStorage;
