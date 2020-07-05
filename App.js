import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import NavigationRoute from "./NavigationRoute";

export default function App() {
  return (
       <NavigationRoute style={styles.container}/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});





