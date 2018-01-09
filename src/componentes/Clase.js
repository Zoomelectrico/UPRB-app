import React from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';

const Clase = ({ nombre, codigo, onPress }) => {
	return (
		<TouchableWithoutFeedback onPress={onPress}>
			<View style={styles.container}>
				<View style={styles.row}>
					<View style={styles.textContainer}>
						<Text style={styles.text}>{nombre}</Text>
					</View>
          <View style={styles.textContainer}>
						<Text style={styles.text}>{codigo}</Text>
					</View>
				</View>
			</View>
		</TouchableWithoutFeedback>
	);
};

const styles = {
	container: {
		width: '100%',
		height: 100,
		justifyContent: 'center',
		alignItems: 'center'
	},
	row: {
		flex: 1,
		flexDirection: 'column',
		height: '95%',
		width: '95%',
		backgroundColor: '#fff'
	},
	textContainer: {
		flex: 1,
		justifyContent: 'center'
	},
	text: {
		alignSelf: 'center',
		textAlign: 'center',
		color: '#rgb(181, 184, 185)',
		fontFamily: 'Roboto',
		fontSize: 16
	}
};

export default Clase;
