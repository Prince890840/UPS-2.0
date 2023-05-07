import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { Card, Icon } from "@rneui/themed";
import { useTailwind } from "tailwind-rn/dist";
import {
  CompositeNavigationProp,
  useNavigation,
} from "@react-navigation/native";
import { TabStackParamList } from "../navigator/TabNavigator";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigator/RootNavigator";

export type OrderScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabStackParamList, "Orders">,
  NativeStackNavigationProp<RootStackParamList>
>;

type Props = {
  item: Order;
};

const OrderCard = ({ item }: Props) => {
  const tw = useTailwind();

  const navigation = useNavigation<OrderScreenNavigationProp>();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("Order", { order: item })}
    >
      <Card containerStyle={[tw("rounded-lg"), styles.cardContainer]}>
        <View style={styles.container}>
          <View>
            <Icon
              name="truck-delivery"
              color="#ed6a7c"
              type="material-community"
            />
            <Text style={{ fontSize: 10 }}>
              {new Date(item.createdAt).toLocaleDateString()}
            </Text>
          </View>

          <View style={styles.box}>
            <Text style={styles.itemText}>
              {item?.carrier} - {item.trackingId}
            </Text>
            <Text style={styles.itemText}>
              {item?.trackingItems?.customer?.name}
            </Text>
          </View>

          <View style={styles.box}>
            <Text style={styles.textColor}>
              {item.trackingItems.items.length} x
            </Text>
            <Icon name="box" type="feather" style={styles.ml2} />
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );
};

export default OrderCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
  },
  cardContainer: {
    paddingHorizontal: 5,
  },
  ml2: {
    marginLeft: 1,
  },
  box: {
    flexDirection: "column",
    alignItems: "center",
  },
  textColor: {
    color: "#ed6a7c",
    fontWeight: "500",
    fontSize: 12,
  },
  middleText: {
    color: "gray",
    fontWeight: "400",
    fontSize: 10,
  },
  itemText: {
    color: "gray",
    fontSize: 12,
    fontWeight: "500",
  },
});
