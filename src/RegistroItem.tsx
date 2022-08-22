import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { registro } from './Registro'


interface Props {
    Registro: registro
}
export const RegistroItem = ({Registro}: Props) => {
  return (
    <View>
        <Text style = {[
          styles.text, 
          styles.textTittle,
        ]}>{Registro.clonCacao}
        </Text>
        <Text style = {[
          styles.text, 
          styles.textTittle,
        ]}>{Registro.Nombre}
        </Text>
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
      }
})


