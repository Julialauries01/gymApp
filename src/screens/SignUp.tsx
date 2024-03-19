import { VStack, Image, Text, Center, Heading, ScrollView} from "native-base";
import BackgroundImg from '@assets/background.png'
import LogoSvg from '@assets/logo.svg'
import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { useNavigation } from '@react-navigation/native'
import { useForm, Controller } from 'react-hook-form'

type FormDataProps = {
   name: string;
   email: string;
   password: string;
   password_confirm: string;
}

export function SignUp(){

   const { control, handleSubmit, formState: { errors } } = useForm<FormDataProps>();

    const navigation =  useNavigation();

    function handleGoBack() {
         navigation.goBack();
    }
    function handleSignup({ name, email, password, password_confirm}: FormDataProps) {
 console.log({ name, email, password, password_confirm })
    }

   return (
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false} >

      <VStack flex={1} px={10} pb={16}>
         <Image 
         source={BackgroundImg} 
         defaultSource={BackgroundImg}
         alt="Pessoas treinando"
         resizeMode="contain"
         position="absolute" 
         />
<Center my={24}>
<LogoSvg />
         <Text color="gray.100" fontSize="sm">
            Treine sua mente e o seu corpo
         </Text>
</Center>

<Center>
<Heading color="gray.100" fontSize="xl" mb={6} fontFamily='heading'>
Crie sua conta
</Heading>

<Controller 
control={control}
name="name"
rules={{
   required: 'informe o nome.'
}}
render={({ field: { onChange, value }}) => (
   <Input 
   placeholder="Nome"
   onChangeText={onChange}
   value={value}
   />
)}
/>
<Text color='white'>
{errors.name?.message}
</Text>

<Controller 
control={control}
name="email"
rules={{
   required: 'informe o email.',
   pattern: {
      value:/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: 'E-mail inválido'
    }
}}
render={({ field: { onChange, value }}) => (
   <Input
   placeholder="E-mail" 
   keyboardType="email-address"
   autoCapitalize="none"
   onChangeText={onChange}
   value={value}
 />
)}
/>
<Text color='white'>
{errors.email?.message}
</Text>


<Controller 
control={control}
name="password"
rules={{
   required: 'informe a senha.'
}}
render={({ field: { onChange, value }}) => (
<Input 
   placeholder="Senha"
   secureTextEntry
   onChangeText={onChange}
   value={value}
/>
)}
/>
<Text color='white'>
{errors.password?.message}
</Text>


<Controller 
control={control}
name="password_confirm"
rules={{
   required: 'informe a confirmação de senha.'
}}
render={({ field: { onChange, value }}) => (
<Input 
   placeholder="Confirmar a Senha"
   secureTextEntry
   onChangeText={onChange}
   value={value}
   onSubmitEditing={handleSubmit(handleSignup)}
   returnKeyType="send"
/>
)}
/>

<Text color='white'>
{errors.password_confirm?.message}
</Text>


 
 <Button 
   title="Criar e acessar"
   onPress={handleSubmit(handleSignup)}
    />

</Center>


<Button
   title="Voltar para o Login"
   variant='outline' 
   mt={24}
   onPress={handleGoBack}
/>

      </VStack>
</ScrollView>
   );
}