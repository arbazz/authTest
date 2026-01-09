import React from 'react';
import { View, TextInput, Text, StyleSheet, TextInputProps, TouchableOpacity } from 'react-native';
import { colors, spacing, textStyles } from '../theme';

interface InputProps extends TextInputProps {
    label: string;
    error?: string;
    rightIcon?: React.ReactNode;
    onRightIconPress?: () => void;
}

export const Input: React.FC<InputProps> = ({
    label,
    error,
    rightIcon,
    onRightIconPress,
    style,
    ...props
}) => {
    return (
        <View style={styles.container}>
            <Text style={textStyles.label}>{label}</Text>
            <View style={[styles.inputContainer, error ? styles.inputError : null]}>
                <TextInput
                    style={[styles.input, style]}
                    placeholderTextColor={colors.textSecondary}
                    {...props}
                />
                {rightIcon && (
                    <TouchableOpacity onPress={onRightIconPress} style={styles.iconContainer}>
                        {rightIcon}
                    </TouchableOpacity>
                )}
            </View>
            {error ? <Text style={textStyles.error}>{error}</Text> : null}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: spacing.m,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.inputBg,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: 'transparent',
        overflow: 'hidden',
        height: 50,
    },
    input: {
        flex: 1,
        paddingHorizontal: spacing.m,
        color: colors.text,
        fontSize: 16,
        height: '100%',
    },
    inputError: {
        borderColor: colors.error,
        backgroundColor: '#FEF2F2',
    },
    iconContainer: {
        padding: spacing.s,
        marginRight: spacing.xs,
    },
});
