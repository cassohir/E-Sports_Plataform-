
import { TouchableOpacity, TouchableOpacityProps, ImageBackground, ImageSourcePropType, Text } from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';

import { styles } from './styles';
import { THEME } from '../../theme';

export interface PropsGameCard {
  id: string;
  title: string;
  _count: { 
  
    ads: number;
  }
  bannerUrl: string;
}

interface GameCardProps extends TouchableOpacityProps {
  data: PropsGameCard;
 }


export function GameCard({data, ...rest}: GameCardProps) {
  return (
    <TouchableOpacity style={styles.container} {...rest}>
      <ImageBackground
        source={{ uri: data.bannerUrl }}
        style={styles.cover}
      >

      <LinearGradient
        colors={THEME.COLORS.FOOTER}
        style={styles.footer}
        >
        <Text style={styles.name}>
        {data.title}

        </Text>
        <Text style={styles.ads}>
          {data._count.ads} anúncios

        </Text>
      </LinearGradient>
          </ImageBackground>

    </TouchableOpacity>
  );
}