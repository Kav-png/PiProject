import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

const App = () => {
  const [value, setValue] = useState(false);

  useEffect(() => {
    // Send an HTTP GET request to your Go backend's HTTP endpoint
    fetch("http://your-go-backend-url:8080/")
      .then((response) => response.json())
      .then((data) => {
        console.log("Received HTTP response:", data);
        // Extract the boolean value from the response data
        const newValue = data.value;
        // Update the state with the new value
        setValue(newValue);
      })
      .catch((error) => {
        console.error("Failed to fetch boolean value:", error);
      });
  }, []);

  return (
    <View style={styles.container}>
      <Text>The value is: {value ? "true" : "false"}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default App;
