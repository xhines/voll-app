import api from "./api";

export async function buscarEspecialidadePorEstado(estado?: string, especialidade?: string) {
    if (!estado || !especialidade) return null;
    
    try {
        const resultado = await api.get("/especialista/busca", {
            params: {
                estado,
                especialidade,
            },
        }); // Faz a requisição para o servidor
        return resultado.data;
    } catch (error) {
        console.log(error);
        return null;
    }
}