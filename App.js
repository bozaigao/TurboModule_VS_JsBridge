/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React, {useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableOpacity,
} from 'react-native';
import {useState} from 'react';
import type {Node} from 'react';
import {getRandomAsync} from './js/JsbridgeModule';
import NativeTurboModule from './js/NativeTurboModule';
import RenderView from './js/NativeRenderView';
import MessageQueue from 'react-native/Libraries/BatchedBridge/MessageQueue';

const App: () => Node = () => {
  const NUM = 10000;
  const TEXT = `task：Computes the sum of ${NUM} random numbers`;
  const [countBridge, setCountBridge] = useState(0);
  const [bridgeTime, setBridgeTime] = useState(0);
  const [countTurbo, setCountTurbo] = useState(0);
  const [turboTime, setTurboTime] = useState(0);

  const backgroundStyle = {
    backgroundColor: 'white',
  };

  const getCountByBridge = async () => {
    let count = 0,
      startTime = new Date().getTime();
    for (let i = 0; i < NUM; i++) {
      count += await getRandomAsync();
    }
    setCountBridge(count);
    setBridgeTime(new Date().getTime() - startTime);
  };

  const getCountByTurboModule = async () => {
    let count = 0,
      startTime = new Date().getTime();
    for (let i = 0; i < NUM; i++) {
      count += NativeTurboModule?.getRandomSync() || 0;
    }
    setCountTurbo(count);
    setTurboTime(new Date().getTime() - startTime);
  };

  useEffect(() => {
    MessageQueue.spy(true);
  }, []);

  return (
    <SafeAreaView style={backgroundStyle}>
      <View style={styles.task1}>
        <TouchableOpacity onPress={getCountByBridge}>
          <View style={styles.button}>
            <Text style={styles.text}>execute by jsBridge</Text>
          </View>
        </TouchableOpacity>
        <View style={{marginLeft: 10}}>
          <Text>{TEXT}</Text>
          <Text>{`result：${countBridge}`}</Text>
          <Text>{`time：${bridgeTime}ms`}</Text>
        </View>
      </View>
      <View style={styles.task2}>
        <TouchableOpacity onPress={getCountByTurboModule}>
          <View
            style={Object.assign(
              {...styles.button},
              {backgroundColor: 'blue'},
            )}>
            <Text style={styles.text}>execute by turboModule</Text>
          </View>
        </TouchableOpacity>
        <View style={{marginLeft: 10}}>
          <Text>{TEXT}</Text>
          <Text>{`result：${countTurbo}`}</Text>
          <Text>{`time：${turboTime}ms`}</Text>
        </View>
      </View>
      <RenderView
        num={NUM}
        style={styles.nativeView}
      />
      <Text
        style={styles.nativeText}>{`If the JS bridge of efficiency is 1, the Turbo Module is ${
        bridgeTime / turboTime
      }`}</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 100,
    height: 100,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  task1: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  task2: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
  },
  nativeView:{
    width: 350,
    height: 100,
    marginTop: 20,
  },
  nativeText:{
    fontWeight: 'bold',
    fontSize: 30,
  }¬
});

export default App;
