import { StyleSheet } from "react-native";
import { TailwindProvider } from "tailwind-rn";
import utilities from "./tailwind.json";
import { NavigationContainer } from "@react-navigation/native";
import RootNavigator from "./navigator/RootNavigator";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from "@apollo/client";

const client = new ApolloClient({
  uri: "https://serrabranca.stepzen.net/api/wiggly-alpaca/__graphql",
  headers: {
    Authorization:
      "apikey serrabranca::stepzen.io+1000::c27cf0f030e5a325d84d90e5b9bc40f92b8597a49f9ce48a7780129cb864f17d",
  },
  cache: new InMemoryCache(),
});
export default function App() {
  return (
    // @ts-ignore -Tailwind is missing a type definition
    <TailwindProvider utilities={utilities}>
      <ApolloProvider client={client}>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </ApolloProvider>
    </TailwindProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
