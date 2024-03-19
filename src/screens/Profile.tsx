import { ScreenHeader } from '@components/ScreenHeader';
import { UserPhoto } from '@components/UserPhoto';
import { Center, ScrollView, Text, VStack, Skeleton, Heading, useToast } from 'native-base'
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import { Input } from '@components/Input';
import { Button } from '@components/Button';
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker'

const PHOTO_SIZE = 33;

export function Profile() {
   const [photoIsLoading, setPhotoIsLoadin] = useState(false);
   const [userPhoto, setUserPhoto] = useState('https://github.com/julialauries01.png')
   
   const toast = useToast();
   
   async function handleUserPhotoSelect(){
     
      setPhotoIsLoadin(true); 
      try {
         
    
      const photoSelected = await ImagePicker.launchImageLibraryAsync({
 
         mediaTypes: ImagePicker.MediaTypeOptions.Images,
         quality: 1,
         aspect: [4,4],
         allowsEditing: true,
      });
      if(photoSelected.canceled){
         return;
      } 

      if(photoSelected.assets[0].uri) {
         const photoInfo = await FileSystem.getInfoAsync(photoSelected.assets[0].uri);
         
         if(photoInfo.size && (photoInfo.size / 1024 / 1024 ) > 1.5 ){
            return toast.show({
               title: 'Essa imagem é muito grande. Escolha uma de até 1MB',
            placement: 'top',
            bgColor: 'red.500'
            })
            
         }

         console.log(photoInfo);
         setUserPhoto(photoSelected.assets[0].uri);

      }   
   } catch (error) {
         console.log(error);

   } finally{
      setPhotoIsLoadin(false);
   }

   }
   return (
      <VStack flex={1}>
         <ScreenHeader title='Perfil'/>


      <KeyboardAvoidingView
        flex={1}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
      <ScrollView contentContainerStyle={{ paddingBottom: 36 }}>
         <Center mt={6} px={10}>
         {
            photoIsLoading ?
            <Skeleton 
           w={PHOTO_SIZE}
            h={PHOTO_SIZE} 
            rounded='full'
            startColor='gray.500'
            endColor='gray.400'
            />
 :
         <UserPhoto 

         source={{ uri: userPhoto}}
         alt='Foto do Usuário'
         size={PHOTO_SIZE}
         />}
         
         <TouchableOpacity onPress={handleUserPhotoSelect}>
            <Text color='green.500' fontWeight='bold' fontSize='md' mt={6} mb={10} >
               Alterar Foto
            </Text>
         </TouchableOpacity>
         <Input 
         placeholder='Nome'
         bg='gray.600'
         />

         <Input 
         placeholder='E-mail'
         bg='gray.600'
         isDisabled
         />
         </Center>

            <Center px={10} mt={12} mb={9}>
               <Heading color='gray.200' fontSize='md' mb={2} alignSelf='flex-start' mt={12}>
                  Alterar senha 
               </Heading>
               <Input 
         placeholder='Senha antiga'
         bg='gray.600'
         secureTextEntry
         />

         <Input 
         placeholder='Nova Senha'
         bg='gray.600'
         secureTextEntry
         />


         <Input 
         placeholder='Confirme a nova senha'
         bg='gray.600'
         secureTextEntry
         />

            <Button 
            title='Atualizar'
            mt={4}
            />
            </Center>
      </ScrollView>
      </KeyboardAvoidingView>

      </VStack>
   );
}