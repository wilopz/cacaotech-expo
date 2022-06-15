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
                <View>
                    <Text style={styles.predictedNumberHeader}>
                        Probability:{" "}
                    </Text>
                    <Text style={styles.predictedNumber}>
                        {Math.round(predictions.dataSync()[3])}{" "}
                        {/* convert tensor into array and access the first category probability*/}
                        <Text style={styles.predictedNumberPercentage}> %</Text>
                    </Text>
                </View>
            );
        } else output = <ActivityIndicator size="large" animating={true} />;
    } else output = <Text>Please try again</Text>;

    return output;
}

const styles = StyleSheet.create({
    predictedImage: {
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
    },
    placeholder: { fontSize: 50 },
    predictedImageExtras: { borderRadius: 20 },
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