import { StyleSheet, View, TouchableOpacity, Text, ImageBackground, Dimensions } from "react-native";
import React, { useState, useEffect } from "react";

import { fetch, bundleResourceIO } from "@tensorflow/tfjs-react-native";
import * as tf from "@tensorflow/tfjs";

import * as ImagePicker from "expo-image-picker";
import * as FileSystem from 'expo-file-system'
import * as jpeg from "jpeg-js";


import Output from "./Output";

import { StackScreenProps } from '@react-navigation/stack';

interface Props extends StackScreenProps<any,any>{};

const { width, height } = Dimensions.get('window');

async function imageToTensor(source: any) {
  // load the raw data of the selected image into an array
  const imgB64 =  await FileSystem.readAsStringAsync(source.uri, {encoding: FileSystem.EncodingType.Base64});
  const imgBuffer = tf.util.encodeString(imgB64, 'base64').buffer;
  const rawImageData = new Uint8Array(imgBuffer);

  const { width, height, data } = jpeg.decode(rawImageData, { useTArray: true });

  // remove the alpha channel:
  const buffer = new Uint8Array(width * height * 3);
  let offset = 0;
  for (let i = 0; i < buffer.length; i += 3) {
    buffer[i] = data[offset];
    buffer[i + 1] = data[offset + 1];
    buffer[i + 2] = data[offset + 2];
    offset += 4;
  }
  // transform image data into a tensor
  const img = tf.tensor3d(buffer, [width, height, 3]); //######
  
  const resized_img = tf.image.resizeBilinear(img, [224, 224]);

  // add a fourth batch dimension to the tensor
  const expanded_img = resized_img.expandDims(0);

  return expanded_img
}

