import { Divider, ScrollView } from 'native-base';
import { CardConsulta } from '../componentes/CardConsulta';
import { Titulo } from '../componentes/Titulo';
import { Botao } from '../componentes/Botao';

export default function Consultas() {
    return (
        <ScrollView p="5" mb={5}>
            <Titulo color="blue.500" mb={1}>Minhas Consultas</Titulo>
            <Botao mt={3} mb={3}>Agendar outra consulta</Botao>

            <Titulo color="blue.500" mb={3} fontSize="lg" alignSelf="flex-start">Próximas Consultas</Titulo>
            <CardConsulta
                nome="Dr. João Silva"
                foto="https://github.com/xhines.png"
                especialidade="Cardiologista"
                data="10/10/2021"
                foiAgendado={true}
            />

            <Divider mt={5}/>

            <Titulo color="blue.500" mb={3} fontSize="lg" alignSelf="flex-start">Consultas passadas</Titulo>
            <CardConsulta
                nome="Dr. João Silva"
                foto="https://github.com/xhines.png"
                especialidade="Cardiologista"
                data="10/10/2021"
                foiAtendido={true}
            />
            <CardConsulta
                nome="Dr. João Silva"
                foto="https://github.com/xhines.png"
                especialidade="Cardiologista"
                data="10/10/2021"
                foiAtendido={true}
            />
            <CardConsulta
                nome="Dr. João Silva"
                foto="https://github.com/xhines.png"
                especialidade="Cardiologista"
                data="10/10/2021"
                foiAtendido={true}
            />
        </ScrollView>
    )
}