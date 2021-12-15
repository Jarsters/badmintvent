import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

const BoxFilter = ({nama_filter}) => {
    return (
        <View>
            <TouchableOpacity
              style={{
                // width: "25%",
                // height: 150,
                width:150,
                height: 40,
                backgroundColor: "red",
                borderRadius: 15,
                margin:10,
                justifyContent:'center'
              }}
            >
              <Text style={{alignSelf:'center', color:'white', fontWeight:'bold'}}>{nama_filter != null ? nama_filter : 'NAMA FILTER'}</Text>
            </TouchableOpacity>
          </View>
    )
}

export default BoxFilter
