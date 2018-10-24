/** @format */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {StackNavigator} from 'react-native';

const AppRoute = StackNavigator({
    App: {
        screen: App,
    }
});

AppRegistry.registerComponent(appName, () => App);
