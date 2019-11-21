import React, { Component } from 'react';
import { View, ActivityIndicator}  from 'react-native';
import {Text, Input ,Button} from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'
import { connect } from 'react-redux'
import Axios from 'axios'
import { urlApi } from '../supports/url';

class Register extends Component {
    state={
        look : true,
        username: '',
        password : '',
        email : '',
        confim_password : '',
        username_available : null,
        loading_check_username : false,
        loading_btn_register : false
    }

    onCheckUsername = () => {
        this.setState({loading_check_username : true})
        console.log('trigered')
        Axios.post(urlApi + 'auth/check-username',{username : this.state.username})
        .then((res) => {
            if(res.data.error){
                // munculin
            }else{
                this.setState({username_available:res.data.available})
            }
        })
        .catch((err) => {
            console.log(err)
        })

    }

    onBtnRegisterClick = () => {
        this.setState({loading_btn_register : true})
        
        var { username,password,email } = this.state
        var date= new Date()
        if(username && password && email){
            if(password !== this.state.confim_password){
                return alert('Password Tidak sama')
            }
            Axios.post(urlApi + 'auth/register',{
                username,
                password,
                email,
                created_at : `${date.getDate()}-${date.getMonth()}-${date.getFullYear().toString().slice(-2)} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
            })
            .then((res) => {
                console.log(res.data)
                if(res.data.error){
                    alert(res.data.message)
                }
                else{
                    alert(res.data.message)
                }
            })
            .catch((err) => {
                console.log(err)
            })
        }

        // Check Username
        // Check Email
        // Ambil Data Dari Semua Form
        // Kirim Data Ke APi
        // Redirect Ke HOME
    }

    render() {

    return (
      <View style={{flex:1,justifyContent:'center',paddingHorizontal:20}}>
        <Text style={{alignSelf:'center'}} h1> {this.props.user} </Text>
        <View style={{marginTop:30}}>
            <Input
                onChangeText={(text) => this.setState({username:text})}
                onBlur={this.onCheckUsername}
                placeholder='Username'
                rightIcon={
                    this.state.username === '' || this.state.loading_check_username === false?
                    null
                    :
                    this.state.username_available ?
                    <Icon
                        name='check'
                        size={24}
                        color='green'
                        style={{paddingLeft:10}}
                    /> 
                    : 
                    
                    this.state.loading_check_username ? 
                    <ActivityIndicator size='small' />
                    :
                    <Icon
                        name='times'
                        size={24}
                        color='red'
                        style={{paddingLeft:10}}
                    />   
                }
                leftIcon={
                    <Icon
                    name='user'
                    size={24}
                    color='black'
                    style={{paddingRight:10}}
                    />
                }
            />
        </View>
        <View style={{marginTop:15}}>
            <Input
                onChangeText={(email) => this.setState({email: email})}
                placeholder='Email'
                leftIcon={
                    <Icon
                    name='envelope'
                    size={24}
                    color='black'
                    style={{paddingRight:10}}
                    />
                }
            />
        </View>

        <View style={{marginTop:15}}>
            <Input
                onChangeText={(text) => this.setState({password: text})}
                secureTextEntry={this.state.look}
                placeholder='Password'
                leftIcon={
                    <Icon
                    name='lock'
                    size={24}
                    color='black'
                    style={{paddingRight:10}}
                    />
                }
                rightIcon={
                    <Icon
                    name='eye'
                    size={24}
                    color='black'
                    style={{paddingRight:10}}
                    onPress={() => this.setState({look : !this.state.look})}
                    />
                }
            />
        </View>
        <View style={{marginTop:15}}>
            <Input
                onChangeText={(text) => this.setState({confim_password: text})}
                secureTextEntry={this.state.look}
                placeholder='Confirm Password'
                errorMessage= 
                {
                    (this.state.confim_password !=='') && (this.state.password !== this.state.confim_password)
                    ?
                    'password doesnt match':
                    null
                } 
                
                leftIcon={
                    <Icon
                    name='lock'
                    size={24}
                    color='black'
                    style={{paddingRight:10}}
                    />
                }
                rightIcon={
                    <Icon
                    name='eye'
                    size={24}
                    color='black'
                    style={{paddingRight:10}}
                    onPress={() => this.setState({look : !this.state.look})}
                    />
                }
            />
        </View>
        
        <View style={{marginTop:30}}>
            <Button
                title='Register'
                loading={this.state.loading_btn_register}
                onPress={this.onBtnRegisterClick}
                // loading={true}
            />
        </View>

        <View style={{flexDirection:'row', marginTop:15}}>
            <View style={{flex:1}}>
                <Button
                     icon={
                        <Icon 
                            name='google'
                            size={25}
                            color='white'
                        />
                    }
                    buttonStyle={{backgroundColor:'red'}}

                />
            </View>
            <View style={{flex:1}}>
                <Button
                    icon={
                        <Icon 
                            name='facebook'
                            size={25}
                            color='white'
                        />
                    }
                    buttonStyle={{backgroundColor:'blue'}}
                />
            </View>
        </View>
        <View style={{flexDirection:'row',justifyContent:'center',marginTop:15}}>
            <Text> Sudah Punya Akun? </Text>
            <Text style={{fontWeight:'bold'}} onPress={() => this.props.navigation.navigate('login')}>Login</Text>
        </View>
        
      </View>
    );
  }
}

const mapStateToProps = (state) => {
    return{
        user : state.users.username,
        // caption : state.bebas.caption
    }
}

export default connect(mapStateToProps)(Register);