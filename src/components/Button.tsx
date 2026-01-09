import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, ViewStyle, TextStyle } from 'react-native';
import { colors, spacing, shadows } from '../theme';

interface ButtonProps {
    title: string;
    onPress: () => void;
    variant?: 'primary' | 'secondary' | 'text';
    loading?: boolean;
    disabled?: boolean;
    style?: ViewStyle;
    textStyle?: TextStyle;
}

export const Button: React.FC<ButtonProps> = ({
    title,
    onPress,
    variant = 'primary',
    loading = false,
    disabled = false,
    style,
    textStyle
}) => {
    const isPrimary = variant === 'primary';
    const isText = variant === 'text';

    const containerStyles = [
        styles.base,
        isPrimary && styles.primary,
        isText && styles.text,
        disabled && styles.disabled,
        style,
    ];

    const labelStyles = [
        styles.label,
        isPrimary && styles.primaryLabel,
        isText && styles.textLabel,
        disabled && styles.disabledLabel,
        textStyle,
    ];

    return (
        <TouchableOpacity
            style={containerStyles}
            onPress={onPress}
            disabled={loading || disabled}
            activeOpacity={0.8}
        >
            {loading ? (
                <ActivityIndicator color={isPrimary ? '#FFF' : colors.primary} />
            ) : (
                <Text style={labelStyles}>{title}</Text>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    base: {
        height: 50,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    primary: {
        backgroundColor: colors.primary,
        ...shadows.small,
    },
    text: {
        backgroundColor: 'transparent',
        height: 'auto',
        paddingVertical: spacing.s,
    },
    disabled: {
        backgroundColor: colors.border,
        elevation: 0,
        shadowOpacity: 0,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: colors.text,
    },
    primaryLabel: {
        color: '#FFFFFF',
    },
    textLabel: {
        color: colors.primary,
        fontSize: 14,
    },
    disabledLabel: {
        color: colors.textSecondary,
    },
});
