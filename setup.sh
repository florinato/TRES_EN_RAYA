#!/bin/bash
#archivo configuracion codespace Cordova android
# para dar permiso de ejecucion:
# chmod +x setup.sh
#ejecutar:
#./setup.sh

# Actualizar el sistema y herramientas básicas
sudo apt-get update -y && sudo apt-get upgrade -y

# Instalar Node.js, NPM y Cordova
sudo apt-get install -y nodejs npm
sudo npm install -g cordova

# Instalar el SDK de Android
sudo apt-get install -y openjdk-11-jdk
mkdir -p $HOME/android-sdk/cmdline-tools/latest
cd $HOME/android-sdk/cmdline-tools/latest
wget https://dl.google.com/android/repository/commandlinetools-linux-8512546_latest.zip -O commandlinetools-linux.zip
unzip commandlinetools-linux.zip -d $HOME/android-sdk/cmdline-tools/latest
export PATH=$PATH:$HOME/android-sdk/cmdline-tools/latest/cmdline-tools/bin
sdkmanager --install "build-tools;34.0.0" "platform-tools" "platforms;android-34"

# Establecer variables de entorno
export ANDROID_HOME=$HOME/android-sdk
export PATH=$PATH:$ANDROID_HOME/cmdline-tools/latest/cmdline-tools/bin:$ANDROID_HOME/platform-tools

# Crear un nuevo proyecto Cordova (si no existe)
if [ ! -d "www" ]; then
  cordova create .
fi

# Agregar la plataforma Android
cordova platform add android




