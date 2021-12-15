import React from 'react'
import { View, Text, FlatList, ScrollView, TouchableOpacity } from 'react-native'
import BoxTurnamen from '../../components/BoxTurnamen'
import { BACKGROUNG_COLOR, TEXT } from '../../helpers/colors'
import { DETAIL_ROUTE } from '../../helpers/routesNames'

import firestore from '@react-native-firebase/firestore';

/*
<BoxTurnamen 
          nama_turnamen={"dekan cup fmipa unj".toUpperCase()}
          penyelenggara={"fmipa".toUpperCase()}
          status={"TUTUP".toUpperCase()}
          nama_gor={'gor spirit'.toUpperCase()}
          kota={'jakarta timur'.toUpperCase()}
/>

warna: 
    1. #D3E4CD - Background Color
    2. #00A799 - Color Box
    3. #F2DDC1 - Text in Box
    4. #FF426D - Text in Box
*/


const getData = async () => {
    const events = await firestore().collection('events').get()
        .then(querySnapshot => {
            console.log('Total events: ', querySnapshot.size);

            querySnapshot.forEach(documentSnapshot => {
                console.log('Events ID: ', documentSnapshot.id, documentSnapshot.data());
            });
        });
    if (events) { console.log(events) }
}

getData()

const listTurnamen = [
    {
        'nama': 'dekan cup fmipa unj',
        'penyelenggara': 'fmipa',
        'status': 'tutup',
        'gor': 'gor spirit',
        'kota': 'jakarta timur',
        'tanggal': '11 desember 2021 - 12 desember 2021',
        'cp1': '08xxxxxxxxxxxx',
        'cp2': '08xxxxxxxxxxxx',
        'tim': '20',
        'sosmed': 'https://instagram.com/rezas_esa',
        'image_url': '',
    },
    {
        'nama': 'dekan cup fmipa unj 2',
        'penyelenggara': 'fmipa',
        'status': 'tutup',
        'gor': 'gor serbaguna',
        'kota': 'jakarta timur',
        'tanggal': '21 desember 2021 - 22 desember 2021',
        'cp1': '08xxxxxxxxxxxx',
        'cp2': '08xxxxxxxxxxxx',
        'tim': '20',
        'sosmed': 'https://instagram.com/rezas_esa',
        'image_url': '',
    },
    {
        'nama': 'dekan cup fmipa unj 3',
        'penyelenggara': 'fmipa',
        'status': 'buka',
        'gor': 'gor kinasih',
        'kota': 'jakarta timur',
        'tanggal': '19 desember 2021 - 20 desember 2021',
        'cp1': '08xxxxxxxxxxxx',
        'cp2': '08xxxxxxxxxxxx',
        'tim': '20',
        'sosmed': 'https://instagram.com/rezas_esa',
        'image_url': '',
    },
    {
        'nama': 'pb djarum cup',
        'penyelenggara': 'pb djarum',
        'status': 'buka',
        'gor': 'gor lamahu',
        'kota': 'jakarta timur',
        'tanggal': '17 desember 2021 - 18 desember 2021',
        'cp1': '08xxxxxxxxxxxx',
        'cp2': '08xxxxxxxxxxxx',
        'tim': '20',
        'sosmed': 'https://instagram.com/rezas_esa',
        'image_url': '',
    },
    {
        'nama': 'pb djarum cup 2',
        'penyelenggara': 'pb djarum',
        'status': 'buka',
        'gor': 'gor lamahu',
        'kota': 'jakarta timur',
        'tanggal': '15 desember 2021 - 16 desember 2021',
        'cp1': '08xxxxxxxxxxxx',
        'cp2': '08xxxxxxxxxxxx',
        'tim': '20',
        'sosmed': 'https://instagram.com/rezas_esa',
        'image_url': '',
    },
    {
        'nama': 'pb djarum cup 3',
        'penyelenggara': 'pb djarum',
        'status': 'buka',
        'gor': 'gor lamahu',
        'kota': 'jakarta timur', 'tanggal': '13 desember 2021 - 14 desember 2021',
        'cp1': '08xxxxxxxxxxxx',
        'cp2': '08xxxxxxxxxxxx',
        'tim': '20',
        'sosmed': 'https://instagram.com/rezas_esa',
        'image_url': '',
    },
]

const ListTurnamen = ({ navigation }) => {
    return (
        <View
            style={{ backgroundColor: BACKGROUNG_COLOR }}
        >
            {/* <Text>INI DARI LIST TURNAMEN</Text> */}

            <FlatList
                keyExtractor={(item, index) => index.toString()}
                data={listTurnamen}
                renderItem={({ item, index }) => {
                    return (
                        // nama_turnamen, penyelenggara, status, tanggal, nama_gor, kota, cp1, cp2, tim, sosmed, image_url,?
                        <View>
                            <BoxTurnamen
                                nama_turnamen={item.nama.toUpperCase()}
                                penyelenggara={item.penyelenggara.toUpperCase()}
                                status={item.status.toUpperCase()}
                                tanggal={item.tanggal.toUpperCase()}
                                nama_gor={item.gor.toUpperCase()}
                                kota={item.kota.toUpperCase()}
                                cp1={item.cp1.toUpperCase()}
                                cp2={item.cp2.toUpperCase()}
                                tim={item.tim}
                                sosmed={item.sosmed}
                                image_url={item.image_url}
                                navigation={navigation}
                            />
                        </View>
                    )
                }}
            >
            </FlatList>
        </View>
    )
}

export default ListTurnamen
