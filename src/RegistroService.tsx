import axios from "axios"
import { registro } from "./Registro";

const headers = {
    "Content-Type": "application/json",
  };
const url = "http://192.168.1.6:4000";

export const getRegistros = async() => {
    return await axios.get("https://cacao-backend.herokuapp.com/registro", { headers })
}

export const createRegistro = async(Registro: registro) => {
    return await axios.post("https://cacao-backend.herokuapp.com/registro", Registro)
}

