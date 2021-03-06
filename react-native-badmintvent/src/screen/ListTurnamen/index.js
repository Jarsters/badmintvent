import React, { useEffect, useState } from 'react'
import { View, FlatList, RefreshControl, Text, ScrollView } from 'react-native'
import BoxTurnamen from '../../components/BoxTurnamen'
import { BACKGROUNG_COLOR } from '../../helpers/colors'

import firestore from '@react-native-firebase/firestore';
import SplashScreen from 'react-native-splash-screen';
import Icon from '../../components/Icon';

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
        if (turnamen.length === 0) { setListTurnamen(null) }
        // if (turnamen) { console.log(turnamen) }
    }

    // get data once when application running
    useEffect(() => {
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
            style={{ backgroundColor: BACKGROUNG_COLOR, flex: 1 }}
        >
            {listTurnamen ? (
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
                                    posted_by={item.posted_by}
                                    posted_at={item.posted_at}
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
                />) : (
                <ScrollView
                    contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
                    refreshControl={
                        <RefreshControl
                            refreshing={Refreshing}
                            onRefresh={onRefreshing}
                            colors={['#02A799']}
                        />
                    }
                >
                    <Text style={{ textAlign: 'center', fontSize: 25 }} color={"#000"}>
                        <Icon type={"fa5"} name={"folder-minus"} size={25} color={"#000"} />
                        Data tidak ditemukan!
                    </Text>
                </ScrollView>
            )}
        </View>
    )
}

export default ListTurnamen
