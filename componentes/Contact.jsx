import * as Yup from 'yup'
import { Formik } from 'formik'
import { TextInput, StyleSheet, Button, View, Text, Alert, Linking, Pressable } from 'react-native';
import axios from 'axios';
import { AntDesign, Entypo, FontAwesome6, MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';

const Contact = () => {

    const emailRegExp = /^[a-zA-Z0–9._-]+@[a-zA-Z0–9.-]+\.[a-zA-Z]{2,4}$/
    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

    const schema = Yup.object().shape({
        phone: Yup.string().matches(phoneRegExp, 'Phone number is not valid').max(13, "Máximo 13 caracteres numericos"),
        name: Yup.string().required("Tu nombre es requerido"),
        email: Yup.string().required("Tu email es requerido"), //.matches(emailRegExp, "Formato del mail incorrecto"),
        message: Yup.string().required("Por favor ingrese un mensaje"),
    })

    // funcion para ver web de bragadotv
    const _handlePressButtonAsync = async (web) => {
        let result = await WebBrowser.openBrowserAsync(web);
        setResult(result);
    };

    // funcion para enviar mail
    const handleOpenEmailboxAsync = () => {
        console.log("trying open mail app")
        Linking.openURL("mailto:bragadotv@gmail.com&subject=Contacto")
    };

    // funcion para llamar por teléfono
    const handleOpenPhoneCallAsync = () => {
        const phoneNumber = "+5492342531692"
        Linking.openURL(`tel:${phoneNumber}`)
    };

    return (
        <View style={styles.loginContainer}>
            <Formik
                validationSchema={schema}
                initialValues={{ name: "", email: "", phone: "", message: "" }}
                onSubmit={async (values, { setSubmitting, resetForm }) => {
                    try {
                        const respu = await axios.post("https://backend.sib-2000.com.ar/mailapps/send-btv", values)
                        if (respu.data.estado === "OK") {
                            Alert.alert(
                                'Formulario de contacto',
                                respu.data.mensaje,
                                [
                                    {
                                        text: "OK", onPress: () => {
                                            Linking.openURL("/"); // Open Play Store for Android
                                        }
                                    },
                                ]
                            )
                        } else {
                            Alert.alert(respu.data.mensaje)
                        }
                    } catch (error) {
                        Alert.alert(error)
                    }
                    setSubmitting(false);
                    resetForm()
                }}
            >
                {({
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    values,
                    errors,
                    isValid,
                }) => (
                    <>
                        <Text>Nombre:</Text>
                        <TextInput
                            name="name"
                            placeholder="Ingrese su nombre"
                            style={styles.textInput}
                            onChangeText={handleChange('name')}
                            onBlur={handleBlur('name')}
                            value={values.name}

                        />
                        {errors.name &&
                            <Text style={{ fontSize: 16, color: 'red' }}>{errors.name}</Text>
                        }
                        <Text>Mail:</Text>
                        <TextInput
                            name="email"
                            placeholder="Ingrese su E-mail"
                            style={styles.textInput}
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            value={values.email}
                            keyboardType="email-address"
                        />
                        {errors.email &&
                            <Text style={{ fontSize: 16, color: 'red' }}>{errors.email}</Text>
                        }
                        <Text>Celular:</Text>

                        <TextInput
                            name="phone"
                            placeholder="Numero de celular"
                            style={styles.textInput}
                            onChangeText={handleChange('phone')}
                            onBlur={handleBlur('phone')}
                            value={values.phone}
                            keyboardType="number-pad"
                        />
                        {errors.phone &&
                            <Text style={{ fontSize: 16, color: 'red' }}>{errors.phone}</Text>
                        }
                        <Text>Mensaje / Comentario:</Text>
                        <TextInput
                            multiline={true}
                            numberOfLines={7}
                            name="message"
                            placeholder="Comentario"
                            style={styles.textArea}
                            onChangeText={handleChange('message')}
                            onBlur={handleBlur('message')}
                            value={values.message}
                        />
                        {errors.message &&
                            <Text style={{ fontSize: 16, color: 'red' }}>{errors.message}</Text>
                        }
                        <Button
                            onPress={() => handleSubmit()}
                            title="Enviar comentario"
                            disabled={!isValid}
                        />
                    </>
                )}
            </Formik>
            <View style={styles.contactarea}>
                <View>
                    <Text style={styles.rengtit}>Contactános</Text>
                </View>
                <View style={styles.renglon}>
                    <Pressable onPress={() => { _handlePressButtonAsync("https://bragadotv.com.ar") }}><MaterialCommunityIcons name="web" size={32} color="black" /></Pressable><Text style={styles.rengtext}>Web: https://bragadotv.com.ar</Text>
                </View>
                <View style={styles.renglon}>
                    <Pressable onPress={() => { handleOpenEmailboxAsync() }}><AntDesign name="mail" size={32} color="black" /></Pressable><Text style={styles.rengtext}>Mail: bragadotv@gmail.com</Text>
                </View>
                <View style={styles.renglon}>
                    <Text style={styles.rengtext}>Lunes a viernes: de 9 a 12 hs</Text>
                    <Pressable onPress={() => { handleOpenPhoneCallAsync() }}><Feather name="phone-call" size={32} color="black" /></Pressable><Text style={styles.rengtext}>Tel.: 2342 531692</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({

    loginContainer: {
        height: "80%",
        width: '95%',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 10,
        elevation: 10,
        backgroundColor: '#e6e6e6',
        alignSelf: "center"
    },
    textInput: {
        height: 40,
        width: '100%',
        margin: 10,
        backgroundColor: 'white',
        borderColor: 'gray',
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius: 10,
        color: "black"
    },
    textArea: {
        // height: 40,
        width: '100%',
        margin: 10,
        backgroundColor: 'white',
        borderColor: 'gray',
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius: 10,
        color: "red"
    },
    contactarea: {
        flexDirection: "column",
        backgroundColor: "lightblue",
        width: "100%",
        padding: 8,
        marginTop: 20
    },
    renglon: {
        flexDirection: "row",
         justifyContent: "space-evenly", 
         backgroundColor: "white",
         margin: 2
    },
    rengtext: {
        fontSize: 20, 
    },
    rengtit: {
        fontSize: 22, 
    }
})

export default Contact


