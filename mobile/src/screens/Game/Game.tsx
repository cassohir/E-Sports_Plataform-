import React, { useEffect, useState } from 'react';

import logoImg from '../../assets/logo-nlw-esports.png';

import { SafeAreaView} from "react-native-safe-area-context"
import { Background } from '../../components/Background/Background';
import { styles } from './styles';
import { useNavigation, useRoute } from '@react-navigation/native';
import { GameParams } from '../../@types/@navigation';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { THEME } from '../../theme';
import { Header } from '../../components/Header/Header';
import { DuoCard, DuoCardProps } from '../../components/DuoCard/DuoCard';
import { DuoMatch } from '../../components/DuoMatch/DuoMatch';
import axios from 'axios';


export function Game() {
  
  const PORT = 3000;


  const [duos, setDuos] = useState<DuoCardProps[]>([]);
  const [discordDuoSelected, setDiscordDuoSelected] = useState('');

  const route = useRoute();
  const navigation = useNavigation();
  const game = route.params as GameParams;


  async function getDiscordUser(adsId: string) {
    axios.get(`http://192.168.100.95:${PORT}/ads/${adsId}/discord`)
      //After change the set Duos it should to console log the discord

      .then(response => setDiscordDuoSelected(response.data.discord)
        
      )
  
  }

  

  function handleGoBack() {
     navigation.goBack();
  }
    useEffect(() => { 
    axios.get(`http://192.168.100.95:3000/games/${game.id}/ads`)
      .then(response => setDuos(response.data))
  },[])
    

  return (
   <Background>


      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleGoBack} >
            <Entypo name="chevron-thin-left" size={20} color={THEME.COLORS.CAPTION_300} />

          </TouchableOpacity>
          <Image
            source={logoImg}
            style={styles.logo}
            
          
          />

          <View style={styles.right} />

        </View>

        <Image
          source={{ uri: game.bannerUrl }}
          style={styles.cover}
          resizeMode="cover"
        />

        <Header
          title={game.title}
          subtitle="Conecte-se e comece a jogar!"
        />

        <FlatList
          data={duos}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <DuoCard
              data={item}
              onConnect={() => getDiscordUser(item.id)}
            />
        

          )}
          horizontal
          contentContainerStyle={[duos.length > 0 ? styles.contentList : styles.emptyListContent]}
          showsHorizontalScrollIndicator={false}
          style={styles.containerList}
          ListEmptyComponent={() => (
            
            <Text style={styles.emptyListText}>
              
              Nenhum anúncio publicado ainda!
            </Text>
          )}
        />

        <DuoMatch
          visible={discordDuoSelected.length > 0}
          onClose={() => setDiscordDuoSelected('')}
          discord={discordDuoSelected }
        
        />
    </SafeAreaView>
   </Background>
  );
  }