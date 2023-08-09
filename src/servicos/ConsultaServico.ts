import api from "./api";

export async  function  agendarConsulta(data: Date, especialistaId: string, pacienteId: string) {
    try {
        const resultado = await api.post('/consulta', { 
            data: data, 
            especialista: especialistaId, 
            paciente: pacienteId 
        }); // Faz a requisição para o servidor
        return resultado.data;
    }
    catch (error) {
        console.log(error);
        return null;
    }
}

export async function cancelarConsulta(consultaId: string){
    try {
      const resultado = await api.delete(`/consulta/${consultaId}`)
      return resultado.data
    }
    catch (error) {
      console.log(error)
      return null
    }
  }