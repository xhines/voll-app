import { Text, Avatar, VStack } from "native-base";
import { Botao } from "./Botao";

interface CardConsultaProps {
    nome: string;
    foto: string;
    especialidade: string;
    foiAtendido?: boolean;
    foiAgendado?: boolean;
}

export function CardExplorar({
    nome,
    foto,
    especialidade,
    foiAtendido,
    foiAgendado,
}: CardConsultaProps) {
  return (
    <VStack w="100%" bg={foiAtendido ? "blue.100" : "white"} p="5" borderRadius="lg" shadow="2" mb={5}>
      <VStack flex={1} flexDir="row" alignItems="flex-start" justifyContent="center">
        <Avatar size="lg" source={{ uri: foto }} />
        <VStack pl={4} mt={2}>
          <Text fontSize="md" bold>{nome}</Text>
          <Text>{especialidade}</Text>
        </VStack>
      </VStack>
      <Botao mt={4}>
        {foiAgendado ? "Cancelar" : "Agendar Consulta"}
      </Botao>
    </VStack>
  );
}
