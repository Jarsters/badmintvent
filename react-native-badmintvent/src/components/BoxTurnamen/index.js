import React from 'react';
import {
    Image,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { BOX_COLOR } from '../../helpers/colors';
import { DETAIL_ROUTE } from '../../helpers/routesNames';

const BoxTurnamen = ({nama_turnamen, penyelenggara, tanggal, nama_gor, kota, cp1, cp2, tim, sosmed, image_url, navigation}) => {
    const data = {
        nama:nama_turnamen,
        penyelenggara:penyelenggara,
        tanggal:tanggal,
        cp1:cp1,
        cp2:cp2,
        tim:tim,
        gor:nama_gor,
        kota:kota,
        sosmed:sosmed,
        image_url:image_url
    }
    return (
        // Box Turnamen
        <View
            style={{
                margin: 15,
                marginBottom:0
            }}
        >
            <TouchableOpacity
                style={{
                    width: "95%",
                    // height: 150,
                    backgroundColor: BOX_COLOR,
                    borderRadius: 15,
                }}
                onPress={() => {navigation.navigate(DETAIL_ROUTE, {
                    data: data
                })}}
            >
                {/* View pertama buat image dan informasi */}
                <View
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        paddingTop: 10,
                    }}
                >
                    {/* View Gambar */}
                    <View
                        style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: 100
                        }}
                    >
                        <Image
                            source={
                                image_url ? {uri: image_url} : require('../../assets/images/1.png')
                            }
                            style={{
                                width: 100,
                                height: 80,
                            }}
                        />
                    </View>
                    {/* View Informasi */}
                    <View
                        style={{
                            flex: 1,
                            paddingRight: 13,
                        }}
                    >
                        <Text style={{ marginBottom: 5, paddingTop: 5, fontWeight: 'bold' }}>{nama_turnamen ? nama_turnamen : 'NAMA TURNAMEN'}</Text>
                        <Text style={{ marginBottom: 5, }}>{penyelenggara ? penyelenggara : 'PENYELENGGARA'}</Text>
                        <Text style={{ color: (tanggal=='BUKA') ? 'yellow' : 'black', fontWeight: '700' }}>{tanggal ? tanggal : 'TANGGAL'}</Text>
                    </View>
                </View>
                {/* Nama Lokasi */}
                <View
                    style={{
                        paddingLeft: 25,
                        paddingBottom: 10
                    }}
                >
                    <Text>{nama_gor ? nama_gor : 'NAMA GOR'} - {kota ? kota : 'NAMA KOTA'}</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default BoxTurnamen