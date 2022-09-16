import React from 'react';
import { useEffect, useState } from 'react';
import { Image, FlatList } from 'react-native';
import { SafeAreaView} from 'react-native-safe-area-context';

import { styles } from './styles';
import logoImg from '../../assets/logo-nlw-esports.png';
import { useNavigation } from '@react-navigation/native';

import { Header } from '../../components/Header/Header';
import { GameCard, PropsGameCard } from '../../components/GameCard/GameCard';
import { Background } from '../../components/Background/Background';


export function Home() {

  const [ games, setGames ] = useState<PropsGameCard[]>([]);

  const navigation = useNavigation();
  

  function handleOpenGame({id, title, bannerUrl}: PropsGameCard) {
    navigation.navigate('game',{id,title,bannerUrl});
  }

  useEffect(() => { 
    fetch('http://192.168.100.95:3000/games')
      .then(response => response.json())
      .then(data => setGames(data))
  },[])
  return (
    <Background>
      
    <SafeAreaView style={styles.container}>
      <Image
        source={logoImg}
        style={styles.image}
      />

      <Header
        title="Encontre seu Duo!"
        subtitle="Selecione o que você deseja jogar..."
        />
      <FlatList
        data={games}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <GameCard
            data={item}
            onPress={() => handleOpenGame(item)}
          
          />
          )}
        showsVerticalScrollIndicator={false}
        horizontal
        contentContainerStyle={styles.contentList}
        
        />
     

    </SafeAreaView>
   </Background>
  );
}