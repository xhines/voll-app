import { VStack, Text, ScrollView, Avatar, Divider } from "native-base";
import { Titulo } from "../componentes/Titulo";
import { useEffect, useState } from "react";
import { buscarPacientePorId } from "../servicos/PacienteServico";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Paciente } from "../interfaces/Paciente";
import { Botao } from "../componentes/Botao";

export default function Perfil( { navigation }: any) {

  const [dadosPaciente, setDadosPaciente] = useState({} as Paciente);

  useEffect(() => {
    async function dadosPaciente() {
      const pacienteId = await AsyncStorage.getItem("pacienteId");
      if(!pacienteId) return null
      
      if (pacienteId) {
        const resultado = await buscarPacientePorId(pacienteId);
        setDadosPaciente(resultado);
        console.log(resultado);
      }
    }
    dadosPaciente();
  }, [])

  function deslogar() {
    AsyncStorage.removeItem("token");
    AsyncStorage.removeItem("pacienteId");
    navigation.replace('Login');
  }

  return (
    <ScrollView flex={1}>
      <VStack flex={1} alignItems="center" p={5}>
        <Titulo color="blue.500">Meu Perfil</Titulo>

        <Avatar size="xl" source={{ uri: dadosPaciente?.imagem }} mt={5} />

        <Titulo color="blue.500">Informações Pessoais</Titulo>
        <Titulo fontSize="lg" mb={2}>{dadosPaciente.nome}</Titulo>
        <Text mb={1}>{dadosPaciente?.email}</Text>
        <Text>{dadosPaciente?.endereco?.estado}</Text>

        <Divider mt={5} />

        <Titulo color="blue.500" mb={2}>Planos de saúde</Titulo>
        {dadosPaciente?.planosSaude?.map((plano, index) => ( // map é para percorrer um array e retornar um componente para cada item
          <Text key={index}>{plano}</Text>  // key é para identificar cada item da lista de forma unica. // index é a posição do item no array
        ))}

        <Botao onPress={deslogar}>
          Deslogar
        </Botao>
      </VStack>
    </ScrollView>
  );
}
