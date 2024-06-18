import { observer } from "mobx-react-lite";
import { View, Text, StyleSheet } from "react-native";
import { Contact as ContactType } from "./service";

interface ContactProps {
  contact: ContactType;
}

export const Contact = observer((props: ContactProps) => {
  const { contact } = props;

  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>{contact.name}</Text>

      <View style={styles.info}>
        <Text style={styles.infoText}>{contact.phoneNumber}</Text>

        {contact.email ? (
          <>
            <View style={styles.separator} />
            <Text style={styles.infoText}>{contact.email}</Text>
          </>
        ) : null}
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomColor: "#B5B3AD",
    borderBottomWidth: 1,
  },

  title: {
    fontSize: 24,
    paddingBottom: 8,
  },

  separator: {
    height: 4,
    width: 4,
    borderRadius: 12,
    backgroundColor: "#7C7B74",
  },

  info: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
  },

  infoText: {
    color: "#5C625B",
  },
});
