/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableHighlight,
  Dimensions,
} from 'react-native';

import { Colors } from 'react-native/Libraries/NewAppScreen';

import ReactNativeBiometrics from 'react-native-biometrics'

let ScreenHeight = Dimensions.get("window").height;

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const [biometrics, setBiometrics] = useState({
    touchId: false,
    faceId: false,
    biometrics: false,
  });
  const [recognitionSuccess, setRecognitionSuccess] = useState(false);
  const [recognitionFailed, setRecognitionFailed] = useState(false);

  useEffect(() => {
    ReactNativeBiometrics.isSensorAvailable()
      .then((resultObject) => {
        const { available, biometryType } = resultObject
        const availableBiometrics = {
          touchId: false,
          faceId: false,
          biometrics: false,
        };
        if (available && biometryType === ReactNativeBiometrics.TouchID) {
          availableBiometrics.touchId = true;
          console.log('TouchID is supported');
        }
        if (available && biometryType === ReactNativeBiometrics.FaceID) {
          availableBiometrics.faceId = true;
          console.log('FaceID is supported')
        }
        if (available && biometryType === ReactNativeBiometrics.Biometrics) {
          availableBiometrics.biometrics = true;
          console.log('Biometrics is supported')
        }
        setBiometrics(availableBiometrics);
      });
  }, []);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const clickHandler = () => {
    ReactNativeBiometrics.simplePrompt({ promptMessage: 'Cofirmar huella o rostro', cancelButtonText: 'Cancelar' })
      .then((resultObject) => {
        const { success } = resultObject;

        if (success) {
          console.log('successful biometrics provided');
          setRecognitionSuccess(true);
        } else {
          console.log('user cancelled biometric prompt')
          setRecognitionFailed(true);
        }
      })
      .catch(() => {
        console.log('biometrics failed');
        setRecognitionFailed(true);
      });
  };

  const reset = () => {
    setRecognitionSuccess(false);
    setRecognitionFailed(false);
  };

  return (
    <SafeAreaView style={{
      ...backgroundStyle,
      ...styles.container,
    }}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View
        style={styles.innerContainer}>
        {biometrics.touchId && (
          <Text style={styles.text}>
            El dispositivo soporta Touch ID
          </Text>
        )}
        {biometrics.faceId && (
          <Text style={styles.text}>
            El dispositivo soporta Face ID
          </Text>
        )}
        {biometrics.biometrics && (
          <Text style={styles.text}>
            El dispositivo soporta sensores biometricos (huella y/o face id)
          </Text>
        )}
        <TouchableHighlight
          style={styles.btn}
          onPress={clickHandler}
          underlayColor="#0380BE"
          activeOpacity={1}
        >
          <Text style={{
            color: '#fff',
            fontWeight: '600'
          }}>
            {`Autenticarse`}
          </Text>
        </TouchableHighlight>
        {recognitionSuccess && (
          <Text style={styles.text}>
            Autenticación exitosa.
          </Text>
        )}
        {recognitionFailed && (
          <Text style={styles.text}>
            Autenticación incorrecta o cancelada por el usuario.
          </Text>
        )}
        <TouchableHighlight
          style={styles.btn}
          onPress={reset}
          underlayColor="#0380BE"
          activeOpacity={1}
        >
          <Text style={{
            color: '#fff',
            fontWeight: '600'
          }}>
            {`Reset`}
          </Text>
        </TouchableHighlight>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: ScreenHeight,
  },
  innerContainer: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 50,
  },
  text: {
    color: '#fff',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
  },
  btn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '50%',
    borderRadius: 3,
    marginTop: 20,
    marginBottom: 20,
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: '#0391D7'
  }
});

export default App;
