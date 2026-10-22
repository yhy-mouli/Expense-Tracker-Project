import { colors, radius } from '@/constants/theme'
import { BackButtonProps } from '@/types'
import { verticalScale } from '@/utils/styling'
import { useRouter } from 'expo-router'
import { CaretLeftIcon } from 'phosphor-react-native'
import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'

const BackButton = ({style,iconSize= 26}: BackButtonProps) => {
    const router = useRouter()
  return (
    <TouchableOpacity 
      onPress={()=> router.back()}
      style= {[styles.button, style]}
    >
      <CaretLeftIcon
        size={verticalScale(iconSize)}
        weight='regular'
        color= {colors.white}
      />
    </TouchableOpacity>
  )
}

export default BackButton

const styles = StyleSheet.create({
    button : {
        alignSelf: "flex-start",
        borderRadius: radius._12,
        borderCurve: "continuous",
        backgroundColor: colors.neutral500,
        padding: 5,
    }
})