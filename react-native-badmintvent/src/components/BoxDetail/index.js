import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import { BOX_COLOR } from '../../helpers/colors'

const d = {
    'nama': 'dekan cup fmipa unj',
    'penyelenggara': 'fmipa',
    'status': 'ditutup',
    'gor': 'gor spirit',
    'kota': 'jakarta timur',
    'tanggal': '11 Desember 2021 - 12 Desember 2021',
    'cp1': '08xxxxxxxxxx',
    'cp2': '08xxxxxxxxxx',
    'jumlah_tim': '20',
    'image': ''
}


const BoxDetail = ({image, nama, penyelenggara, tanggal, gor, kota, cp1, cp2, tim, status, sosmed}) => {
    return (
        <View
            style={{
                backgroundColor: BOX_COLOR,
                justifyContent: 'center',
                alignContent: 'center',
                margin: 30,
                borderRadius: 5,
            }}
        >
            <View style={{
                paddingLeft: 10,
            }}>

                <Image
                    source={
                        image ? { uri: image } : require('../../assets/images/shuttlecock.jpg')
                    }
                    style={{
                        marginVertical: 10,
                        // width: 100,
                        width: "75%",
                        height: 180,
                        // height: "20%",
                        alignSelf:'center'
                    }}
                />
                <Text style={{
                    fontWeight: 'bold',
                    fontSize: 20,
                }}>{nama}</Text>
                <Text>{penyelenggara}</Text>
                <Text style={[styles.text,{fontWeight:'bold'}]}>Tanggal main</Text>
                <Text>{tanggal}</Text>

                <Text style={{
                    marginTop:10,
                }}>{gor} - {kota}</Text>
                <Text style={styles.text}>Contact Person 1: {cp1}</Text>
                <Text style={styles.text}>Contact Person 2: {cp2}</Text>
                <Text style={styles.text}>Sosial Media: {sosmed}</Text>
                <Text style={styles.text}>Jumlah peserta: {tim} Tim</Text>
                <Text style={{marginTop:10, paddingTop:5, marginBottom:5}}>Pendaftaran {status}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    text:{
        marginTop:5,
    },
})


export default BoxDetail
