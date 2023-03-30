import React from "react";
import { Alert,Image,View } from "react-native";
import Input from "../../component/Input";
import Button from "../../component/Button";
import styles from './Login.style';
import { Formik } from "formik";
import usePost from "../../hooks/usePost";
import {useDispatch,useSelector} from 'react-redux';
import AsyncStorage from "@react-native-async-storage/async-storage";
const Login=({navigation})=>{
    const user = useSelector(state => state.user)
    const { data, loading, error, post } = usePost();

    const dispatch = useDispatch()

    const handleLogin = (values) => {
        console.log(values);
        post("https://fakestoreapi.com/auth/login", (values))
    }


    if (error) {
        console.log(error);
        Alert.alert("Shopping", "Bir hata oluştu")
    }
    if (data) {
        if (data.status === "Error") {
            Alert.alert("Shopping", "Kullanıcı Bulunamadı")
        } else {
            
            dispatch({ type: 'SET_USER', payload: { user: JSON.stringify(user) } })
        }
    }


    return (
        <View style={styles.container}>
            <View style={styles.logo_container}>
            </View>
            <Formik
                initialValues={{ username: '', password: '' }}
                onSubmit={handleLogin}npm ru
            >
                {({ handleChange, handleSubmit, values }) => (
                    <View style={styles.body_container}>
                        <Input
                            placeholder="Kullanıcı Adınızı giriniz..."
                            value={values.username}
                            onType={handleChange('username')}
                            iconName="account"
                        />
                        <Input
                            placeholder="Şifrenizi giriniz..."
                            value={values.password}
                            onType={handleChange('password')}
                            iconName="key"
                            isSecure
                        />

                        <Button text="Giriş yap" onPress={handleSubmit} loading={loading} />
                    </View>
                )}
            </Formik>
        </View>
    )
}
export default Login;