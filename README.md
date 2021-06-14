# Set Up:
- Instalar Node (versión usada en este repo 14.4.0): https://nodejs.org/en/download/
- Con node se instala NPM
- Para poder hacer pruebas en Android. seguir esta guía: https://reactnative.dev/docs/environment-setup
  - seguir las instrucciones para bajar Android Studio y habilitar pruebas con un dispositivo real o un emulador.
  - Una vez instalado y configurado lo necesario, si se quiere usar un dispositivo real, ver: https://reactnative.dev/docs/running-on-device
  - Ignorar las partes de crear un nuevo proyecto de react-native
- Una vez que tiene todo instalado, en la raíz del proyecto correr en orden:
  - `npm install`
  - `yarn install` (si no tiene yarn o les muestra error de variable de entorno. Correr `npm install -g yarn`)
  - Para probar con un emulador de android o un celular conectado a la compu (ver la guía mencionado anteriormente): `npx react-native run-android`


# Guías:
- Librería usada para seguridad biometríca. `react-native-biometrics`: https://www.npmjs.com/package/react-native-biometrics
- Guía oficial de react-native: https://reactnative.dev/docs/getting-started
- Guía oficial de react: https://reactjs.org/docs/getting-started.html