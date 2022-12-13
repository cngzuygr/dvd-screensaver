import React, { useCallback, useEffect, useState } from "react";
import { View, StyleSheet, Dimensions, processColor, Text } from "react-native";
import Animated, {
	runOnJS,
	useAnimatedStyle,
	useSharedValue,
} from "react-native-reanimated";
import Logo, { LOGO_HEIGHT, LOGO_WIDTH } from "./Logo";

import { withBouncing } from "./withBouncing";

const { width, height } = Dimensions.get("window");

const COLORS = [
	"#FF6633",
	"#FFB399",
	"#FF33FF",
	"#FFFF99",
	"#00B3E6",
	"#E6B333",
	"#3366E6",
	"#999966",
	"#99FF99",
	"#B34D4D",
].map((color) => processColor(color) as unknown as string);

const DVDLogo = () => {
	const color = useSharedValue(COLORS[0]);
	const translateX = useSharedValue(0);
	const translateY = useSharedValue(0);
	const count = useSharedValue(0);
	const [count1, setCount1] = useState(0);

	const onBounce = useCallback(() => {
		"worklet";
		const colorsLeft = COLORS.concat();
		colorsLeft.splice(colorsLeft.indexOf(color.value), 1);
		color.value =
			colorsLeft[Math.round(Math.random() * (colorsLeft.length - 1))];
		runOnJS(counter)();
	}, []);

	function counter() {
		count.value = count.value + 1;
		setCount1(count.value);
	}

	useEffect(() => {
		translateX.value = withBouncing(0, width - LOGO_WIDTH, onBounce);
		translateY.value = withBouncing(0, height - LOGO_HEIGHT, onBounce);
	}, [onBounce, translateX, translateY]);

	const style = useAnimatedStyle(() => ({
		transform: [
			{ translateX: translateX.value },
			{ translateY: translateY.value },
		],
		zIndex: 1,
	}));
	return (
		<View style={styles.container}>
			<View style={styles.counterContainer}>
				<Text style={styles.counterText}>{count.value}</Text>
			</View>
			<Animated.View style={style}>
				<Logo color={color} />
			</Animated.View>
		</View>
	);
};

export default DVDLogo;
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "black",
	},
	counterContainer: {
		alignSelf: "center",
		width: "40%",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#FFFFFFcc",
		height: 60,
		position: "absolute",
		top: 64,
		zIndex: 2,
		borderRadius: 20,
	},
	counterText: {
		fontSize: 18,
		color: "black",
	},
});
