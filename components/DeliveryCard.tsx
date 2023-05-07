import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { useTailwind } from "tailwind-rn/dist";
import { Card, Icon } from "@rneui/themed";
import { Divider } from "@rneui/base";
import MapView, { Marker } from "react-native-maps";

type Props = {
  order: Order;

  // optional boolean
  fullWidth?: boolean;
};

const DeliveryCard = ({ order, fullWidth }: Props) => {
  const tw = useTailwind();

  return (
    <Card
      containerStyle={[
        {
          borderRadius: fullWidth ? 0 : 10,
          margin: fullWidth ? 0 : 8,
          backgroundColor: fullWidth ? "#eb6a7c" : "#59c1cc",
        },
        styles.mainView,
      ]}
    >
      <View style={fullWidth && { height: "100%" }}>
        <Icon name="box" type="entypo" size={50} color="#ffffff" />

        <View style={{ alignItems: "flex-start", padding: 20, marginTop: -3 }}>
          <View
            style={{
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <Text style={styles.textStyle}>
              {order.carrier} - {order.trackingId}
            </Text>
            <Text style={[styles.textStyle, styles.dateText]}>
              Expected Delivery:{" "}
              {new Date(order.createdAt).toLocaleDateString()}
            </Text>
            <Divider color="#fff" />
          </View>

          <View
            style={{
              marginLeft: "auto",
              marginRight: "auto",
              paddingBottom: 5,
            }}
          >
            <Text style={styles.textStyle}>Address</Text>
            <Text style={styles.textStyle}>
              {order.Address}, {order.City}
            </Text>
            <Text style={styles.textStyle}>
              Shipping Cost: £{order.shippingCost}
            </Text>
          </View>
        </View>

        <Divider color="#fff" />

        <View style={{ paddingBottom: 5 }}>
          {order.trackingItems.items.map((item) => (
            <View
              key={item?.item_id}
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text style={styles.itemText}>{item.name}</Text>
              <Text style={styles.itemText}>x {item.quantity}</Text>
            </View>
          ))}
        </View>

        <MapView
          initialRegion={{
            latitude: order.Lat,
            longitude: order.Lng,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
          style={[styles.mapViewStyle, !fullWidth && { height: 200 }]}
        >
          {order.Lat && order.Lng && (
            <Marker
              coordinate={{ latitude: order.Lat, longitude: order.Lng }}
              title="Delivery Location"
              description={order.Address}
              identifier="destination"
            />
          )}
        </MapView>
      </View>
    </Card>
  );
};

export default DeliveryCard;

const styles = StyleSheet.create({
  mapViewStyle: {
    width: "100%",
    flexGrow: 1,
  },
  textStyle: {
    fontSize: 12,
    textAlign: "center",
    textTransform: "uppercase",
    fontWeight: "bold",
    color: "#ffffff",
  },
  dateText: {
    fontSize: 16,
  },
  itemText: {
    fontStyle: "italic",
    fontSize: 14,
    color: "#fff",
    paddingHorizontal: 12,
    paddingVertical: 2,
  },
  mainView: {
    padding: 0,
    paddingTop: 16,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
});
