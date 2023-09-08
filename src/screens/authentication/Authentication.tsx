import {Button, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {login} from '../../store/slices/authSlice';
import {RootState} from '../../store/store';
import {SCREENS} from '../../constants/screens';

type Props = {};

const registeredAccount = {
  account: 'UITTogether',
  password: 'UIT2023',
};

const Authentication = (props: any) => {
  const {navigation, isLogin, setIsLogin} = props;

  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.auth.token);

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState({
    username: false,
    password: false,
  });

  const onChangeUsername = (text: string) => {
    setUsername(text);
  };

  const onChangePassword = (text: string) => {
    setPassword(text);
  };

  useEffect(() => {
    if (!!token) {
      onNavigateToRegister();
    }
  }, [token]);

  const onNavigateToRegister = () => {
    navigation.navigate(SCREENS.AUTH.REGISTER);
  };

  const onLogin = () => {
    if (!username) {
      const newErr = {...error, username: true};
      setError(newErr);
      return;
    }

    if (!password) {
      const newErr = {...error, password: true};
      setError(newErr);
      return;
    }

    if (
      username == registeredAccount.account &&
      password == registeredAccount.password
    ) {
      // navigation.navigate('Home', {status: 'success'});
      dispatch(login({username, password}));
    } else {
    }
  };

  return (
    <View style={styles.container}>
      <Text>Login Screen</Text>
      <Button title="Register" onPress={onNavigateToRegister} />
      <Text>{token}</Text>
      <TextInput
        style={[styles.input, error.username && styles.errorInput]}
        value={username}
        placeholder="Enter your username"
        onChangeText={onChangeUsername}
        placeholderTextColor={error.username ? 'red' : 'gray'}
      />
      <TextInput
        style={styles.input}
        value={password}
        placeholder="Enter your password"
        onChangeText={onChangePassword}
        secureTextEntry
      />

      {!!username && <Button title="Login" onPress={onLogin} />}
    </View>
  );
};

export default Authentication;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'pink',
    padding: 8,
  },
  input: {
    height: 40,
    backgroundColor: '#CCC',
    margin: 8,
    paddingHorizontal: 8,
    borderRadius: 6,
  },
  errorInput: {
    borderColor: 'red',
    borderWidth: 1,
  },
});
