import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Product from './pages/Product'
import Detail from './pages/Detail';
import Login from './pages/Login'
import { useDispatch, useSelector } from 'react-redux';
import Loading from './component/Loading';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Stack = createNativeStackNavigator();
const Router = () => {
  const userSession = useSelector(state => state.user)
  const isAuthloading = useSelector(state => state.isAuthloading)
  const dispatch = useDispatch()
  return (
    <NavigationContainer>
      {isAuthloading ?
        (
          <Loading />
        ) : !userSession ? (
          <Stack.Navigator>
            <Stack.Screen
              name="LoginPage"
              component={Login}
              options={{
                headerShown: false
              }} />
          </Stack.Navigator>)
          :
          (
            <Stack.Navigator>
              <Stack.Screen
                name="ProductsPage"
                component={Product}
                options={{
                  title: "Shopping Mall",
                  headerStyle: { backgroundColor: "#64b5f6" },
                  headerTitleStyle: { color: "white" },
                  headerTintColor: "white",
                  headerRight: () => (
                    <Icon name="logout" size={30} color="white" onPress={() => dispatch({ type: "REMOVE_USER" })} />
                  )
                }} />
              <Stack.Screen
                name="DetailPage"
                component={Detail}
                options={{
                  title: "Detay",
                  headerStyle: { backgroundColor: "#64b5f6" },
                  headerTitleStyle: { color: "white" },
                  headerTintColor: "white"
                }}
              />

            </Stack.Navigator>
          )
      }
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({

});

export default Router;