import React, { useLayoutEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CustomerScreen from "../screens/CustomerScreen";
import OrderScreen from "../screens/OrderScreen";
import { useNavigation } from "@react-navigation/native";
import { Icon } from "@rneui/themed";

const Tab = createBottomTabNavigator();

export type TabStackParamList = {
  Customers: undefined;
  Orders: undefined;
};

const TabNavigator = () => {
  const navigation = useNavigation();

  // stop to seeing 2 headers on the app (one in bottom tab and another one is top of the screen )
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: "#59c1cc",
        tabBarInactiveTintColor: "gray",
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === "Customers") {
            return (
              <Icon
                name="users"
                type="entypo"
                color={focused ? "#59c1cc" : "gray"}
              />
            );
          } else if (route.name === "Orders") {
            return (
              <Icon
                name="box"
                type="entypo"
                color={focused ? "#eb6a7c" : "gray"}
              />
            );
          }
        },
      })}
    >
      <Tab.Screen name="Customers" component={CustomerScreen} />
      <Tab.Screen name="Orders" component={OrderScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
