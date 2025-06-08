import { Provider } from "react-redux";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { RootNavigator } from "@/navigation";
import { persistor, store } from "@/redux/store";
import { PersistGate } from "redux-persist/integration/react";
import Toast from "react-native-toast-message";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { MenuProvider } from 'react-native-popup-menu';
export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <KeyboardProvider>
          <PersistGate persistor={persistor}>
            <MenuProvider>
              <RootNavigator />
                </MenuProvider>
            <Toast />
          </PersistGate>
        </KeyboardProvider>
      </Provider>
    </GestureHandlerRootView>
  );
}
