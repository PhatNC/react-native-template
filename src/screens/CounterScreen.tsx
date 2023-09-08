import React from 'react';
import {View, Text, Button} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '../store/store';
import {decrement, increment} from '../store/slices/counterSlice';

const CounterScreen = () => {
  const counter = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <View>
      <Text>Counter Value: {counter}</Text>
      <Button title="Increment" onPress={() => dispatch(increment())} />
      <Button title="Decrement" onPress={() => dispatch(decrement())} />
    </View>
  );
};

export default CounterScreen;
