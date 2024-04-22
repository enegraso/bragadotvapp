import * as Yup from 'yup'
import { Formik } from 'formik'
import { TextInput, StyleSheet, Button, View, Text, Alert, Linking } from 'react-native';
import axios from 'axios';

const Contact = () => {

    const emailRegExp = /^[a-zA-Z0–9._-]+@[a-zA-Z0–9.-]+\.[a-zA-Z]{2,4}$/
    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

    const schema = Yup.object().shape({
        phone: Yup.string().matches(phoneRegExp, 'Phone number is not valid').max(13, "Máximo 13 caracteres numericos"),
        name: Yup.string().required("Tu nombre es requerido"),
        email: Yup.string().required("Tu email es requerido"), //.matches(emailRegExp, "Formato del mail incorrecto"),
        message: Yup.string().required("Por favor ingrese un mensaje"),
    })

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
                            numberOfLines={10}
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
})

export default Contact


