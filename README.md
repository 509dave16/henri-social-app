# henri-social-app
Social app assessment for Henri Home, including users directory, feed, and todo list tabs, based on instructions found [here](https://github.com/henri-home/henri-mobile-interview-project)

# Demonstration
You can watch a video demonstration [here](https://drive.google.com/file/d/1tP-yUojVkwAZsYqEL18xYNNeP79sR-8K/view?usp=sharing) that's hosted on Google Drive

# Demo App
- You can access the demo app from the Expo Client you have installed on your phone by following this url: https://expo.io/@509dave16/HenriSocial
- Or by installing this [Android APK](https://drive.google.com/file/d/1pqYshWv64CtEyug1DgqfGhi6iGSa7rRZ/view?usp=sharing) that's hosted on Google Drive

# Local Environment Instructions
- Install nvm in order to use Node 12.13.1: https://github.com/nvm-sh/nvm#installing-and-updating
- `nvm install v12.13.1`
- `nvm use v12.13.1`
- `git clone git@github.com:509dave16/henri-social-app.git`
- `cd henri-social-app`
- `npm i`
- `expo start`
- Then either press `i` or `a` to open the app in an iOS Simulator or Android Emulator respectively. In addition, you can also access the local app from your iOS or Android device if you have the Expo Client installed. Just view the QR code in the terminal using your iOS device's camera app. Or by pressing `Scan QR Code` on the **Projects** tab of the Expo Client on Android.

# Additional Packages Used
- **"@expo/react-native-action-sheet": "^3.8.0"** - Used in conjunction with Post header "more" icon for deleting a Post.
- **"@kenetto/react-native-action-button": "^2.8.8"** - Used as a FAB on Feed screen for triggering navigation to New Post Modal.
- **"immer": "^7.0.7"** - Used for immuatable state updates
- **"lodash": "^4.17.20"** - Used as a utility for "split", "isEmpty", and "shuffle". 
- **"material-bread": "codypearce/material-bread#master"** - React Native UI Kit. Had to use master branch to do non-animatable property bug.
- **"react-native-elements": "^2.2.1"** - Used for the Image component which has a nice transition animation between the image being fetched and then rendered
- **"react-native-safe-area-context": "~3.0.7"** - Used for New Post Modal which is not Screen so there are no insets applied to keep content in safe area
- **"react-native-svg": "12.1.0"** - Peer dependency of "material-bread"
- **"react-native-vector-icons": "^7.0.0"** - Peer dependency of "material-bread"
- **"redux-orm": "^0.16.2"** - CRUD state management for Users, Posts, and Comments. Supports data relationships, making it easy to access User or Comments related to Post, etc...


# Directory Structure
- `components` - Every React component resides here. And they are broken up into three directories
  - `screens` - Is intended for screen components that are used as a part of the React Navigation navigation container declaration
  - `widgets` - Is intended for shared components that could be used by other widget components or screen components
  - `root` - Is intended for headless components or components in general that are renderd in the root App component
- `config` - Anything related to configuration like colors, dimensions, shared styles, env variables, etc... should go here
- `services` - Any integrations with services such as the backend, JSONPlaceHolder, UIFaces, PicSum, etc... should go here
- `state` - Every aspect pertaining to the global application state goes here and it broken up into 4 directories:
  - `actions` - This where actions for different features should go. A file for a feature includes the action types and the action creators
  - `models` - This is where any models for resources used in the app should go(i.e. User, Post, Comment, Todo). These models are a part of the integration of `redux-orm`.
  - `reducers` - This is where any reducers for slices of feature/app state should go. `redux-orm` has a special `createReducer` function that is used for creating reducer to hold the data for all the models.
  - `selectors` - This is where any selectors for memoizing slices of feature/app state should go. `redux-orm` has a special `createSelector` function used for selecting data for a particular model. A`QuerySet` for each model can be accessed from the `session` in the final callback of `createSelector`
    
# Deficiencies
- **PicSum Urls N/A on Android in Expo Client** - PicSum urls do not work in the Expo Client in `production` or `development` mode on Android
- **Access FlatList ref for Feed N/A in `production` mode of Expo Client** - A FlatList ref used by `useScrollToTop` and our code for scrolling to offset 0 on the New Post Modal throws a native module error when the ref is during the close action of the Modal. Even though `ref.current.scrollToOffset` is defined the error states that a "null object ref" is attempting to be accessed.
- **Contacts Tab Screen Render Time** - Fetching the default 10 UIFaces urls takes quite a bit of time. Pagination isn't really an option with the api. And we can already see 10 profiles on the Contacts screen without having to scroll. So optimization here is a moot point.
- **Todos Tab Screen Checkbox Interactions** - Even with a FlatList there is a decent amount of a delay between the press and the ripple animationn as well as the checkbox being checked or unchecked

# Missing Requirements
- **JSONPlaceholder POST/DELETE requests for Posts** - Implemented the logic to mutate the local state for the Posts. But I did not get around to adding the http requests to the JSONPlaceholder api for doing a fake POST or DELETE. If I were to finish this, I would either await a fetch request to perform the operation before mutating the local state or use a Thunk to dispatch the action to mutate the local state once the asynchronous operation has been fulfilled.

