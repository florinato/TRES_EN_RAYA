#!/bin/bash

# Actualizar e instalar dependencias básicas
sudo apt-get update
sudo apt-get install -y openjdk-8-jdk wget unzip

# Configurar JAVA_HOME para Java 8
export JAVA_HOME="/usr/lib/jvm/java-8-openjdk-amd64"
export PATH=$JAVA_HOME/bin:$PATH

# Configurar Android SDK
SDK_PATH="$HOME/android-sdk"
mkdir -p $SDK_PATH/cmdline-tools/latest

# Descargar y descomprimir herramientas de línea de comandos de Android
wget https://dl.google.com/android/repository/commandlinetools-linux-8512546_latest.zip -O commandlinetools-linux.zip
unzip commandlinetools-linux.zip -d $SDK_PATH/cmdline-tools/latest/

# Establecer variables de entorno para Android SDK
export ANDROID_HOME=$SDK_PATH
export PATH=$PATH:$ANDROID_HOME/cmdline-tools/latest/cmdline-tools/bin:$ANDROID_HOME/platform-tools

# Instalar herramientas de compilación específicas de Android
sdkmanager --install "build-tools;34.0.0" "platform-tools" "platforms;android-34"

# Instalar Cordova globalmente si no está instalado
npm install -g cordova

# Crear un proyecto Cordova si no existe
if [ ! -d "platforms" ]; then
    cordova create .
    cordova platform add android
fi

# Construir la aplicación para Android
cordova build android

echo "Configuración completada. ¡Ahora puedes compilar y probar tu aplicación!"

