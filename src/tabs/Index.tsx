import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Principal from "./Principal";
import Consultas from "./Consultas";
import Ionicons from "react-native-vector-icons/Ionicons";
import Explorar from "./Explorar";
import Perfil from "./Perfil";


const Tab = createBottomTabNavigator();

const screenOptions = {
    tabBarStyle: {
        backgroundColor: '#002851',
    },
    tabBarActiveTintColor: '#339cff',
    tabBarInactiveTintColor: '#FFF',
}

const tabsIcons = [
    {
        id: 1,
        name: 'Principal',
        component: Principal,
        iconName: 'home'
    },
    {
        id: 2,
        name: 'Consultas',
        component: Consultas,
        iconName: 'calendar'
    },
    {
        id: 3,
        name: 'Explorar',
        component: Explorar,
        iconName: 'search'
    },
    {
        id: 4,
        name: 'Perfil',
        component: Perfil,
        iconName: 'home'
    },
]

export default function Tabs() {
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      {tabsIcons.map((item) => (
        <Tab.Screen
        key={item.id}
        name={item.name}
        component={item.component}
        options={{ 
            headerShown: false, 
            tabBarIcon: ({ color, size }) => (
            <Ionicons name={item.iconName} color={color} size={size}/> 
            )}}
      />
      ))   
    }
    </Tab.Navigator>
  );
}
