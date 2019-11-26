import React, { Component } from 'react';
import { View,ScrollView, ActivityIndicator } from 'react-native';
import {Image,Avatar, Text} from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'
import Post from './../components/post'
import { urlApi } from '../supports/url';
import Axios from 'axios';
const data =[
    {username : 'fikri' , url_foto : 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQKrpS7K4U5ju_Jqtj69t2SW90P8G0yInzjmySwy-McoemFPXj0', caption : 'caption',likes : 10},
    {username : 'andi' , url_foto : 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQKrpS7K4U5ju_Jqtj69t2SW90P8G0yInzjmySwy-McoemFPXj0', caption : 'caption',likes : 10},
    {username : 'budi' , url_foto : 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQKrpS7K4U5ju_Jqtj69t2SW90P8G0yInzjmySwy-McoemFPXj0', caption : 'caption',likes : 10},
    {username : 'seto' , url_foto : 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQKrpS7K4U5ju_Jqtj69t2SW90P8G0yInzjmySwy-McoemFPXj0', caption : 'caption',likes : 10},
    {username : 'susilo' , url_foto : 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQKrpS7K4U5ju_Jqtj69t2SW90P8G0yInzjmySwy-McoemFPXj0', caption : 'caption',likes : 10},
]


export default class home extends Component {
  state = {data : null}
  
  componentDidMount(){
    Axios.get(urlApi + 'post/getallpost')
    .then((data) => {
      this.setState({data:data.data.data})
    })
    .catch((err) => {
      console.log(err)
    })
  }

  render() {
    if(this.state.data === null){
      return(
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <ActivityIndicator size='large' />
      </View>
      )
    }
    return (
      <ScrollView style={{paddingTop:30}}>
        {
          this.state.data.map((val) => {
            return(
              <Post avatarUrl={urlApi + "public/profile/default.png"} postUrl = {urlApi + val.foto_url} username={val.username} caption={val.caption}/>
            )
          })
        }
        
      </ScrollView>
    );
  }
}
