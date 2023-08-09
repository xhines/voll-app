import { Divider, ScrollView, useToast } from "native-base";
import { CardConsulta } from "../componentes/CardConsulta";
import { Titulo } from "../componentes/Titulo";
import { Botao } from "../componentes/Botao";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { buscarConsultasPaciente } from "../servicos/PacienteServico";
import { useIsFocused } from "@react-navigation/native";
import { converterDataParaString } from "../utils/Conversoes";
import { NavigationProps } from "../@types/navigation";
import { cancelarConsulta } from "../servicos/ConsultaServico";

interface Especialista {
  id: string;
  nome: string;
  imagem: string;
  especialidade: string;
}
interface Consulta {
  id: string;
  data: string;
  especialista: Especialista;
}

export default function Consultas({ navigation }: NavigationProps<"Consultas">) {
  const [consultasProximas, setConsultasProximas] = useState<Consulta[]>([]); // TODO: Buscar consultas próximas
  const [consultasPassadas, setConsultasPassadas] = useState<Consulta[]>([]);
  const [recarregar, setRecarregar] = useState(false);
  const toast = useToast();
  const isFocused = useIsFocused();

  useEffect(() => {
    async function buscarConsultas() {
      const pacienteId = await AsyncStorage.getItem("pacienteId");
      if (!pacienteId) return null;

      const todasConsultas: Consulta[] = await buscarConsultasPaciente(
        pacienteId
      );

      const agora = new Date();
      const proximas = todasConsultas.filter(
        (consulta) => new Date(consulta.data) > agora
      );
      const passadas = todasConsultas.filter(
        (consulta) => new Date(consulta.data) <= agora
      );

      setConsultasProximas(proximas);
      setConsultasPassadas(passadas);
    }
    buscarConsultas();
  }, [isFocused, recarregar]);

  async function cancelar(consultaId: string) {
    const resultado = await cancelarConsulta(consultaId);
    if (resultado) {
      toast.show({
        title: "Consulta cancelada com sucesso",
        backgroundColor: "green.500",
      });
      setRecarregar(!recarregar);
    } else {
      toast.show({
        title: "Erro ao cancelar consulta",
        backgroundColor: "red.500",
      });
    }
  }

  return (
    <ScrollView p="5" mb={5}>
      <Titulo color="blue.500" mb={1}>
        Minhas Consultas
      </Titulo>
      <Botao mt={3} mb={3}>
        Agendar outra consulta
      </Botao>

      <Titulo color="blue.500" mb={3} fontSize="lg" alignSelf="flex-start">
        Próximas Consultas
      </Titulo>
      {consultasProximas?.map((consulta, index) => (
        <CardConsulta
          key={consulta?.id}
          nome={consulta?.especialista.nome}
          foto={consulta?.especialista.imagem}
          especialidade={consulta?.especialista.especialidade}
          data={converterDataParaString(consulta?.data)}
          foiAgendado={true}
          onPress={() => cancelar(consulta.id)}
        />
      ))}

      <Divider mt={5} />

      <Titulo color="blue.500" mb={3} fontSize="lg" alignSelf="flex-start">
        Consultas passadas
      </Titulo>
      {consultasPassadas?.map((consulta, index) => (
        <CardConsulta
          key={consulta?.id}
          nome={consulta?.especialista.nome}
          foto={consulta?.especialista.imagem}
          especialidade={consulta?.especialista.especialidade}
          data={converterDataParaString(consulta?.data)}
          foiAtendido={true}
          onPress={() => navigation.navigate('Agendamento', { especialistaId: consulta.especialista.id })}
        />
      ))}
    </ScrollView>
  );
}
