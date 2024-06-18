import React from "react";
import { StyleSheet, SafeAreaView, Text, View } from "react-native";

export interface AppProps {
  Header: React.ElementType;
  Body: React.ElementType;
}

export class App extends React.Component<AppProps> {
  render() {
    const { Header, Body } = this.props;

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.wrapper}>
          <Header />
          <Body />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ECEEED",
    justifyContent: "flex-start",
    overflow: "scroll",
  },

  wrapper: {
    marginVertical: 24,
    width: 720,
    marginHorizontal: "auto",
  },
});
