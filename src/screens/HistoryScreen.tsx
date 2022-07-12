import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, ImageBackground, Text, TouchableOpacity, ScrollView, InteractionManager } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { TextInput } from 'react-native-gesture-handler';


interface Props extends StackScreenProps<any,any>{};

const { width, height } = Dimensions.get('window');

export const HistoryScreen = ( {navigation}:Props ) => {

  const [isSelected, setSelection] = useState(false);

  //Contenido del scrollview
  let [matriz, setMatriz] = useState([

    { key:'1',
    action: 
      <>
        <Text style = {[
              styles.text, 
              styles.textTittle
            ]}>
          Historial de análisis
        </Text>
      </>
    },

    { key:'2', 
    action:
      <>
        <View style = {styles.consultas}>
          <View style = {styles.izquierdo}>
            <View style = {{
              width:'100%',
              height:'50%',
            }}>
              <Text style = {styles.fechas}>Análisis --/--/--</Text>
            </View>
            <View  style = {{
              width:'100%',
              height:'50%',
            }}>
              <Text style = {styles.textanalisis}>Fotos cargadas:</Text>
            </View>
          </View>
          <View style = {styles.derecho}>
            <Text style = {styles.textanalisis}>Estado:</Text>
          </View>
        </View>
      </>
      
    },

    { key:'3', 
    action: 
      <>
        <View style = {styles.consultas}>
          <View style = {styles.izquierdo}>
            <View style = {{
              width:'100%',
              height:'50%',
            }}>
              <Text style = {styles.fechas}>Análisis --/--/--</Text>
            </View>
            <View  style = {{
              width:'100%',
              height:'50%',
            }}>
              <Text style = {styles.textanalisis}>Fotos cargadas:</Text>
            </View>
          </View>
          <View style = {styles.derecho}>
            <Text style = {styles.textanalisis}>Estado:</Text>
          </View>
        </View>
      </>
    },

    { key:'4',
    action: 
      <>
        <View style = {styles.consultas}>
          <View style = {styles.izquierdo}>
            <View style = {{
              width:'100%',
              height:'50%',
            }}>
              <Text style = {styles.fechas}>Análisis --/--/--</Text>
            </View>
            <View  style = {{
              width:'100%',
              height:'50%',
            }}>
              <Text style = {styles.textanalisis}>Fotos cargadas:</Text>
            </View>
          </View>
          <View style = {styles.derecho}>
            <Text style = {styles.textanalisis}>Estado:</Text>
          </View>
        </View>
      </>
    },

    { key:'5',
    action: 
      <>
        <View style = {styles.consultas}>
          <View style = {styles.izquierdo}>
            <View style = {{
              width:'100%',
              height:'50%',
            }}>
              <Text style = {styles.fechas}>Análisis --/--/--</Text>
            </View>
            <View  style = {{
              width:'100%',
              height:'50%',
            }}>
              <Text style = {styles.textanalisis}>Fotos cargadas:</Text>
            </View>
          </View>
          <View style = {styles.derecho}>
            <Text style = {styles.textanalisis}>Estado:</Text>
          </View>
        </View>
      </>
    },

    { key:'6',
    action: 
      <>
        <View style = {styles.consultas}>
          <View style = {styles.izquierdo}>
            <View style = {{
              width:'100%',
              height:'50%',
            }}>
              <Text style = {styles.fechas}>Análisis --/--/--</Text>
            </View>
            <View  style = {{
              width:'100%',
              height:'50%',
            }}>
              <Text style = {styles.textanalisis}>Fotos cargadas:</Text>
            </View>
          </View>
          <View style = {styles.derecho}>
            <Text style = {styles.textanalisis}>Estado:</Text>
          </View>
        </View>
      </>
    },

    { key:'7',
    action: 
      <>
        <View style = {styles.consultas}>
          <View style = {styles.izquierdo}>
            <View style = {{
              width:'100%',
              height:'50%',
            }}>
              <Text style = {styles.fechas}>Análisis --/--/--</Text>
            </View>
            <View  style = {{
              width:'100%',
              height:'50%',
            }}>
              <Text style = {styles.textanalisis}>Fotos cargadas:</Text>
            </View>
          </View>
          <View style = {styles.derecho}>
            <Text style = {styles.textanalisis}>Estado:</Text>
          </View>
        </View>
      </>
    },

    { key:'8',
    action:
      <>
        <View style={styles.margenInferior}> 
          <TouchableOpacity
              style={styles.buttonCp}
              onPress={ () => console.log('borrar')}
            > 
              <Text style= { styles.textButton }>{'Borrar selección'}</Text>
          </TouchableOpacity> 
        </View>
        <View style={styles.margenInferior}> 
          <TouchableOpacity
              style={styles.buttonCp}
              onPress={ () => navigation.navigate('ModelScreen')}
            > 
              <Text style= { styles.textButton }>{'Regresar'}</Text>
          </TouchableOpacity> 
        </View> 
      </>
    }

  ]);

  return (
    <View style={styles.container}>
      <ImageBackground
          style={styles.imagescreen}
          source={ require('../images/screen1.jpg')}
      />
      
      <View style={styles.panel}> 

        <View style={styles.margen}> 
          <Text></Text>
        </View>  

        <ScrollView style={{flex:1, height:height}}>
          { 
            matriz.map((item) => {
              return (
                  <View key = {item.key}>
                  {item.action}
                  </View>
                  )
              })
          }
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
  fechas:{
    fontFamily: 'Mulish',
    alignSelf: 'center',
    fontWeight:'bold',
    color:'#2094FE',
  },
  textanalisis: {
    fontFamily: 'Mulish',
    fontWeight:'bold',
    alignSelf: 'center',
    position: 'absolute',
  },
  consultas:{
    flexDirection:'row',
    alignSelf:'center',
    width: width*0.8,
    height: height*0.07,
    backgroundColor:'#F5F5F5',
    borderWidth: 1,
    borderRadius:10,
    marginBottom: width*0.05
  },
  derecho:{
    width:'45%',
    height:'100%',
    justifyContent:'center',
  },
  izquierdo:{
    width:'45%',
    height:'100%',
    justifyContent:'space-between',
    alignItems:'center',
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
