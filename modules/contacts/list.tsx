import * as React from "react";

import { observer } from "mobx-react-lite";
import { StyleSheet, Text, View } from "react-native";
import { Contact as ContactType } from "./service";
import { Contact } from "./contact";

export const ContactList = observer(
  ({ contacts }: { contacts: Array<ContactType> }) => {
    const alphabets = new Set();
    const elements = [];

    for (let contact of contacts) {
      const alphabet = contact.name.charAt(0).toLocaleLowerCase();

      if (!alphabets.has(alphabet)) {
        elements.push(
          <View key={alphabet} style={styles.alphabetWrapper}>
            <Text style={styles.alphabet}>{alphabet}</Text>
          </View>
        );
      }

      alphabets.add(alphabet);

      elements.push(<Contact contact={contact} key={contact.name} />);
    }

    return <View>{elements}</View>;
  }
);

const styles = StyleSheet.create({
  alphabet: {
    fontSize: 20,
    fontWeight: 800,
    textTransform: "uppercase",
    fontFamily: "system-ui",
  },

  alphabetWrapper: {
    backgroundColor: "#B5B3AD",
    paddingVertical: 4,
    paddingLeft: 8,
    marginBottom: 16,
  },
});
