import * as React from "react";
import { View, TextInput, StyleSheet, Text } from "react-native";

interface HeaderProps {
  onChange: (text: string) => void;
  Action: React.ElementType;
}

export function Header(props: HeaderProps) {
  const { onChange, Action } = props;

  const [isFocused, setIsFocused] = React.useState(false);

  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.title} allowFontScaling>
          👥
        </Text>
        <Text style={styles.title} allowFontScaling>
          Contact Book
        </Text>

        <View style={styles.action}>
          <Action />
        </View>
      </View>

      <TextInput
        style={[styles.textInput, isFocused && styles.textInputFocus]}
        placeholder="Search contact..."
        onBlur={() => setIsFocused(false)}
        onFocus={() => setIsFocused(true)}
        onChange={(event) => {
          onChange(event.nativeEvent.text);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 32,
    fontWeight: 600,
    color: "#282A27",
  },

  textInput: {
    height: 48,
    borderColor: "#62605B",
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
    fontSize: 24,
    marginTop: 24,
    marginBottom: 48,
    borderRadius: 4,
  },

  textInputFocus: {},

  header: {
    flexDirection: "row",
    gap: 12,
    alignItems: "flex-end",
  },

  action: {
    marginLeft: "auto",
  },
});
