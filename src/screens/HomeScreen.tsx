import {Button, StyleSheet, Text, View} from 'react-native';
import React from 'react';

type Props = {};

const HomeScreen = (props: any) => {
  console.log('props HOME :>> ', props);
  return (
    <View>
      <Text>HomeScreen</Text>
      <Button
        title="Transit to Authentication"
        onPress={() => {
          props.navigation.navigate('Auth');
        }}
      />
      <Button
        title="Go back"
        onPress={() => {
          props.navigation.goBack();
        }}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
