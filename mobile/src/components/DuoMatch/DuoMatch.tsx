import React, { useState } from 'react';
import { View, Modal, ModalProps, Text, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { CheckCircle } from 'phosphor-react-native';
import { Linking } from 'react-native';

import { styles } from './styles';
import { THEME } from '../../theme';
import { Header } from '../Header/Header';
import * as Clipboard from 'expo-clipboard';

interface Props extends ModalProps {
  discord: string;
  onClose: () => void;
}

export function DuoMatch({ discord, onClose, ...rest }: Props) {
  
  const [ isCopping, setIsCopping] = useState(false);
  async function handleCopyDiscordToClipboard() {
    setIsCopping(true);
    
    await Clipboard.setStringAsync(discord);
    
    Alert.alert('Copiado com sucesso!', 'O discord do usuário foi copiado para a área de transferência');
    setIsCopping(false);
  }


  return (
    <Modal
    transparent
      statusBarTranslucent
    animationType='fade'
    {...rest}
    >

      <View style={styles.container}>
        <View style={styles.content}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={onClose}
          >
            <MaterialIcons name="close" size={24}  />
          </TouchableOpacity>

          <CheckCircle size={64} weight="bold" color={THEME.COLORS.SUCCESS} />
          <Header
            title="Let's play!"
            subtitle="Agora é só começar a jogar!"
            style={{ alignItems: 'center', marginTop: 24}}
          />

          <Text style={styles.label}>Adicione no Discord</Text>

          <TouchableOpacity
            style={styles.discordButton}
            onPress={handleCopyDiscordToClipboard}
            disabled={isCopping}
          >

            <Text
              style={styles.discord}
            >
              
              { isCopping? <ActivityIndicator/> : discord}</Text>
          </TouchableOpacity>
        </View>

    </View>
    </Modal>
  );
}