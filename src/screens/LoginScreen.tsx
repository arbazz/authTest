import React, { useState } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../context/AuthContext';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { colors, spacing, textStyles } from '../theme';
import { EyeIcon, EyeOffIcon } from '../components/Icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export const LoginScreen: React.FC<Props> = ({ navigation }) => {
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [errors, setErrors] = useState<{ email?: string; password?: string; general?: string }>({});
    const [loading, setLoading] = useState(false);

    const validate = () => {
        let valid = true;
        const newErrors: typeof errors = {};

        if (!email) {
            newErrors.email = 'Email is required';
            valid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            newErrors.email = 'Invalid email format';
            valid = false;
        }

        if (!password) {
            newErrors.password = 'Password is required';
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const handleLogin = async () => {
        setErrors({});
        if (!validate()) return;

        setLoading(true);
        try {
            await login(email, password);
        } catch (error: any) {
            setErrors({ general: error.message || 'Failed to login' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardView}
            >
                <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                    <View style={styles.header}>
                        <Text style={textStyles.h1}>Welcome Back</Text>
                        <Text style={textStyles.body}>Sign in to continue</Text>
                    </View>

                    <View style={styles.form}>
                        {errors.general && (
                            <View style={styles.errorBanner}>
                                <Text style={styles.errorText}>{errors.general}</Text>
                            </View>
                        )}

                        <Input
                            label="Email"
                            placeholder="hello@example.com"
                            value={email}
                            onChangeText={setEmail}
                            autoCapitalize="none"
                            keyboardType="email-address"
                            error={errors.email}
                        />

                        <Input
                            label="Password"
                            placeholder="••••••••"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry={!isPasswordVisible}
                            error={errors.password}
                            rightIcon={isPasswordVisible ? <EyeOffIcon /> : <EyeIcon />}
                            onRightIconPress={() => setIsPasswordVisible(!isPasswordVisible)}
                        />

                        <Button
                            title="Login"
                            onPress={handleLogin}
                            loading={loading}
                            style={styles.button}
                        />

                        <Button
                            title="Don't have an account? Sign up"
                            variant="text"
                            onPress={() => navigation.navigate('Signup')}
                        />
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    keyboardView: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        padding: spacing.l,
        justifyContent: 'center',
    },
    header: {
        marginBottom: spacing.xl,
    },
    form: {
        width: '100%',
    },
    button: {
        marginTop: spacing.s,
        marginBottom: spacing.m,
    },
    errorBanner: {
        backgroundColor: '#FEF2F2',
        padding: spacing.m,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#FAC7C7',
        marginBottom: spacing.m,
    },
    errorText: {
        color: colors.error,
        fontSize: 14,
    },
});
