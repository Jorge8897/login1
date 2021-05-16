import React, { useState, useEffect } from 'react';
import { Text, TextInput, View, StyleSheet, Button } from 'react-native';
import { NavigationContainer, useIsFocused } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage';

const Stack = createStackNavigator();
 
function Login(props) {
  const setDatos = async () => {
    try {
      await AsyncStorage.setItem('login', 'prueba');
      props.navigation.navigate('dashboard');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Usuario:</Text>
      <TextInput />
      <Button
        title="Validar"
        onPress={() => {
          setDatos();
        }}
      />
    </View>
  );
}

function Dashboard(props) {
  const [strLogin, setLogin] = useState('');

  useEffect( () => {
    async function getData() {
      try {
        setLogin(await AsyncStorage.getItem('login'));
      } catch (error) {
        console.log(error);
      }
    }
    getData();
  }, []);

  return (
    <>
      <Text>Bienvenido {strLogin}</Text>
      <Button
        title="Regresar"
        onPress={() => {
          props.navigation.goBack();
        }}
      />
    </>
  );
}

export default function App() {
  return (
    <NavigationContainer initialRouteName="login" detachInactiveScreens>
      <Stack.Navigator>
        <Stack.Screen name="login" component={Login} />
        <Stack.Screen name="dashboard" component={Dashboard} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#6BEB65',
    paddingTop: 20,
  },
});
