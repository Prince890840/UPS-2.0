import { gql } from "@apollo/client";

export const GET_ALL_CUSTOMERS = gql`
  query GetCustomers {
    getCustomers {
      name
      value {
        email
        name
      }
    }
  }
`;

export const GET_ORDERS = gql`
  query getOrders {
    getOrders {
      name
      value {
        Address
        City
        Lat
        Lng
        carrier
        createdAt
        shippingCost
        trackingId
        trackingItems {
          customer_id
          items {
            item_id
            name
            price
            quantity
          }
          customer {
            email
            name
          }
        }
      }
    }
  }
`;
