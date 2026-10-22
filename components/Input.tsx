import { colors, radius, spacingX } from '@/constants/theme'
import { InputProps } from '@/types'
import { verticalScale } from '@/utils/styling'
import React from 'react'
import { StyleSheet, TextInput, View } from 'react-native'

const Input = (props : InputProps) => {
  return (
    <View style={[styles.container, props.containerStyle && props.containerStyle]}>

        { 
          props.icon && props.icon
        }
      <TextInput 
        style={[styles.input, props.inputStyle && props.inputStyle ]} 
        placeholderTextColor={colors.neutral350}
        ref={props.inputRef && props.inputRef}
        {...props}
      />
    </View>
  )
}

export default Input

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        height: verticalScale(45),
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: colors.neutral300,
        borderRadius: radius._12,
        borderCurve: "continuous",
        paddingHorizontal: spacingX._10,
        gap: spacingX._10,
    },
    input: {
        flex: 1,
        fontSize: verticalScale(17),
        color: colors.white,
    },
})