import BackButton from '@/components/BackButton';
import Button from '@/components/Button';
import Input from '@/components/Input';
import ScreenWrapper from '@/components/ScreenWrapper';
import Typo from '@/components/Typo';
import { colors, spacingX, spacingY } from '@/constants/theme';
import { useAuth } from '@/contexts/authContext';
import { verticalScale } from '@/utils/styling';
import { router } from 'expo-router';
import { AtIcon, LockIcon, UserIcon } from 'phosphor-react-native';
import { useRef, useState } from 'react';
import { Alert, Pressable, StyleSheet, View } from 'react-native';

const Register = () => {
  const nameRef = useRef("");
  const emailRef = useRef("");
  const passwordRef = useRef("");

  const [isLoading, setIsLoading] = useState(false);
  const { register: registerUser } = useAuth();

  const handleSubmit = async () => {
    if (!nameRef.current || !emailRef.current || !passwordRef.current) {
      Alert.alert("Register", "Please Fill All Fields");
      return;
    }
    setIsLoading(true);
    const res = await registerUser(
      nameRef.current,
      emailRef.current,
      passwordRef.current
    );
    console.log("response is : ", res);
    if (!res.success) {
      Alert.alert("Sign Up: ", res.msg);
    }
    setIsLoading(false);
  }


  return (
    <ScreenWrapper>
      <View style={styles.container}>

        <BackButton />

        <View style={{ gap: 5, marginTop: spacingY._20 }}>
          <Typo size={30} fontWeight={500} style={{ paddingLeft: 10 }} >Hey,</Typo>
          <Typo size={30} fontWeight={500} style={{ paddingLeft: 10 }}>lets, get Started</Typo>
        </View>

        {/* form */}
        <View style={styles.form}>
          <Typo size={16} color={colors.textLight}>register your account</Typo>

          <Input
            placeholder='Enter your name'
            onChangeText={(value) => (nameRef.current = value)}
            icon={
              <UserIcon
                color={colors.neutral300}
                size={verticalScale(26)}
                weight='fill'
              />
            }
          />

          <Input
            placeholder='Enter your Email'
            onChangeText={(value) => (emailRef.current = value)}
            icon={
              <AtIcon
                weight='fill'
                color={colors.neutral300}
                size={verticalScale(26)}

              />
            }
          />
          <Input
            placeholder='Entre your password'
            secureTextEntry
            onChangeText={(value) => (passwordRef.current = value)}
            icon=
            {<LockIcon
              color={colors.neutral300}
              size={verticalScale(26)}
              weight='fill'
            />}

          />

          <Button onPress={handleSubmit} loading={isLoading}>
            <Typo color={colors.black} fontWeight={"600"}>Register</Typo>
          </Button>

        </View>
        {/* Footer */}
        <View style={styles.footer}>
          <Typo
            size={15}
            color={colors.textLight}
          >
            Already have an account?
          </Typo>

          <Pressable onPress={() => router.push("/(auth)/login")}>
            <Typo
              color={colors.primary}
              size={15}
              fontWeight={'700'}
            >
              Login
            </Typo>
          </Pressable>

        </View>
      </View>

    </ScreenWrapper>
  )
}

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: spacingY._30,
    paddingHorizontal: spacingX._20,
  },
  welcomeText: {
    fontSize: verticalScale(20),
    fontWeight: "bold",
    color: colors.text,
  },
  form: {
    gap: spacingY._20,
  },
  forgotPassword: {
    fontWeight: "500",
    textAlign: "right",
    color: colors.text,
  },
  footer: {
    flexDirection: "row",
    gap: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  footerText: {
    textAlign: "center",
    color: colors.text,
    fontSize: verticalScale(15),
  },
})