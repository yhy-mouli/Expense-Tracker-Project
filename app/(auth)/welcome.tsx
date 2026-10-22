import Button from '@/components/Button'
import ScreenWrapper from '@/components/ScreenWrapper'
import Typo from '@/components/Typo'
import { colors, spacingX, spacingY } from '@/constants/theme'
import { verticalScale } from '@/utils/styling'
import { useRouter } from 'expo-router'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated"

const Welcome = () => {
  const router = useRouter()
  return (
    <ScreenWrapper>
      <View style={styles.container}>
        {/* Login button & Image */}
        <View>
          <TouchableOpacity onPress={() => router.push("/(auth)/login")} style={styles.loginButton}>
            <Typo fontWeight={"500"}>Sing in</Typo>
          </TouchableOpacity>

          <Animated.Image
            entering={FadeIn.duration(2000)}
            source={require('../../assets/images/welcome.png')}
            resizeMode='contain'
            style={styles.welcomeImage}
          />
        </View>

        {/* footer */}
        <View style={styles.footer}>
          <Animated.View
            entering={FadeInDown.duration(1000).springify().damping(20)}
            style={{ alignItems: 'center' }}
          >
            <Typo size={30} fontWeight={"300"}>Alwais Take Control</Typo>
            <Typo size={30} fontWeight={"300"}>Of Your Finances</Typo>
          </Animated.View>

          <Animated.View
            entering={FadeInDown.duration(1000).delay(100).springify().damping(20)}
            style={{ alignItems: 'center', gap: 2 }}>
            <Typo size={17} color={colors.textLight} fontWeight={'300'}>
              Finance must be arranged to set a better
            </Typo>
            <Typo size={17} color={colors.textLight} fontWeight={'300'}>
              Lifestyle in the future
            </Typo>
          </Animated.View>

          <Animated.View
            entering={FadeInDown.duration(1000).delay(200).springify().damping(20)}
            style={styles.buttonContainer}>
            {/* Button */}
            <Button onPress={() => router.push("/(auth)/register")}>
              <Typo size={20} color={colors.neutral900}>Get Started</Typo>
            </Button>
          </Animated.View>
        </View>

      </View>
    </ScreenWrapper>
  )
};

export default Welcome

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    paddingTop: spacingY._7,
  },
  welcomeImage: {
    width: "100%",
    height: verticalScale(300),
    alignSelf: "center",
    marginTop: verticalScale(100),
  },
  loginButton: {
    alignSelf: 'flex-end',
    marginRight: spacingX._20,
  },
  footer: {
    backgroundColor: colors.neutral800,
    alignItems: "center",
    paddingTop: verticalScale(30),
    paddingBottom: verticalScale(45),
    gap: spacingY._10,
    elevation: 10,
    shadowColor: 'white',
    shadowOffset: { width: 0, height: -10 },
    shadowRadius: 25,
    shadowOpacity: 0.4,
  },
  buttonContainer: {
    width: "100%",
    paddingHorizontal: spacingX._25,
  },
});