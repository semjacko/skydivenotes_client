import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { SignNavigation } from './src/navigation/sign-navigation';
import {MainNavigation} from './src/navigation/main-navigation';
import { createStore } from 'redux'
import { Provider } from 'react-redux'

const initialState = {
  user: {
    email: '',
    fullname: '',
    license: '',
    licenseExpiration: '',
    medicalExpiration: '',
    personalWeight: 0,
    altitude: 0,
    categoryID: 0,
    dropzoneID: 0,
    planeID: 0
  },
  token: '',
  isSignedIn: false
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SIGN_IN':
      state.token = action.token;
      state.isSignedIn = true;
      break;
    case 'UPDATE_USER':
      state.user = {...action.user};
      break;
  }
  return state
}

const store = createStore(reducer)

// TODO if signedIn then main-navi
export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <SignNavigation />
      </NavigationContainer>
    </Provider>
  );
}