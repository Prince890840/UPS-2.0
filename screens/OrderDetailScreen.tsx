import { View, Text, StyleSheet } from "react-native";
import { useTailwind } from "tailwind-rn/dist";
import {
  CompositeNavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { TabStackParamList } from "../navigator/TabNavigator";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigator/RootNavigator";
import React, { useLayoutEffect } from "react";
import DeliveryCard from "../components/DeliveryCard";

type OrderScreenRouteProp = RouteProp<RootStackParamList, "Order">;

export type OrderScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabStackParamList, "Orders">,
  NativeStackNavigationProp<RootStackParamList>
>;

const OrderDetailScreen = () => {
  const tw = useTailwind();
  const navigation = useNavigation<OrderScreenNavigationProp>();

  const {
    params: { order },
  } = useRoute<OrderScreenRouteProp>();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: order?.trackingItems?.customer?.name,
      headerBackTitle: "Deliveries",
      headerTintColor: "#eb6a7c",
      headerTitleStyle: { color: "black" },
    });
  }, []);

  return (
    <View style={styles.container}>
      <DeliveryCard order={order} fullWidth />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: -2,
  },
});

export default OrderDetailScreen;
