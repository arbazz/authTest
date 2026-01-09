# Authentication App

A React Native application demonstrating Authentication flows using React Context API and AsyncStorage.

## Features

- Complete Login and Signup screens with validation.
- Global user state management via Context API.
- Session persistence with AsyncStorage.
- Form validation for email format and password strength.
- Password visibility toggle.
- Loading states and error handling.
- Responsive design for iOS and Android.

## Setup Instructions

1.  **Install Dependencies**
    ```bash
    npm install
    ```

2.  **iOS Setup**
    ```bash
    cd ios && pod install && cd ..
    ```

3.  **Run the App**

    *For iOS:*
    ```bash
    npm run ios
    ```

    *For Android:*
    ```bash
    npm run android
    ```

## Implementation

The app uses `AuthContext` to bridge the gap between the UI and persistent storage. Navigational logic is decoupled from the screens, using the auth state to determine the root stack.
