import { observer } from "mobx-react-lite";
import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Modal,
  Pressable,
  TextInput,
} from "react-native";
import { Contact } from "./service";

interface AddContactProps {
  onSubmit: (contact: Contact) => Promise<void>;
}

export const AddContact = observer((props: AddContactProps) => {
  const { onSubmit } = props;

  const [modalVisible, setModalVisible] = React.useState(false);
  const [isInProgress, setIsInProgress] = React.useState<boolean>(false);

  const [state, dispatch] = React.useReducer(
    (state: Contact, action: { type: "CHANGE"; payload: Partial<Contact> }) => {
      if (action.type === "CHANGE") {
        return {
          ...state,
          ...action.payload,
        };
      }

      return state;
    },
    {
      name: "",
      email: "",
      phoneNumber: "",
    }
  );

  const nameId = React.useId();
  const emailId = React.useId();
  const phoneId = React.useId();

  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.title}>Add contact</Text>

            <Text id={nameId}>Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Contact name"
              autoCorrect={false}
              accessibilityLabelledBy={nameId}
              onChange={(e) =>
                dispatch({
                  type: "CHANGE",
                  payload: { name: e.nativeEvent.text },
                })
              }
            />

            <Text id={phoneId}>Phone number</Text>
            <TextInput
              style={styles.input}
              placeholder="Phone number"
              autoCorrect={false}
              accessibilityLabelledBy={phoneId}
              onChange={(e) =>
                dispatch({
                  type: "CHANGE",
                  payload: { phoneNumber: e.nativeEvent.text },
                })
              }
            />

            <Text id={emailId}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Email"
              autoCorrect={false}
              accessibilityLabelledBy={emailId}
              onChange={(e) =>
                dispatch({
                  type: "CHANGE",
                  payload: { email: e.nativeEvent.text },
                })
              }
            />

            <View style={styles.footer}>
              <Pressable
                style={[styles.button]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text>Cancel</Text>
              </Pressable>

              <Pressable
                style={[styles.button, styles.cta]}
                onPress={async () => {
                  const { email, ...rest } = state;

                  const hasEmail =
                    typeof email === "string" && email.trim().length === 0;

                  const payload = hasEmail ? state : rest;

                  setIsInProgress(true);
                  await onSubmit(payload);
                  setIsInProgress(false);

                  setModalVisible(!modalVisible);
                }}
              >
                <Text style={styles.textStyle}>
                  {isInProgress ? "Submitting..." : "Submit"}
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      <Pressable
        style={[styles.button, styles.cta]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.textStyle}>Add contact</Text>
      </Pressable>
    </>
  );
});

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,.3)",
    position: "absolute",
    top: 0,
    width: "100%",
    height: "100%",
  },

  modalView: {
    width: 520,
    margin: 12,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 32,
    alignItems: "flex-start",
  },

  title: {
    fontSize: 24,
    fontWeight: 600,
    marginBottom: 32,
  },

  input: {
    height: 36,
    borderColor: "#62605B",
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
    fontSize: 16,
    marginBottom: 24,
    borderRadius: 4,
    width: "100%",
  },

  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },

  cta: {
    backgroundColor: "#2196F3",
  },

  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },

  footer: {
    flexDirection: "row",
    gap: 24,
    marginTop: 12,
    justifyContent: "flex-end",
    width: "100%",
  },
});
