import React from 'react'
import { useTranslation } from 'react-i18next';
import { useTheme } from '@react-navigation/native';
import { StyleSheet, View, ScrollView, KeyboardAvoidingView } from 'react-native';
import Text from '../components/Text';
import Icon from '../components/Icon';
import Button from '../components/Button';
import Input from '../components/Input';
import ThemeView from '../components/ThemeView';
import Header from '../containers/Header';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { AuthContext } from '../utils/auth-context';
import { addEtudiant } from '../services/etudiantService';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { format } from "date-fns";
import { StatusBar } from 'react-native';
import { Image } from 'react-native';
const initNotification = {
    message: null,
    type: 'error',
};

const signup = (props) => {
    const { colors } = useTheme();
    const { t } = useTranslation();
    const { navigation } = props;
    const { user, theme } = React.useContext(AuthContext);

    const [fullName, setFullName] = React.useState(user?.first_name ?? '');
    const [dateNaissence, setDateNaissence] = React.useState(user?.last_name ?? '');
    const [email, setEmail] = React.useState(user?.user_email ?? '');
    const [phone, setPhone] = React.useState(user?.user_email ?? '');
    const [password, setPassword] = React.useState(user?.user_email ?? '');
    const [loading, setLoading] = React.useState(false);
    const [notification, setNotification] = React.useState(initNotification);
    const [isDatePickerVisible, setDatePickerVisibility] = React.useState(false);


    
    const initEtudiant = () => {
        setFullName('');
        setDateNaissence('');
        setPhone('');
        setEmail('');
        setPassword('');
    }

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        setDateNaissence(format(date, "dd/MM/yyyy"));
        hideDatePicker();
    };
    const urlImage =
        theme === 'dark'
            ? require('../assets/images/logo.png')
            : require('../assets/images/logo.png');
    const saveCustomer = async () => {
        try {
            const Etudiant = {
                "nom": fullName,
                "email": email,
                "num_tel": phone,
                "date_de_naissance": dateNaissence,
                "mot_de_passe": password,
            };

            await addEtudiant(Etudiant);
            setLoading(false);
            const dataNotification = {
                message: 'enregistrement effectué avec succès',
                type: 'success',
            };
            setNotification(dataNotification);
            initEtudiant();

        } catch (e) {
            setLoading(false);
            const dataNotification = {
                message: e.message,
                type: 'error',
            };
            setNotification(dataNotification);
        }
    };
    const clickSave = () => {
        setLoading(true);
        setNotification(initNotification);
        saveCustomer();
    };

    return (
        <ThemeView style={styles.container} secondary>
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker} />
            <KeyboardAvoidingView behavior="height" style={styles.keyboard}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <StatusBar hidden />
                    <Image source={urlImage} style={styles.image} resizeMode="cover" />
                    <Text medium h1 style={styles.text}>
                        {t('login:text_login')}
                    </Text>
                    <View style={styles.content}>
                        {notification?.message ? (
                            <Text
                                style={[
                                    styles.textNotification,
                                    notification?.type === 'success'
                                        ? { color: colors.success }
                                        : { color: colors.error },
                                ]}>
                                {notification.message}
                            </Text>
                        ) : null}

                        <Input
                            label={t('inputs:text_first_name')}
                            value={fullName}
                            onChangeText={setFullName}
                            secondary
                        />

                        <Input
                            label={t('inputs:text_datenais')}
                            value={dateNaissence}
                            onFocus={showDatePicker}
                            secondary
                        />

                        <Input
                            label={t('inputs:text_phone')}
                            keyboardType="number-pad"
                            value={phone}
                            onChangeText={setPhone}
                            secondary
                        />
                        <Input
                            label={t('inputs:text_email')}
                            keyboardType="email-address"
                            value={email}
                            onChangeText={setEmail}
                            secondary
                        />

                        <Input
                            label={t('inputs:text_password')}
                            value={password}
                            secureTextEntry
                            onChangeText={setPassword}
                            secondary
                            secureTextEntry
                        />
                        <Button
                            title={t('common:text_save')}
                            containerStyle={styles.button}
                            onPress={clickSave}
                            loading={loading}
                        />
                        <View style={{
                            flexDirection: 'row', alignItems: 'center',
                            justifyContent: 'center', marginVertical: 1, marginHorizontal: 5,
                        }}>
                            <Text style={styles.textBody}>Aiready have an account</Text>
                            <Text style={[styles.textBody, { color: 'blue' }]} onPress={() => props.navigation.navigate('SignIn')}> Login here</Text>

                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </ThemeView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    keyboard: {
        flex: 1,
    },
    content: {
        marginHorizontal: 20,
        marginTop: 10,
    },
    textNotification: {
        marginBottom: 10,
    },
    button: {
        marginVertical: 15,
    },
    textBody: {

        fontSize: 16
    },
    image: {
        marginVertical: 10,
        marginHorizontal: 15,
        alignSelf: "center",
        width: "50%",
        height: 150,
    },
    text: {
        marginTop: 10,
        marginBottom: 20,
        textAlign: 'center',
    },
});



export default signup
