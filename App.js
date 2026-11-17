
import React, { useState, useEffect } from "react";
import {SafeAreaView,View,Text,TextInput,TouchableOpacity,FlatList,ActivityIndicator, StyleSheet, Alert,} from "react-native";

import TodoItem from "./components/TodoItem";
import { addTodo, fetchTodos } from "./services/todoService";

export default function App() {

  const [text, setText] = useState("");
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  // TODO 3: Load todos from Firestore
  const loadTodos = async () => {
    try {
      setLoading(true);

      // TODO 3a
      const data = await fetchTodos();
      setTodos(data);

    } catch (error) {
      Alert.alert("Error", "Could not load todos: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  // TODO 3b: Load when the app opens
  useEffect(() => {
    loadTodos();
  }, []);

  // TODO 4: Save a new todo
  const handleAdd = async () => {

    // TODO 4a: Check for empty input
    if (text.trim() === "") {
      return;
    }

    try {
      // TODO 4b: Save to Firestore
      await addTodo(text.trim());

      // TODO 7: Clear input and reload list
      setText("");
      await loadTodos();

    } catch (error) {
      Alert.alert("Error", "Could not save todo: " + error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>

      <Text style={styles.header}>My Todos</Text>

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="What needs to be done?"
          value={text}
          onChangeText={setText}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={handleAdd}
        >
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
      </View>

      {/* TODO 5 and TODO 6 */}
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          data={todos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TodoItem
              title={item.title}
              completed={item.completed}
            />
          )}
          ListEmptyComponent={
            <Text style={styles.empty}>No todos yet</Text>
          }
          refreshing={loading}
          onRefresh={loadTodos}
        />
      )}

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f4f8",
    padding: 16,
    paddingTop: 48,
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#1a1a2e",
  },
  inputRow: {
    flexDirection: "row",
    marginBottom: 16,
  },
  input: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 16,
    marginRight: 8,
  },
  button: {
    backgroundColor: "#4f46e5",
    borderRadius: 10,
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  empty: {
    textAlign: "center",
    color: "#888",
    marginTop: 40,
    fontSize: 16,
  },
});
