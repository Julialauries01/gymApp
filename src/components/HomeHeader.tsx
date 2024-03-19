import { Heading, HStack, Icon, Text, VStack} from 'native-base';
import { UserPhoto } from './UserPhoto';
import { MaterialIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';

export function HomeHeader(){
   return (
      <HStack bgColor="gray.600" pt={16} pb={5} px={8} alignItems="center">
      <UserPhoto 
        source={{ uri: 'https://github.com/Julialauries01.png'}}
         alt='Imagem de perfil '
         size={16} 
         mr={4}
         />
         <VStack flex={1} >
         <Text color="gray.100" fontSize="md">
            Olá,
         </Text>

      <Heading color="gray.100" fontSize="md">
         Julia
      </Heading>
      </VStack>

<TouchableOpacity>
<Icon 
    as={MaterialIcons}
    name='logout'
    color='gray.200'
    size={7}
    />
</TouchableOpacity>
  
    
  
      </HStack>

   )
}