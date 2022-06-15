import React from "react";
import {
    StyleSheet,
    Text,
    ImageBackground,
    View,
    ActivityIndicator,
} from "react-native";

export default function Output(props: any) {
    const { status, image, predictions, error } = props;
    let output;

    if (!error) {
        if (status === "modelReady" && !image)
            output = <Text style={styles.placeholder}>&uarr;</Text>;
        else if (status === "finished") {
            output = (
                <View style={styles.prediction}>
                    <Text style={styles.predictedHeader}>
                        La imagen corresponde a un fruto del tipo:{" "}
                    </Text>
                    <Text style={styles.predictedValue}>
                        {predictions}{" "}
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
    predictedHeader: { fontSize: 16, color: "white" },
    predictedValue: {
        fontSize: 64,
        fontWeight: "bold",
        color: "#2094FE",
        shadowOpacity: 0.75,
        shadowRadius: 5,
        shadowColor: "black",
        shadowOffset: { height: 10, width: 10 },
    },
});