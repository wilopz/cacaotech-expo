// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Open up App.tsx to start working on your app!</Text>
//       <Text> Hola Patricio!</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });



import React, { useState, useEffect } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import * as tf from "@tensorflow/tfjs";
import { fetch, bundleResourceIO } from "@tensorflow/tfjs-react-native";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from 'expo-file-system'
import * as jpeg from "jpeg-js";
import Output from "./Output";

// async function getPermissionAsync() {
//   if (Constants.platform.ios) {
//     const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
//     if (status !== "granted") {
//       alert("Permission for camera access required.");
//     }
//   }
// }

async function imageToTensor(source: any) {
  // load the raw data of the selected image into an array
  const imgB64 =  await FileSystem.readAsStringAsync(source.uri, {
    encoding: FileSystem.EncodingType.Base64,
  });
  const imgBuffer = tf.util.encodeString(imgB64, 'base64').buffer;
  const rawImageData = new Uint8Array(imgBuffer) 
  // const response = await fetch(source.uri, {}, { isBinary: true });
  // const rawImageData = await response.arrayBuffer();
  const { width, height, data } = jpeg.decode(rawImageData, {
    useTArray: true, // Uint8Array = true
  });

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
  const img = tf.tensor3d(buffer, [width, height, 3]);

  // calculate square center crop area
  const shorterSide = Math.min(width, height);
  const startingHeight = (height - shorterSide) / 2;
  const startingWidth = (width - shorterSide) / 2;
  const endingHeight = startingHeight + shorterSide;
  const endingWidth = startingWidth + shorterSide;

  // slice and resize the image
  const sliced_img = img.slice(
    [startingWidth, startingHeight, 0],
    [endingWidth, endingHeight, 3]
  );
  const resized_img = tf.image.resizeBilinear(sliced_img, [224, 224]);

  // add a fourth batch dimension to the tensor
  const expanded_img = resized_img.expandDims(0);

  // normalise the rgb values to -1-+1
  return expanded_img.toFloat().div(tf.scalar(127)).sub(tf.scalar(1));
}

export default function App() {
  const [isTfReady, setTfReady] = useState(false); // gets and sets the Tensorflow.js module loading status
  const [model, setModel] = useState(null); // gets and sets the locally saved Tensorflow.js model
  const [image, setImage] = useState(null); // gets and sets the image selected from the user
  const [predictions, setPredictions] = useState(null); // gets and sets the predicted value from the model
  const [error, setError] = useState(false); // gets and sets any errors
  // console.log("[+] Application started")

  useEffect(() => {
    (async () => {
      await tf.ready(); // wait for Tensorflow.js to get ready
      setTfReady(true); // set the state
      console.log("[+] TensorFlow JS: Ready")
      // bundle the model files and load the model:
      console.log("[+] Loading Model")
      const model = require("./assets/final_model.json");
      const weights = require("./assets/final_model.bin");
      // const model = require("./assets/model.json");
      // const weights = require("./assets/model.bin");
      const loadedModel = await tf.loadLayersModel(
        bundleResourceIO(model, weights)
      );
      console.log("[+] Model Loaded")

      setModel(loadedModel); // load the model to the state
      // getPermissionAsync(); // get the permission for camera roll access for iOS users
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
        const predictions = await model.predict(imageTensor); // send the image to the model
        console.log(predictions.toString())
        console.log(`Predictions: ${predictions.dataSync()}`)
        setPredictions(predictions); // put model prediction to the state
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
      Restart
    </Text>
  );

  if (!error) {
    if (isTfReady && model && !image && !predictions) {
      status = "modelReady";
      statusMessage = "Model is ready.";
    } else if (model && image && predictions) {
      status = "finished";
      statusMessage = "Prediction finished.";
      showReset = true;
    } else if (model && image && !predictions) {
      status = "modelPredict";
      statusMessage = "Model is predicting...";
    } else {
      status = "modelLoad";
      statusMessage = "Model is loading...";
    }
  } else {
    statusMessage = "Unexpected error occured.";
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
          onPress={model && !predictions ? handlerSelectImage : () => { }} // Activates handler only if the model has been loaded and there are no predictions done yet
        >
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
  status: { marginBottom: 10 },
  reset: { color: "blue" },
  imageContainer: {
    width: 300,
    height: 300,
    borderRadius: 20,
    opacity: 0.7,
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
});