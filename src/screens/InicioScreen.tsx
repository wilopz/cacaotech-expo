import { View, StyleSheet, ImageBackground, Dimensions, Text, TouchableOpacity } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { TextInput } from 'react-native-gesture-handler';

interface Props extends StackScreenProps<any,any>{};

const { width, height } = Dimensions.get('window');

export const InicioScreen = ( {navigation}:Props ) => {
  return (
    <View style = {styles.container}>
      <ImageBackground
          style={styles.imagescreen}
          source={ require('../images/screen2.jpg')}
      />

      <View style = {styles.panel}>
        <Text style = {[
                styles.text, 
                styles.textTittle
            ]}>
          Bienvenido de vuelta
        </Text>

        <Text style = {[
                styles.text, 
                styles.text1
            ]}>
          ingresa tus credenciales
        </Text>

        <TextInput
            style={styles.inputEmail}
            placeholder="ingresa tu email"
        />
        <TextInput
            style={styles.inputContrasena}
            placeholder="contraseña"
        />

        <TouchableOpacity
            style={styles.buttonCp}
            onPress={ () => navigation.navigate('ModelScreen')}
          > 
            <Text style= { styles.textButton }>{'iniciar sesión'}</Text>
        </TouchableOpacity> 

        <TouchableOpacity 
              onPress={ () => navigation.navigate('ModelScreen') }
        >
            <Text style = {styles.textRegistro} >
              ¿No tienes una cuenta? {"\n"}
              {'            '}Registrate
            </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection:'column',
    height: height,
    width: width,
  },
  imagescreen: {
    height: height*0.55,
    width: width,
  },
  panel:{
    backgroundColor: 'white',
    height: height*0.60,
    width: width,
    position: 'absolute',
    bottom: 0,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  text: {
    fontFamily: 'Mulish',
    alignSelf: 'center',
  },
  textTittle:{
    fontSize: 30,
    fontWeight: "bold",
    color: 'black',
    marginTop: 30, 
  },
  text1:{
    fontSize: 24,
    marginTop: 5,
    color: '#9E9E9E',
  },
  inputEmail:{
    backgroundColor:'#F5F5F5',
    color: '#9E9E9E',
    marginTop: 50,
    alignSelf:'center',
    width: width*0.8,
    height: height*0.06,
    borderRadius: 10,
    padding: 15,
  },
  inputContrasena:{
    backgroundColor:'#F5F5F5',
    color: '#9E9E9E',
    marginVertical: 20,
    alignSelf:'center',
    width: width*0.8,
    height: height*0.06,
    borderRadius: 10,
    padding: 15,
  },
  buttonCp: {
    backgroundColor: '#2094FE',
    width: width*0.8, 
    height: height*0.065,
    alignSelf: 'center',
    borderRadius: 10,
    marginTop: 20,
  },
  textButton: {
    fontSize: 16,
    color: 'white',
    alignSelf: 'center',
    fontWeight: "bold",
    margin: height*0.015,
  },
  textRegistro: {
    fontSize: 16,
    color: '#2094FE',
    alignSelf:'center',
    marginTop:20,
  }
  
})