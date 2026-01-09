import React, { useState } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../context/AuthContext';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { colors, spacing, textStyles } from '../theme';
import { EyeIcon, EyeOffIcon } from '../components/Icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Signup'>;

export const SignupScreen: React.FC<Props> = ({ navigation }) => {
    const { signup } = useAuth();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [errors, setErrors] = useState<{ name?: string; email?: string; password?: string; general?: string }>({});
    const [loading, setLoading] = useState(false);

    const validate = () => {
        let valid = true;
        const newErrors: typeof errors = {};

        if (!name.trim()) {
            newErrors.name = 'Name is required';
            valid = false;
        }

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
        } else if (password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const handleSignup = async () => {
        setErrors({});
        if (!validate()) return;

        setLoading(true);
        try {
            await signup(name, email, password);
        } catch (error: any) {
            setErrors({ general: error.message || 'Failed to sign up' });
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
                        <Text style={textStyles.h1}>Create Account</Text>
                        <Text style={textStyles.body}>Sign up to get started</Text>
                    </View>

                    <View style={styles.form}>
                        {errors.general && (
                            <View style={styles.errorBanner}>
                                <Text style={styles.errorText}>{errors.general}</Text>
                            </View>
                        )}

                        <Input
                            label="Name"
                            placeholder="John Doe"
                            value={name}
                            onChangeText={setName}
                            error={errors.name}
                        />

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
                            title="Signup"
                            onPress={handleSignup}
                            loading={loading}
                            style={styles.button}
                        />

                        <Button
                            title="Already have an account? Login"
                            variant="text"
                            onPress={() => navigation.navigate('Login')}
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
