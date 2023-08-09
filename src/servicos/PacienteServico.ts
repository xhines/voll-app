import { Paciente } from "../interfaces/Paciente";
import api from "./api";

export async function cadastrarPaciente(paciente: Paciente){
    if(!paciente) return null;
  
    try {
      const resultado = await api.post('/paciente', paciente) // Faz a requisição para o servidor
      console.log(resultado.data)
      return resultado.data
    }
    catch(error){
      console.log(error)
      return null
    }
  
  }

  export async function buscarPacientePorId(id: string){
    if(!id) return null;
  
    try {
      const resultado = await api.get(`/paciente/${id}`) // Faz a requisição para o servidor
      return resultado.data
    }
    catch(error){
      console.log(error)
      return null
    }
  
  }