export const ModelScreen = ( {navigation}:Props ) => {

  const [isTfReady, setTfReady] = useState(false); // gets and sets the Tensorflow.js module loading status
  const [model, setModel] = useState(null); // gets and sets the locally saved Tensorflow.js model
  const [image, setImage] = useState(null); // gets and sets the image selected from the user
  const [predictions, setPredictions] = useState(null); // gets and sets the predicted value from the model
  const [error, setError] = useState(false); // gets and sets any errors
  const [probability, setProbability] = useState(null); // gets and sets any errors
  console.log("[+] Application started")

  useEffect(() => {
    (async () => {
      await tf.ready(); // wait for Tensorflow.js to get ready
      setTfReady(true); // set the state
      console.log("[+] TensorFlow JS: Ready")
      // bundle the model files and load the model:
      console.log("[+] Loading Model")
      const model = require("./modelo/model.json");
      const weights = require("./modelo/model.bin");
      const loadedModel = await tf.loadLayersModel(
        bundleResourceIO(model, weights)
      );
      console.log("[+] Model Loaded")

      setModel(loadedModel); // load the model to the state
    })();
  }, []);

  async function handlerSelectImage() {
    try {
      let response = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true, // on Android user can rotate and crop the selected image; iOS users can only crop
        quality: 1, // go for highest quality possible
        aspect: [1, 1], // maintain aspect ratio of the crop area on Android; on iOS crop area is always a square
      });

      if (!response.cancelled) {
        const source = { uri: response.uri };
        setImage(source); // put image path to the state
        const imageTensor = await imageToTensor(source); // prepare the image
        let inference = await model.predict(imageTensor); // send the image to the model
        inference = inference.dataSync();
        let classIndex: number = inference.indexOf(Math.max(...inference));
        let types: string[]= ['CCN51', 'FEAR5', 'FSV41', 'TCS01', 'TCS06', 'TCS19']
        let res = {
          'CCN51': inference[0].toFixed(4)*100,
          'FEAR5': inference[1].toFixed(4)*100,
          'FSV41': inference[2].toFixed(4)*100,
          'TCS01': inference[3].toFixed(4)*100,
          'TCS06': inference[4].toFixed(4)*100,
          'TCS19': inference[5].toFixed(4)*100
        }
        let result: any = types[classIndex]
        let probability: any = (inference[classIndex]*100).toFixed(2);
        console.log("Predictions: ");
        console.log(res)
        setPredictions(result); // put model prediction to the state
        setProbability(probability)
      }
    } catch (error) {
      setError(error);
    }
  }

  function reset() {
    setPredictions(null);
    setProbability(null);
    setImage(null);
    setError(false);
  }

  let status, statusMessage, showReset;
  const resetLink = (
    <Text onPress={reset} style={styles.reset}>
      Reiniciar
    </Text>
  );

  if (!error) {
    if (isTfReady && model && !image && !predictions) {
      status = "modelReady";
      statusMessage = "Modelo Preparado!";
    } else if (model && image && predictions) {
      status = "finished";
      statusMessage = "Prediccion Finalizada.";
      showReset = true;
    } else if (model && image && !predictions) {
      status = "modelPredict";
      statusMessage = "Prediciendo...";
    } else {
      status = "modelLoad";
      statusMessage = "Cargando modelo...";
    }
  } else {
    statusMessage = "Error inesperado!";
    showReset = true;
    console.log(error);
  }

  return (
    <View style={styles.container}>
      <ImageBackground
          style={styles.imagescreen}
          source={ require('../images/screen4.jpg')}
      />
      
      <View style = {styles.panel}>
        <View style={styles.textos}>
            <Text style = {[
                    styles.text, 
                    styles.textTittle,    
                ]}>
              Hola de nuevo!!
            </Text>

            <Text style = {[
                    styles.text, 
                    styles.text3
                ]}>
              Adjunta aqui las fotografias de tus frutos para que podamos identificarlas
            </Text>
        </View>
        <View style={styles.innercontainer}>
          <Text style={styles.status}>
            {statusMessage} {showReset ? resetLink : null}
          </Text>
          <TouchableOpacity
            style={styles.imageContainer}
            onPress={model && !predictions ? handlerSelectImage : () => { }} 
            // Activates handler only if the model has been loaded and there are no predictions done yet
          >
            {/* <ImageBackground
              source={image}
              style={styles.predictedImage}
              imageStyle={styles.predictedImageExtras}
            ></ImageBackground> */}
            <View>
            <Output
              status={status}
              image={image}
              predictions={predictions}
              error={error}
              probability={probability}
            />
          </View>
          </TouchableOpacity>
          

        </View>
        <View style={{
          marginBottom: height*0.01,
          marginTop: height*0.01
        }}>
        <TouchableOpacity
            style={styles.buttonCp}
            onPress={ () => navigation.navigate('StorageScreen')}
          > 
            <Text style= { styles.textButton }>{'Registrar'}</Text>
        </TouchableOpacity> 
        </View>
        <View>
        <TouchableOpacity
            style={styles.buttonCp}
            onPress={ () => navigation.navigate('HistoryScreen')}
          > 
            <Text style= { styles.textButton }>{'Historial'}</Text>
        </TouchableOpacity> 
        </View>
      </View>
      
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'flex-start'
  },
  panel:{
    backgroundColor: 'white',
    height:'80%',
    width: '100%',
    flex: 1,
    position: 'absolute',
    bottom: 0,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  imagescreen: {
    height: '55%',
    width: '100%',
  },
  innercontainer: {
    marginTop: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  status: { marginBottom: 10, fontSize: 16 },
  reset: { color: "#2094FE" },
  imageContainer: {
    width: 250,
    height: 250,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "lightgrey",
    borderColor: "white",
    borderWidth: 3,
    borderStyle: "dotted",
  },
  predictedNumberHeader: { fontSize: 12, color: "black" },
    predictedNumberPercentage: { fontSize: 24, color: "black" },
    predictedNumber: {
        fontSize: 64,
        fontWeight: "bold",
        color: "darkorange",
        shadowOpacity: 0.75,
        shadowRadius: 5,
        shadowColor: "black",
        shadowOffset: { height: 10, width: 10 },
    },
  predictedImage: {
    width: 250,
    height: 250,
    opacity: 0.1,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonCp: {
    backgroundColor: '#2094FE',
    width: width*0.8, 
    height: height*0.065,
    alignSelf: 'center',
    borderRadius: 10,
  },
  textButton: {
    fontSize: 16,
    color: 'white',
    alignSelf: 'center',
    fontWeight: "bold",
    margin: height*0.015,
  },
  text: {
    fontFamily: 'Mulish',
    alignSelf: 'center',
  },
  textTittle:{
    fontSize: 30,
    fontWeight: "bold",
    bottom: 70,
    color: 'black',
  },
  text3:{
      fontSize: 16,
      bottom: 50,
      color: 'black',
      textAlign: 'center',
      width: 350
  },
  textos: {
    height: 175, 
    bottom: -100,
  },
  placeholder: { fontSize: 50 },
  predictedImageExtras: { borderRadius: 20 },
});