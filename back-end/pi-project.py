import cv2
import numpy as np
from picamera import PiCamera
import requests
# This code should be run on Raspberry pi with the main.go

# set temperature threshold in degrees Celsius
threshold = 30.0

# capture image with infrared camera
with picamera.PiCamera() as camera:
    camera.resolution = (64, 64)
    camera.framerate = 10
    time.sleep(1)
    img = np.empty((64, 64, 3), dtype=np.uint8)
    camera.capture(img, 'rgb')

# convert image to temperature data
data = np.dot(img[..., :3], [0.299, 0.587, 0.114])

# analyze temperature data
hot_mask = data >= threshold
hot_area = np.sum(hot_mask)

# trigger action if hot area exceeds threshold
if hot_area > 0:
    # trigger action (e.g. turn on an LED)
    print("Hot area detected!")
    state = "on"
    LED(state)

def LED(state):
    # Replace with your Govee API key
    API_KEY = "YOUR_API_KEY_HERE"

    # Replace with your device ID
    DEVICE_ID = "YOUR_DEVICE_ID_HERE"

    # Replace with the desired LED state ("on" or "off")
    LED_STATE = state

    # Set the Govee API endpoint URL
    url = f"https://developer-api.govee.com/v1/devices/control"

    # Set the request headers
    headers = {
        "Govee-API-Key": API_KEY,
        "Content-Type": "application/json"
    }

    # Set the request body
    data = {
        "device": DEVICE_ID,
        "model": "H6001",
        "cmd": {
            "name": "turn",
            "value": LED_STATE
        }
    }

    # Send the API request
    response = requests.put(url, headers=headers, json=data)

    # Check the response status code
    if response.status_code == 200:
        print(f"LED turned {LED_STATE} successfully.")
    else:
        print(f"Error turning LED {LED_STATE}. Response code: {response.status_code}")