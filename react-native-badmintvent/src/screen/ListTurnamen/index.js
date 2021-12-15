import React, { useEffect, useState } from 'react'
import { View, FlatList, RefreshControl } from 'react-native'
import BoxTurnamen from '../../components/BoxTurnamen'
import { BACKGROUNG_COLOR, TEXT } from '../../helpers/colors'

import firestore from '@react-native-firebase/firestore';
import SplashScreen from 'react-native-splash-screen';

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

const ListTurnamen = ({ navigation }) => {
    const [state, setState] = useState(null);

    const changeState = () => {
        setState("timeout");
    }

    const getData = async () => {
        const turnamen = [];
        const events = await firestore().collection('events').get()
            .then(querySnapshot => {
                querySnapshot.forEach(documentSnapshot => {
                    turnamen.push(documentSnapshot.data())
                });
            });
        setListTurnamen(turnamen);
        // if (turnamen) { console.log(turnamen) }
    }

    // get data once when application running
    useEffect(()=>{
        getData()
    }, [])

    const [listTurnamen, setListTurnamen] = useState(null);

    // for hiding SplashScreen when open an application
    useEffect(() => {
        changeState();
        if (state) {
            SplashScreen.hide();
        };
    }, [state])


    // for refreshing data
    const [Refreshing, setRefreshing] = useState(false)
    const onRefreshing = () => {
        setRefreshing(true);
        getData();
        setRefreshing(false);
    }

    return (
        <View
            style={{ backgroundColor: BACKGROUNG_COLOR }}
        >

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
                                tanggal={item.jadwal.toUpperCase()}
                                nama_gor={item.gor.toUpperCase()}
                                kota={item.kota.toUpperCase()}
                                cp1={item.cp1.toUpperCase()}
                                cp2={item.cp2.toUpperCase()}
                                tim={item.tim}
                                sosmed={item.sosmed.toUpperCase()}
                                // image_url={item.image_url}
                                navigation={navigation}
                            />
                        </View>
                    )
                }}
                refreshControl={
                    <RefreshControl
                        refreshing={Refreshing}
                        onRefresh={onRefreshing}
                        colors={['#02A799']}
                    />
                }
            />
        </View>
    )
}

export default ListTurnamen
