/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, ImageBackground, Text, TouchableOpacity, ScrollView, InteractionManager, Button, Alert } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { TextInput } from 'react-native-gesture-handler';
import { registro } from '../Registro';
import { createRegistro } from '../RegistroService';





interface Props extends StackScreenProps<any,any>{};

const { width, height } = Dimensions.get('window');



export const StorageScreen = ( {navigation}:Props ) => {


  

  const [state, setState] = useState<registro>({
    Nombre: "",
    Documento: "",
    nFinca: "",
    Ubicacion: "",
    tCultivo: "",
    clonCacao: "",
    //createAt: new Date()

  })

  const handleChangeText = (name: any, value: any) => {
    setState({...state, [name]: value})
  }

  const onSend = async () => {
    const res = await createRegistro(state)
    alert('Registro guardado!')
    /* console.log(res.data); */
  }

/*   const onSend = async () => {
    await addDoc(collection(db, 'inferencias'), state);
  } */

  const storage = () => {
    onSend()
    navigation.navigate('ModelScreen')
  }
  /* const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  const handleCreateAccount = () => {
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log("Cuenta creada")
      const user = userCredential.user
      console.log(user)
      navigation.navigate('InicioScreen')
    })
    .catch(error => {
      console.log(error)
      Alert.alert(error.message)
    })
  } */

  //const saveNewUser = async () => {
  //  if (state.Nombre === ''){
  //    alert('Please provide a name')
  //  } else {
  //    await firebase.db.collection('users').add({
  //      Nombre: state.Nombre,
  //      Documento: state.Documento,
  //      Correo: state.Correo,
  //      Contraseña: state.Contraseña,
  //      nFinca: state.nFinca,
  //      Ubicacion: state.Ubicacion,
  //      tCultivo: state.tCultivo,
  //      clonCacao: state.clonCacao
  //    })
  //  }
  //}

 //const [isSelected, setSelection] = useState(false);

  //Contenido del scrollview

  return (
    <View style={styles.container}>
      <ImageBackground
          style={styles.imagescreen}
          source={ require('../images/screen3.jpg')}
      />
      
      <View style={styles.panel}> 

        <View style={styles.margen}> 
          <Text></Text>
        </View>  

        <ScrollView style={{flex:1, height:height}}>
          
          <Text style = {[
                      styles.text, 
                      styles.textTittle,
                  ]}
                  >
                Realiza el registro de la prediccion actual
          </Text>

          <Text style = {styles.textPregunta}>
            Nombre completo*
          </Text>

          <TextInput
            style={styles.inputNombre}
            placeholder="ingresa tu nombre"
            onChangeText={(value) => handleChangeText("Nombre",  value)}
          />

          <View style={{flexDirection:'row'}}>
            <Text style = {styles.textPreguntaTipo}>
                Tipo *
            </Text>

            <Text style = {styles.textPreguntaDocumento}>
                Número de documento*
            </Text>
          </View>

          <View style={{flexDirection:'row'}}>
            <TextInput
                style={styles.inputTipo}
                placeholder="CC"
                editable={false}
                
            />
            <TextInput
                style={styles.inputDocumento}
                placeholder="Número"
                onChangeText={(value) => handleChangeText("Documento",  value)}
                keyboardType = 'number-pad'
                />
          </View>

         {/*  <Text style = {styles.textPreguntaEmail}>
              Email*
          </Text>

          <TextInput
              style={styles.inputNombre}
              placeholder="ingresa tu correo electrónico"
              keyboardType="email-address"
              onChangeText={(text) => setEmail(text)}
          /> */}
          
          {/* <Text style = {styles.textPreguntaEmail}>
            Contraseña*
          </Text>

          <TextInput
              style={styles.inputNombre}
              placeholder="************"
              secureTextEntry={true}
              onChangeText={(text) => setPassword(text)}
          />
 */}
          {/*<Text style = {styles.textPreguntaEmail}>
            Confirmar Contraseña*
          </Text>

          <TextInput
              style={styles.inputNombre}
              placeholder="************"
              secureTextEntry={true}
                />*/}

          <Text style = {styles.textPreguntaFinca}>
              Nombre de tu finca
          </Text>
          
          <TextInput
              style={styles.inputNombre}
              placeholder="ingresa el nombre de tu finca"
              onChangeText={(value) => handleChangeText("nFinca",  value)}
          />

          <Text style = {styles.textPreguntaFinca}>
              Ubicación
          </Text>
          
          <TextInput
              style={styles.inputNombre}
              placeholder="ingresa la ubicación"
              onChangeText={(value) => handleChangeText("Ubicacion",  value)}
          />

          <View style={{flexDirection:'row'}}>
            <Text style = {styles.textPreguntaAreaTotal}>
                Tamaño del cultivo de cacao
            </Text>

            <Text style = {styles.textPreguntaUnidadesCultivo}>
                Unidades
            </Text>
          </View>

          <View style={{flexDirection:'row'}}>
            <TextInput
                style={styles.inputAreaTotal}
                placeholder="100"
                onChangeText={(value) => handleChangeText("tCultivo",  value)}
                keyboardType = 'number-pad'
            />
            <TextInput
                style={styles.inputUnidades}
                placeholder="Hectareas"
                editable={false}
                />
          </View>
          <View style={styles.margenInferior}></View>

          <Text style = {styles.textPregunta}>
              Tipo de Cacao 
          </Text>
          
          <TextInput
              style={styles.inputNombre2}
              placeholder="ingresa el clon detectado"
              onChangeText={(value) => handleChangeText("clonCacao",  value)}
          />

          <View style={styles.margenInferior}> 

          <TouchableOpacity
              style={styles.buttonCp}
              onPress={storage}
            > 
            {/*navigation.navigate('InicioScreen')*/}
              <Text style= { styles.textButton }>{'Guardar registro'}</Text>
          </TouchableOpacity>
          </View> 
          
          <View style={styles.margenInferior}> 
            <Text></Text>
          </View> 


                
                {/*{ 
                  matriz.map((item) => {
                    return (
                        <View key = {item.key}>
                        {item.action}
                        </View>
                        )
                    })
                }*/}
        </ScrollView>
        
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
    height: height*0.25,
    width: width,
  },
  panel:{
    backgroundColor: 'white',
    height: height*0.85,
    width: width,
    position: 'absolute',
    flex:1,
    bottom: -30,
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
    marginBottom: 20, 
  },
  textPregunta:{
    fontFamily: 'Mulish',
    fontSize: 16,
    color: 'black', 
    paddingLeft: width*0.11
  },
  inputNombre: {
    backgroundColor:'#F5F5F5',
    color: '#9E9E9E',
    alignSelf:'center',
    width: width*0.8,
    height: height*0.06,
    borderRadius: 10,
    padding: 15,
  },
  inputNombre2: {
    backgroundColor:'#F5F5F5',
    color: '#9E9E9E',
    alignSelf:'center',
    width: width*0.8,
    height: height*0.06,
    borderRadius: 10,
    padding: 15,
    marginBottom:30,
  },
  textDocumento:{
    fontFamily: 'Mulish',
    fontSize: 16,
    fontWeight: "bold",
    color: 'black',
    marginTop: 10, 
    paddingLeft: width*0.11
  },
  inputTipo: {
    backgroundColor:'#F5F5F5',
    color: '#9E9E9E',
    width: width*0.2,
    height: height*0.06,
    borderRadius: 10,
    marginLeft: width*0.10,
    paddingLeft: 15
  },
  textPreguntaTipo:{
    fontFamily: 'Mulish',
    fontSize: 16,
    color: 'black',
    marginTop: 10, 
    paddingLeft: width*0.11
  },
  textPreguntaDocumento:{
    fontFamily: 'Mulish',
    fontSize: 16,
    color: 'black',
    marginTop: 10, 
    paddingLeft: width*0.2
  },
  inputDocumento: {
    backgroundColor:'#F5F5F5',
    color: '#9E9E9E',
    width: width*0.5,
    height: height*0.06,
    borderRadius: 10,
    marginLeft: width*0.10,
    paddingLeft: 15
  },
  textPreguntaEmail:{
    fontFamily: 'Mulish',
    fontSize: 16,
    color: 'black',
    marginTop: 10, 
    paddingLeft: width*0.11
  },
  politicas:{
    flexDirection:'row',
    fontFamily: 'Mulish',
    alignSelf: 'center',
    justifyContent:'space-between',
    marginTop:10,
  },
  checkbox: {
    alignSelf: "center",
  },
  buttonCp: {
    backgroundColor: '#2094FE',
    width: width*0.8, 
    height: height*0.065,
    alignSelf: 'center',
    borderRadius: 10,
    borderTop: 10,
  },
  textButton: {
    fontSize: 16,
    color: 'white',
    alignSelf: 'center',
    fontWeight: "bold",
    margin: height*0.015,
    justifyContent:'center',
  },
  textPreguntaFinca:{
    fontFamily: 'Mulish',
    fontSize: 16,
    color: 'black',
    marginTop: 10, 
    paddingLeft: width*0.11
  },
  textPreguntaAreaTotal:{
    fontFamily: 'Mulish',
    fontSize: 16,
    color: 'black',
    marginTop: 10, 
    paddingLeft: width*0.11
  },
  textPreguntaUnidades:{
    fontFamily: 'Mulish',
    fontSize: 16,
    color: 'black',
    marginTop: 10,
    paddingLeft: 82, 
  },
  inputAreaTotal: {
    backgroundColor:'#F5F5F5',
    color: '#9E9E9E',
    width: width*0.5,
    height: height*0.06,
    borderRadius: 10,
    marginLeft: width*0.10,
    paddingLeft: 15
  },
  inputUnidades: {
    backgroundColor:'#F5F5F5',
    color: '#9E9E9E',
    width: width*0.25,
    height: height*0.06,
    borderRadius: 10,
    marginLeft: width*0.05,
    paddingLeft: 15
  },
  inputunidades2: {
    backgroundColor:'#F5F5F5',
    color: '#9E9E9E',
    width: width*0.25,
    height: height*0.06,
    borderRadius: 10,
    marginLeft: width*0.05,
    paddingLeft: 15,
    marginBottom: 20,
  },
  textPreguntaUnidadesCultivo:{
    fontFamily: 'Mulish',
    fontSize: 16,
    color: 'black',
    marginTop: 10, 
    paddingLeft: 12,
  },
  textPreguntaUnidadesCultivo2:{
    fontFamily: 'Mulish',
    fontSize: 16,
    color: 'black',
    marginTop: 10, 
    paddingLeft: 38,
  },
  margen:{
    marginVertical:3
  },
  margenInferior:{
    marginBottom:15
  },
  margenInferior2:{
    marginTop:15
  },
})
