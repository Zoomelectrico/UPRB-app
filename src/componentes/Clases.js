import React, { Component } from 'react';
import firebase from 'firebase';
import _ from 'lodash';
import { FlatList, View } from 'react-native';
import { connect } from 'react-redux';
import Clase from './Clase';
import { Spinner } from './reusables/';

class Clases extends Component {
	state = { cargando: true, snapshot: {} }

	componentDidMount() {
		const { nombre } = this.props.navigation.state.params;
		firebase.database().ref(`/Departamentos/${nombre}`)
			.on('value', async (dept) => {
				const clases = dept.val().clases;
				const data = [];
				for (let i = 0; i < clases.length; i++) {
					await firebase.database().ref(`/Clases/${clases[i]}`).once('value')
					.then((snapshot) => {
						const clase = snapshot.val();
						clase.codigo = clases[i];
						data.push(clase);
					});
				}
				this.setState({ cargando: false, snapshot: data });
			});
	}

	prepararDatos() {
		const datos = _.map(this.state.snapshot, (o) => {
			return {
				nombre: o.nombre, 
				codigo: o.codigo
			};
		});
		return datos;
	}

	generadorLista() {
		const { navigate } = this.props.navigation;
		if (!this.state.cargando) {
			return (
				<FlatList
					numColumns={1}
					data={this.prepararDatos()}
					keyExtractor={(item) => item.nombre}
					renderItem={({ item }) => 
					<Clase 
						nombre={item.nombre} 
						codigo={item.codigo} 
						onPress={() => navigate('Secciones', { codigo: this.props.codigo })} 
					/>}
				/>
			);
		}
		return <Spinner tamano={'small'} />;
	}

	render() {
		return (
			<View>
				{this.generadorLista()}
			</View>
		);
	}
}

const mapStateToProps = (state) => {
	return { datos: state };
};

export default connect(mapStateToProps)(Clases);
