import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNavigator from "./TabNavigator";
import ModalScreen from "../screens/ModalScreen";
import OrderDetailScreen from "../screens/OrderDetailScreen";

export type RootStackParamList = {
  Main: undefined;
  MyModal: { userId: string; name: string };
  Order: {
    order: Order;
  };
};

const RootNavigator = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Group>
        <Stack.Screen name="Home" component={TabNavigator} />
      </Stack.Group>

      <Stack.Group
        screenOptions={{
          preserntation: "modal",
        }}
      >
        <Stack.Screen name="MyModal" component={ModalScreen} />
      </Stack.Group>

      <Stack.Group>
        <Stack.Screen name="Order" component={OrderDetailScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default RootNavigator;
