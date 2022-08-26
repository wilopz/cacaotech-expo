import React from "react";
import {
    StyleSheet,
    Text,
    ImageBackground,
    View,
    ActivityIndicator,
} from "react-native";

export default function Output(props: any) {
    const { status, image, predictions, error, probability } = props;
    let output;

    if (!error) {
        if (status === "modelReady" && !image)
            output = <Text style={styles.placeholder}>&uarr;</Text>;
        else if (status === "finished") {
            output = (
                <ImageBackground
                    source={image}
                    style={styles.predictedImage}
                    imageStyle={styles.predictedImageExtras}
                >
                <View style={styles.prediction}>
                    {/* <Text style={styles.predictedHeader}>
                        El fruto corresponde a un clon del tipo:{" "}
                    </Text> */}
                    <Text style={styles.predictedValue}>
                        {predictions}{"\n"}{probability}{"%"}
                    </Text>
                </View>
                </ImageBackground>
              );
        } else output = <ActivityIndicator size="large" animating={true} />;
    } else output = <Text>Por favor intente nuevamente.</Text>;

    return output;
}

const styles = StyleSheet.create({
    prediction: {
        alignItems: "center",
    },
    predictedImage: {
        width: 250,
        height: 250,
        alignItems: "center",
        justifyContent: "center",
    },
    placeholder: { fontSize: 50 },
    predictedImageExtras: { 
        borderRadius: 20,
        opacity: 0.2,
    },
    predictedHeader: { fontSize: 16, color: "black" },
    predictedValue: {
        fontSize: 48,
        fontWeight: "bold",
        color: "#2094FE",
        shadowOpacity: 0.75,
        shadowRadius: 5,
        shadowColor: "black",
        shadowOffset: { height: 10, width: 10 },
    },
});