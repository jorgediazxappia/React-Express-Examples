import React, { Component } from "react";
import { View, ScrollView, Text, StyleSheet } from "react-native";
import { connect } from "react-redux";
import TodoListContainer from "./TodoListContainer";
import AddTodo from "./AddTodo";
import { Constants } from "expo";

class TodoApp extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>To Do List</Text>
        </View>
        <AddTodo />
        <TodoListContainer />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    backgroundColor: "#4169E1",
    padding: Constants.statusBarHeight,
    paddingBottom: 10,
    display: "flex",
    alignItems: "center"
  },
  title: {
    paddingTop: 10,
    fontSize: 18,
    color: "white"
  }
});

export default connect()(TodoApp);