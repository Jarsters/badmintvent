import React from 'react'
import { View, Text, ScrollView } from 'react-native'
import BoxDetail from '../../components/BoxDetail'
import { BACKGROUNG_COLOR } from '../../helpers/colors'

const DetailTurnamen = ({ route }) => {
    const { data } = route.params;
    console.log(data);
    return (
        // image, nama, penyelenggara, tanggal, gor, kota, cp1, cp2, tim, status
        <ScrollView
            style={{
                backgroundColor: BACKGROUNG_COLOR,
                flex: 1,
            }}
        >
            <View>
                <BoxDetail
                    nama={data.nama}
                    penyelenggara={data.penyelenggara}
                    image={data.image_url}
                    gor={data.gor}
                    kota={data.kota}
                    tanggal={data.tanggal}
                    cp1={data.cp1}
                    cp2={data.cp2}
                    tim={data.tim}
                    status={data.status}
                    sosmed={data.sosmed}
                />
            </View>
        </ScrollView>
    )
}

export default DetailTurnamen
