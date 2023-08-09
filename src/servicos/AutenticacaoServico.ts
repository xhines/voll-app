import api from "./api";

export async function fazerLogin(email: string, senha: string) {
    if(!email || !senha) return null; // Se não tiver email ou senha, retorna null
    try {
        const resultado = await api.post('/auth/login', { email, senha }); // Faz a requisição para o servidor
        console.log(resultado.data);
        return resultado.data;
    } catch (error) {
        console.log(error);
        return null;
    }

}