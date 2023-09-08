import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

type Props = {
  [key: string]: any;
};

const RegisterScreen = (props: Props) => {
  return (
    <View style={styles.container}>
      <Text>RegisterScreen</Text>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'orange',
  },
});
