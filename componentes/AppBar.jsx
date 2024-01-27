import react from "react";
import { View, Text, ScrollView } from 'react-native'
import Constants from 'expo-constants'
import { Link } from "react-router-native";

const AppBarTab = ( {active, children, to}) => {
    return (
    <Link to={to}>
       <Text>{children}</Text>
    </Link>
    )
}

const AppBar = () => {
    return (
        <ScrollView horizontal style={{backgroundColor: 'yellow', marginTop: Constants.statusBarHeight, height: 30}}>
            <AppBarTab active to='/'>- Home + </AppBarTab>
            <AppBarTab to='/radio'>Radio + </AppBarTab>
            <AppBarTab to='/tele'>Tele + </AppBarTab>
            <AppBarTab to='/news'>Noticias -</AppBarTab>
        </ScrollView>
    )
}

export default AppBar