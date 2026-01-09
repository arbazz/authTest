import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/Button';
import { colors, spacing, textStyles, shadows } from '../theme';

export const HomeScreen: React.FC = () => {
    const { user, logout } = useAuth();

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={textStyles.h1}>Dashboard</Text>

                <View style={styles.card}>
                    <Text style={styles.welcomeLabel}>Welcome back,</Text>
                    <Text style={styles.name}>{user?.name}</Text>
                    <Text style={styles.email}>{user?.email}</Text>
                </View>

                <View style={styles.spacer} />

                <Button
                    title="Logout"
                    onPress={logout}
                    variant="secondary"
                    style={styles.logoutButton}
                    textStyle={{ color: colors.error }}
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    content: {
        flex: 1,
        padding: spacing.l,
    },
    card: {
        backgroundColor: colors.card,
        borderRadius: 16,
        padding: spacing.xl,
        alignItems: 'center',
        ...shadows.medium,
    },
    welcomeLabel: {
        fontSize: 14,
        color: colors.textSecondary,
        marginBottom: spacing.xs,
    },
    name: {
        fontSize: 24,
        fontWeight: '700',
        color: colors.text,
        marginBottom: spacing.xs,
    },
    email: {
        fontSize: 16,
        color: colors.textSecondary,
    },
    spacer: {
        flex: 1,
    },
    logoutButton: {
        backgroundColor: '#FEE2E2',
        marginTop: spacing.m,
    },
});
