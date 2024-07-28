# Getting Started

>**Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## Step 0: Navigate to project's server folder and install dependencies

Before initialization, you will need to navigate to the project's server folder.

In order to do that, run the following command from the _root_ of the project:

```bash
cd server
```

In order to install dependencies, run the following command from server folder of the project:

```bash
npm install
```

## Step 1: MongoDB database connection setup

Before starting local backend project, you will need to add DATABASE and JWT_SECRET environment variables into .env file. If you don't have MongoDB database cluster prepared you can contact me so that I can give you access to my own database.

## Step 2: Start the Server

To start Metro, run the following command from the server folder of the project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 3: Navigate to project's client folder and install dependencies

Before initialization, you will need to navigate to the project's client folder.

In order to do that, run the following command from the _root_ of the project:

```bash
cd client
```

In order to install dependencies, run the following command from client folder of the project:

```bash
npm install
```

## Step 4: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the client folder of the project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 5: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the client folder of the project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

### For Web

You can run the app on web browser after starting metro by simply entering http://localhost:8081 as URL.