import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

const App = () => {
  const [value, setValue] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("YOUR_IP_ADDRESS_OF_PI");
        const data = await response.json();
        setValue(data);
      } catch (error) {
        console.error(error);
      }
    };

    const intervalId = setInterval(fetchData, 5000);

    return () => clearInterval(intervalId);
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
