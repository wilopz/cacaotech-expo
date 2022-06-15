import { StyleSheet, View, TouchableOpacity, Text, ImageBackground } from "react-native";
import React, { useState, useEffect } from "react";

import { fetch, bundleResourceIO } from "@tensorflow/tfjs-react-native";
import * as tf from "@tensorflow/tfjs";

import * as ImagePicker from "expo-image-picker";
import * as FileSystem from 'expo-file-system'
import * as jpeg from "jpeg-js";


import Output from "./Output";

import { StackScreenProps } from '@react-navigation/stack';

interface Props extends StackScreenProps<any,any>{};

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
  console.log("[+] Application started")

  useEffect(() => {
    (async () => {
      await tf.ready(); // wait for Tensorflow.js to get ready
      setTfReady(true); // set the state
      console.log("[+] TensorFlow JS: Ready")
      // bundle the model files and load the model:
      console.log("[+] Loading Model")
      const model = require("./modelo/final_model.json");
      const weights = require("./modelo/final_model.bin");
      // const model = require("./assets/model.json");
      // const weights = require("./assets/model.bin");
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
        let predictions = await model.predict(imageTensor); // send the image to the model
        predictions = predictions.dataSync();
        let classIndex = predictions.indexOf(Math.max(...predictions));
        let classes: string[]= ['CCN51', 'FEAR5', 'TCS01', 'TCS19']
        let result: any = classes[classIndex]
        console.log(predictions.toString())
        // console.log(`Predictions: ${predictions.dataSync()}`)
        setPredictions(result); // put model prediction to the state
      }
    } catch (error) {
      setError(error);
    }
  }

  function reset() {
    setPredictions(null);
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
      <View style={styles.innercontainer}>
        <Text style={styles.status}>
          {statusMessage} {showReset ? resetLink : null}
        </Text>
        <TouchableOpacity
          style={styles.imageContainer}
          onPress={model && !predictions ? handlerSelectImage : () => { }} 
          // Activates handler only if the model has been loaded and there are no predictions done yet
        >
          <ImageBackground
            source={image}
            style={styles.predictedImage}
            imageStyle={styles.predictedImageExtras}
          ></ImageBackground>
        </TouchableOpacity>
        <Output
          status={status}
          image={image}
          predictions={predictions}
          error={error}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#67a4cf",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  innercontainer: {
    marginTop: -50,
    alignItems: "center",
    justifyContent: "center",
  },
  status: { marginBottom: 10, fontSize: 16 },
  reset: { color: "blue" },
  imageContainer: {
    width: 300,
    height: 300,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "lightgrey",
    borderColor: "white",
    borderWidth: 3,
    borderStyle: "dotted",
  },
  predictedNumberHeader: { fontSize: 12, color: "white" },
    predictedNumberPercentage: { fontSize: 24, color: "white" },
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
    width: 300,
    height: 300,
    alignItems: "center",
    justifyContent: "center",
  },
  placeholder: { fontSize: 50 },
  predictedImageExtras: { borderRadius: 20 },
});