import { HeaderProps } from '@/types'
import { StyleSheet, View } from 'react-native'
import Typo from './Typo'

const Header = ({ title = "", leftIcon, style }: HeaderProps) => {
    return (
        <View style={[styles.container, style]}>
            {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}
            {
                title && (
                    <Typo
                        size={26}
                        fontWeight={"600"}
                        style={{
                            textAlign: "center",
                            width: leftIcon ? "82%" : "100%",
                        }}
                    >
                        {title}
                    </Typo>
                )
            }
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%"
    },
    leftIcon: {
        alignSelf: 'flex-start'
    },
})