import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

const App = () => {
  const [value, setValue] = useState(false);

  useEffect(() => {
    // Send an HTTP GET request to your Go backend's HTTP endpoint
    fetch("http://your-backend-url.com/getStatus")
      .then((response) => response.json())
      .then((data) => {
        // The boolean value is stored in the "Status" key of the JSON object returned by the server
        const isStatusOk = data.Status;
        console.log(`Status: ${isStatusOk}`);
        const newValue = data.value;
        // Update the state with the new value
        setValue(newValue);
      })
      .catch((error) => console.error(error));
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
