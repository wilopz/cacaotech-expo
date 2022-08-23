import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { registro } from './Registro'


interface Props {
    Registro: registro
}
export const RegistroItem = ({Registro}: Props) => {
  return (
    <View style = {styles.consultas}>
        {/* <Text style = {styles.fechas}>
          Nombre: {Registro.Nombre}
        </Text>
        <Text style = {styles.fechas}>
          Documento: {Registro.Documento}
        </Text>
        <Text style = {styles.fechas}>
          Nombre de la finca: {Registro.nFinca}
        </Text>
        <Text style = {styles.fechas}>
          Documento: {Registro.Documento}
        </Text>
        <Text style = {styles.fechas}>
          Ubicación: {Registro.Ubicacion}
        </Text>
        <Text style = {styles.fechas}>
          Tamaño del cultivo: {Registro.tCultivo} (Hectareas)
        </Text>
        <Text style = {styles.fechas}>
          Clones de cacao: {Registro.clonCacao}
        </Text>
        <Text style = {styles.fechas}>
          Fecha del registro: {Registro.createdAt}
        </Text> */}
        <View style={styles.izquierdo}>
          <Text style = {styles.fechas}>
            Nombre: 
          </Text>
          <Text style = {styles.fechas}>
            Documento: 
          </Text>
          <Text style = {styles.fechas}>
            Nombre de la finca: 
          </Text>
          <Text style = {styles.fechas}>
            Documento: 
          </Text>
          <Text style = {styles.fechas}>
            Ubicación: 
          </Text>
          <Text style = {styles.fechas}>
            Tamaño del cultivo: 
          </Text>
          <Text style = {styles.fechas}>
            Clones de cacao: 
          </Text>
          <Text style = {styles.fechas}>
            Fecha del registro: 
          </Text>
        </View>
        <View style={styles.derecho}>
          <Text style = {styles.datos}>
            {Registro.Nombre}
          </Text>
          <Text style = {styles.datos}>
            {Registro.Documento}
          </Text>
          <Text style = {styles.datos}>
            {Registro.nFinca}
          </Text>
          <Text style = {styles.datos}>
            {Registro.Documento}
          </Text>
          <Text style = {styles.datos}>
            {Registro.Ubicacion}
          </Text>
          <Text style = {styles.datos}>
            {Registro.tCultivo} (Hectareas)
          </Text>
          <Text style = {styles.datos}>
            {Registro.clonCacao}
          </Text>
          <Text style = {styles.datos}>
            {Registro.createdAt}
          </Text>
        </View>
  </View>
  )
}

const styles = StyleSheet.create({
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
      consultas:{
        flexDirection:'row',
        alignSelf:'center',
        justifyContent:'space-between',
        width:'80%',
        /* height:'7%', */
        margin:'2.5%',
        padding:'1%',
        backgroundColor:'#F5F5F5',
        borderWidth: 1,
        borderRadius:10,
       /*  bottom:'40%', */
      },
      fechas:{
        fontFamily: 'Mulish',
        fontWeight:'bold',
        color:'#2094FE',
      },
      datos:{
        fontFamily: 'Mulish',
        
        fontWeight:'bold',
        color:'black'
      },
      derecho:{
        width:'45%',
        justifyContent:'center',
      },
      izquierdo:{
        width:'40%',
        marginHorizontal:'5%'
      },
})


