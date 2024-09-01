import React, { useReducer } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

interface State {
    count: number;
}
type Action = { type: 'increment' } | { type: 'decrement' } | { type: 'reset' };

const initialState: State = { count: 0 };

const reducer = (state: State, action: Action) => {
    switch (action.type) {
        case 'increment':
            return { count: state.count + 1 };
        case 'decrement':
            return { count: state.count - 1 };
        case 'reset':
            return initialState;
        default:
            throw new Error('Invalid action type');
    }
};

const Counter = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Counter</Text>
            <Text style={styles.countText}>Count: {state.count}</Text>

            <View style={styles.buttonContainer}>
                <View style={styles.buttonWrapper}>
                    <Button
                        title="Increment"
                        onPress={() => dispatch({ type: 'increment' })}
                        color="#A3B18A" // Olive green
                    />
                </View>
                <View style={styles.buttonWrapper}>
                    <Button
                        title="Decrement"
                        onPress={() => dispatch({ type: 'decrement' })}
                        color="#BC6C25" // Burnt sienna
                    />
                </View>
                <View style={styles.buttonWrapper}>
                    <Button
                        title="Reset"
                        onPress={() => dispatch({ type: 'reset' })}
                        color="#CB997E" // Soft beige
                    />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: '#EDE0D4', // Light cream
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#6B705C', // Muted olive green
    },
    countText: {
        fontSize: 48,
        fontWeight: 'bold',
        marginBottom: 40,
        color: '#3A3A3A', // Dark charcoal
    },
    buttonContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    buttonWrapper: {
        width: '30%',
    },
});

export default Counter;
