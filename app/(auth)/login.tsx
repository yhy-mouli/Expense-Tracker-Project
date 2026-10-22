import BackButton from '@/components/BackButton';
import Button from '@/components/Button';
import Input from '@/components/Input';
import ScreenWrapper from '@/components/ScreenWrapper';
import Typo from '@/components/Typo';
import { colors, spacingX, spacingY } from '@/constants/theme';
import { useAuth } from '@/contexts/authContext';
import { verticalScale } from '@/utils/styling';
import { useRouter } from 'expo-router';
import * as Icons from 'phosphor-react-native';
import { useRef, useState } from 'react';
import { Alert, Pressable, StyleSheet, View } from 'react-native';


const Login = () => {
    const emailRef = useRef('');
    const passwordRef = useRef('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const { login: loginUser } = useAuth()

    const handlSubmit = async () => {
        if (!emailRef.current || !passwordRef.current) {
            Alert.alert("Login", "Please fill all fields");
            return;
        }
        setIsLoading(true);
        const res = await loginUser(emailRef.current, passwordRef.current);
        setIsLoading(false);
        if (!res.success) {
            Alert.alert("Login", res.msg);
        }
    }


    return (
        <ScreenWrapper>
            <View style={styles.container}>
                <BackButton />

                <View style={{ gap: 5, marginTop: spacingY._12 }}>
                    <Typo size={30} fontWeight={"600"}>Hey,</Typo>
                    <Typo size={30} fontWeight={"600"}>Welcom Back</Typo>
                </View>

                {/* Form */}
                <View style={styles.form}>
                    <Typo size={16} color={colors.textLight}>
                        Login now to track all your expenses
                    </Typo>
                    {/* Input */}

                    <Input
                        placeholder='Enter Your Email'
                        onChangeText={(value) => (emailRef.current = value)}
                        icon={<Icons.AtIcon
                            size={verticalScale(26)}
                            color={colors.white}
                            weight='fill'
                        />}
                    />
                    <Input
                        secureTextEntry
                        onChangeText={(value) => (passwordRef.current = value)}
                        placeholder='Enter Your Password'
                        icon={<Icons.LockIcon
                            size={verticalScale(26)}
                            color={colors.white}
                            weight='fill'
                        />}
                    />

                    <Typo size={15} color={colors.white} style={{ alignSelf: 'flex-end' }} >Forgot Password?</Typo>
                    <Button loading={isLoading} onPress={handlSubmit}>
                        <Typo fontWeight={'700'} color={colors.black} size={20}>Login</Typo>
                    </Button>
                </View>

                {/* Footer */}
                <View style={styles.footer}>
                    <Typo size={15} color={colors.white}>Dont have an account? </Typo>
                    <Pressable onPress={() => router.push("/(auth)/register")}>
                        <Typo size={15} color={colors.primary} fontWeight={'600'}>
                            Register
                        </Typo>
                    </Pressable>
                </View>
            </View>
        </ScreenWrapper>
    )
}

export default Login;

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
});