import { VStack, Image, Text, Box, Link, useToast } from 'native-base'
import Logo from './assets/Logo.png'
import { TouchableOpacity } from 'react-native';
import { Titulo } from './componentes/Titulo';
import { Botao } from './componentes/Botao';
import { EntradaTexto } from './componentes/EntradaTexto';
import { useEffect, useState } from 'react';
import { fazerLogin } from './servicos/AutenticacaoServico';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode';

export default function Login({ navigation }) {

  const [email, setEmail] = useState(''); // useState é um hook, que é uma função que retorna um array
  const [senha, setSenha] = useState(''); // o primeiro elemento é a variavel, o segundo é a função que altera a variavel
  const [carregando, setCarregando] = useState(true); // [variavel, função que altera a variavel
  const toast = useToast(); // useToast é um hook do native-base

  useEffect(() => {
    // AsyncStorage.removeItem('token') - para remover o token
    async function verificarLogin() { // async é uma função assincrona, que pode demorar para ser executada
      const token = await AsyncStorage.getItem('token'); // await é para esperar a função ser executada
      if (token) { // se o token existir, o usuario já está logado
        navigation.replace('Tabs'); // replace é para substituir a tela atual pela tela de tabs
    }
    setCarregando(false); // se o token não existir, o usuario não está logado
  }
  verificarLogin();
  }, []); 

  async function login() {
    const resultado = await fazerLogin(email, senha); // await é para esperar a função ser executada
    if (resultado) { // se o resultado for verdadeiro, o usuario está logado
      AsyncStorage.setItem('token', resultado.token); // setItem é para salvar o token no AsyncStorage

      const tokenDecodificado = jwtDecode(resultado.token) as any; // jwtDecode é para decodificar o token
      const pacienteId = tokenDecodificado.id; // o id do paciente está dentro do token
      AsyncStorage.setItem('pacienteId', pacienteId); // setItem é para salvar o id do paciente no AsyncStorage

      navigation.replace('Tabs');
    } else {
      toast.show({
        title: 'Erro!',
        description: 'Email ou senha inválidos',
        backgroundColor: 'red.500',
        duration: 5000,
      });
    }
  }

  if (carregando) {
    return null;
  }

  return (
    <VStack flex={1} alignItems="center" justifyContent="center" p={5}>
        <Image source={Logo} alt='Logo Voll'/>
        
        <Titulo>
          Faça Login em sua conta
        </Titulo>

        <Box>
          <EntradaTexto 
            label="Email"
            placeholder="Insira seu endereço do e-mail"
            value={email}
            onChangeText={setEmail}
          />
          <EntradaTexto 
            label="Senha"
            placeholder="Insira sua senha"
            value={senha}
            onChangeText={setSenha}
            secureTextEntry
          />
        </Box>

          <Botao onPress={login} >Entrar</Botao>

          <Link href='https://www.alura.com.br' mt={2}>
          Esqueceu a sua senha?
          </Link>

        <Box w="100%" flexDirection="row" justifyContent="center" mt={8}> {/* O flexDirection serve para ficar um ao lado do outro */}
          <Text>Ainda não tem cadastro?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
            <Text color="blue.500">
              Faça seu cadastro!
            </Text>
          </TouchableOpacity>
        </Box>
    </VStack>
  );
}


