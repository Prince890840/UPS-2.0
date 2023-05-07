import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { Icon } from "@rneui/themed";
import { useTailwind } from "tailwind-rn/dist";
import {
  CompositeNavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { TabStackParamList } from "../navigator/TabNavigator";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigator/RootNavigator";
import useCustomerOrders from "../hooks/useCustomerOrders";
import DeliveryCard from "../components/DeliveryCard";

type ModalScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabStackParamList>,
  NativeStackNavigationProp<RootStackParamList, "MyModal">
>;

type ModalScreenRouteProp = RouteProp<RootStackParamList, "MyModal">;

const ModalScreen = () => {
  const tw = useTailwind();
  const navigation = useNavigation<ModalScreenNavigationProp>();

  const {
    params: { name, userId },
  } = useRoute<ModalScreenRouteProp>();

  const { loading, error, orders } = useCustomerOrders(userId);

  return (
    <View>
      <TouchableOpacity
        style={tw("absolute right-5 top-5 z-10")}
        onPress={navigation.goBack}
      >
        <Icon name="closecircle" type="antdesign" />
      </TouchableOpacity>

      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <Text style={styles.nameText}>{name}</Text>
          <Text style={styles.deliveryText}>deliveries</Text>
        </View>
      </View>

      {/* scrollable list in more optimize way for that we use FlatList */}
      <FlatList
        contentContainerStyle={{ paddingBottom: 200 }}
        data={orders}
        keyExtractor={(order) => order.trackingId}
        renderItem={({ item: order }) => <DeliveryCard order={order} />}
      />
    </View>
  );
};

export default ModalScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: 4,
  },
  innerContainer: {
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#59c1cc",
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  nameText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#59c1cc",
    textAlign: "center",
  },
  deliveryText: {
    fontSize: 14,
    fontStyle: "italic",
    color: "#000000",
    marginTop: 4,
  },
});
