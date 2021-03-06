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
                <View style={styles.prediction}>
                    <Text style={styles.predictedHeader}>
                        El fruto corresponde a un clon del tipo:{" "}
                    </Text>
                    <Text style={styles.predictedValue}>
                        {predictions}{": "}{probability}{"%"}
                    </Text>
                </View>
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
        width: 300,
        height: 300,
        alignItems: "center",
        justifyContent: "center",
    },
    placeholder: { fontSize: 50 },
    predictedImageExtras: { borderRadius: 20 },
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