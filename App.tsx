// src/App.tsx

import React from 'react';
import {Provider} from 'react-redux';
import store from './src/store/store';
import {SafeAreaView} from 'react-native';
import RootNavigator from './src/routers';
import {NavigationContainer} from '@react-navigation/native';

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <SafeAreaView style={{flex: 1}}>
          <RootNavigator />
        </SafeAreaView>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
