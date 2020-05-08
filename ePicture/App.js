import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './app/Home';
import Main from './app/Main';
import ViewImages from './app/ViewImages';

const Stack = createStackNavigator();

function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Home"
                screenOptions={{
                    headerStyle: {
                        backgroundColor: '#3c3c46',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                    headerTitleAlign: 'center'
                }}
            >
                <Stack.Screen
                    name="Home"
                    options={{ title: 'Home' }}
                    component={HomeScreen}
                />
                <Stack.Screen
                    name="Main"
                    options={{ title: 'Search' }}
                    component={Main}
                />
                <Stack.Screen
                    name="ViewImages"
                    options={{ title: 'Results' }}
                    component={ViewImages}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

//console.disableYellowBox = true;

export default App;