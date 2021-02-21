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
import { isEmail } from '../configs/validator';
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




    return (

        <View style={styles.container}>
            <Header
                leftComponent={
                    <Text h2 medium>
                        {'Ajouter planing'}
                    </Text>
                }

                centerContainerStyle={styles.header}
            />

            <ScrollView showsVerticalScrollIndicator={false}>
                <Input
                    label={'Titre'}
                    value={fullName}
                    onChangeText={setFullName}
                    secondary
                />
                <Input
                    label={'Date'}
                    value={fullName}
                    onChangeText={setFullName}
                    secondary
                />
                <Input
                    label={'Heure debut'}
                    value={fullName}
                    onChangeText={setFullName}
                    secondary
                />

                <Input
                    label={'Heure fin'}
                    value={fullName}
                    onChangeText={setFullName}
                    secondary
                />





            </ScrollView>

            <ModalFilterNotification
                visitModal={visitModal}
                setModalVisible={value => this.setState({ visitModal: value })}
                filter={filter}
                types={types}
                clickShow={this.getData}
                titleRead={t('notification:text_read')}
            />
        </View>



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
