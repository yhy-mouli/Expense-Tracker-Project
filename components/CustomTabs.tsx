import { colors, spacingY } from '@/constants/theme';
import { verticalScale } from '@/utils/styling';
import { type BottomTabBarProps } from 'expo-router/js-tabs';
import * as Icons from "phosphor-react-native";
import { Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function CustomTabs({ state, descriptors, navigation }: BottomTabBarProps) {

    const insets = useSafeAreaInsets();
    const tabbarIcon: any = {
        index: (isFocused: boolean) => (
            <Icons.HouseIcon
                weight={isFocused ? "fill" : "regular"}
                size={verticalScale(30)}
                color={isFocused ? colors.primary : colors.neutral350}
            />
        ),
        statistics: (isFocused: boolean) => (
            <Icons.ChartBarIcon
                weight={isFocused ? "fill" : "regular"}
                size={verticalScale(30)}
                color={isFocused ? colors.primary : colors.neutral350}
            />
        ),
        wallet: (isFocused: boolean) => (
            <Icons.WalletIcon
                weight={isFocused ? "fill" : "regular"}
                size={verticalScale(30)}
                color={isFocused ? colors.primary : colors.neutral350}
            />
        ),
        profile: (isFocused: boolean) => (
            <Icons.UserIcon
                weight={isFocused ? "fill" : "regular"}
                size={verticalScale(30)}
                color={isFocused ? colors.primary : colors.neutral350}
            />
        )
    }

    return (
        <View style={[styles.tabbar, {
            height: (Platform.OS === "ios" ? verticalScale(73) : verticalScale(60)) + insets.bottom,
            paddingBottom: insets.bottom,
        }]}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label: any =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                            ? options.title
                            : route.name;

                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name, route.params);
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };

                return (
                    <TouchableOpacity
                        key={route.key}
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarButtonTestID}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        style={styles.tabbarItem}
                    >
                        {
                            tabbarIcon[route.name] && tabbarIcon[route.name](isFocused)
                        }
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}


const styles = StyleSheet.create({

    tabbar: {
        flexDirection: "row",
        width: "100%",
        height: Platform.OS === "ios" ? verticalScale(73) : verticalScale(54),
        backgroundColor: colors.neutral700,
        justifyContent: "space-around",
        alignItems: "center",
        borderTopWidth: 1,
    },
    tabbarItem: {
        marginBottom: Platform.OS === "ios" ? spacingY._10 : spacingY._5,
        justifyContent: "center",
        alignItems: "center"
    }
})