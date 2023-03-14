package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"net/http"
	"os/exec"
	"strconv"
)

func handleGetStatus(w http.ResponseWriter, r *http.Request) {
    // Define the path to your Python interpreter and script
    pythonPath := "/usr/bin/python"
    scriptPath := "/path/to/pi-project.py"

    // Create a buffer to capture the script's output
    output := &bytes.Buffer{}

    // Use the os/exec package to run the script using the Python interpreter
    cmd := exec.Command(pythonPath, scriptPath)
    cmd.Stdout = output
    if err := cmd.Run(); err != nil {
        // Handle errors here... Should be done on debugging day
    }

    // Parse the script's output as a boolean value
    value, err := strconv.ParseBool(output.String())
    if err != nil {
        // Handle errors here... Should be done on debugging day
    }

    // Use the boolean value here...
    fmt.Println("The value is:", value)
    isStatusOk := true

    // Set the response header and write the boolean value to the response body
    w.Header().Set("Content-Type", "application/json")
    w.WriteHeader(http.StatusOK)
    json.NewEncoder(w).Encode(struct{ Status bool }{Status: isStatusOk})
}