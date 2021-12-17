import React, { Component } from 'react';
import { Button, StyleSheet, TextInput, ScrollView, ActivityIndicator, View } from 'react-native';
import { BACKGROUNG_COLOR, BOX_COLOR } from '../../helpers/colors';

import firestore from '@react-native-firebase/firestore';
import { LOGIN_ROUTE } from '../../helpers/routesNames';
import AsyncStorage from '@react-native-async-storage/async-storage';

class AddTurnamen extends Component {
  constructor() {
    super();
    const d = new Date(Date.now());
    const day = d.toLocaleDateString();
    this.state = {
      nama: '',
      penyelenggara: '',
      gor: '',
      kota: '',
      jadwal: '',
      tim: '',
      cp1: '',
      cp2: '',
      sosmed: '',
      posted_by: '',
      posted_at: day,
      isLoading: false
    };
    const getEmail = async () => {
      const value = await AsyncStorage.getItem('userInfo')
      const uvalue = JSON.parse(value);
      const email = uvalue.user.email;
      this.setState({
        posted_by: email,
      })
    }
    getEmail();
  }

  inputValueUpdate = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }

  helpTgl(v, tgl, thn){
    if(isNaN(v) || isNaN(thn)) { return true }
    if(thn % 4 === 0 && tgl == "28" ) { tgl = "29" }
    if(0 < v && v <= tgl) { return false }
    return true;
  }

  inValidateDay(hday) {
    if(hday === '') { return true }
    const date = hday.toUpperCase()
    const tgl = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    const month = ['JANUARI', 'FEBRUARI', 'MARET', 'APRIL', 'MEI', 'JUNI', 'JULI', 'AGUSTUS', 'SEPTEMBER', 'OKTOBER', 'NOVEMBER', 'DESEMBER']
    const date_split = date.split(' ')
    const m1 = month.indexOf(date_split[1])
    const m2 =  month.indexOf(date_split[5])
    // cek panjang
    if(date_split.length !== 7) { return true }
    // cek bulan
    if( m1 < 0 || m2 < 0) { return true }
    // cek tanggal dan juga cek jika tanggal memuat string dan juga mengecek jika tahun bukan angka
    if( this.helpTgl(date_split[0], tgl[m1], date_split[2]) || this.helpTgl(date_split[4], tgl[m2], date_split[6]) ) { return true }
    return false;
  }

  storeUser() {
    if (this.state.nama === '') {
      alert('MASUKKAN NAMA EVENT')
    } 
    else if (this.state.penyelenggara === ''){
      alert('MASUKKAN NAMA PENYELENGGARA')
    }
    else if (this.state.gor === ''){
      alert('MASUKKAN NAMA GOR')
    }
    else if (this.state.kota === ''){
      alert('MASUKKAN NAMA KOTA GOR')
    }
    else if (this.inValidateDay(this.state.jadwal)){
      alert('FORMAT JADWAL\n11 DESEMBER 2021 - 12 DESEMBER 2021')
    }
    else if (this.state.tim === '' || isNaN(this.state.tim)) {
      alert('MASUKKAN TOTAL TIM (CONTOH : 64)')
    }
    else if (this.state.cp1 === '' || this.state.cp2 === '' || isNaN(this.state.cp1) || isNaN(this.state.cp2)){
      alert('MASUKKAN NOMOR TELEPON CONTACT PERSON DENGAN BENAR')
    }
    else {
      this.setState({
        isLoading: true,
      });
      firestore()
        .collection('events')
        .add({
          nama: this.state.nama,
          penyelenggara: this.state.penyelenggara,
          gor: this.state.gor,
          kota: this.state.kota,
          jadwal: this.state.jadwal,
          tim: this.state.tim,
          cp1: this.state.cp1,
          cp2: this.state.cp2,
          sosmed: this.state.sosmed,
          posted_by: this.state.posted_by,
          posted_at: this.state.posted_at
        })
        .then((res) => {
        })
        .then(async () => {
          const value = await AsyncStorage.getItem('userInfo')
          const uvalue = JSON.parse(value);
          const email = uvalue.user.email;
          const body = {
            title: 'Event - ' + this.state.nama.toUpperCase(),
            message: 'Lomba diselenggarakan oleh ' + this.state.penyelenggara.toUpperCase() +
              ' di kota ' + this.state.kota.toUpperCase() +
              ' untuk info lebih lengkapnya cek di aplikasimu ya!',
            nama: email,
          }
          this.setState({
            nama: '',
            penyelenggara: '',
            gor: '',
            kota: '',
            jadwal: '',
            tim: '',
            cp1: '',
            cp2: '',
            sosmed: '',
          });
          const rawResponse = await fetch('https://fcm-server-1.herokuapp.com/send-message-topic', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
          });
          const content = await rawResponse.json();

          this.setState({
            isLoading: false,
          });

          // console.log(content);
          alert('Data berhasil ditambahkan.')
          this.props.navigation.navigate(LOGIN_ROUTE);
        })
        .catch(err => {
          console.log("Error found: ", err);
        })
    }
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={[styles.preloader, { backgroundColor: BACKGROUNG_COLOR }]}>
          <ActivityIndicator size="large" color={BOX_COLOR} />
        </View>
      )
    }
    return (
      <ScrollView style={styles.container}>
        <View style={styles.inputGroup}>
          <TextInput
            placeholder={'Nama Event'}
            value={this.state.name}
            onChangeText={(val) => this.inputValueUpdate(val, 'nama')}
          />
        </View>
        <View style={styles.inputGroup}>
          <TextInput
            placeholder={'Penyelenggara Event'}
            value={this.state.email}
            onChangeText={(val) => this.inputValueUpdate(val, 'penyelenggara')}
          />
        </View>
        <View style={styles.inputGroup}>
          <TextInput
            placeholder={'Nama Gor (contoh: spirit)'}
            value={this.state.name}
            onChangeText={(val) => this.inputValueUpdate(val, 'gor')}
          />
        </View>
        <View style={styles.inputGroup}>
          <TextInput
            placeholder={'Kota Gor (contoh: jakarta timur)'}
            value={this.state.name}
            onChangeText={(val) => this.inputValueUpdate(val, 'kota')}
          />
        </View>
        <View style={styles.inputGroup}>
          <TextInput
            placeholder={'Jadwal Pertandingan (contoh: 11 desember 2021 - 13 desember 2021'}
            value={this.state.name}
            onChangeText={(val) => this.inputValueUpdate(val, 'jadwal')}
          />
        </View>
        <View style={styles.inputGroup}>
          <TextInput
            placeholder={'Jumlah Tim (contoh: 32) '}
            value={this.state.name}
            onChangeText={(val) => this.inputValueUpdate(val, 'tim')}
          />
        </View>
        <View style={styles.inputGroup}>
          <TextInput
            placeholder={'Contact Person 1 (contoh: 08xxxx)'}
            value={this.state.mobile}
            onChangeText={(val) => this.inputValueUpdate(val, 'cp1')}
          />
        </View>
        <View style={styles.inputGroup}>
          <TextInput
            placeholder={'Contact Person 2 (contoh: 08xxxx)'}
            value={this.state.mobile}
            onChangeText={(val) => this.inputValueUpdate(val, 'cp2')}
          />
        </View>
        <View style={styles.inputGroup}>
          <TextInput
            placeholder={'Link Sosmed Event (contoh: ig - bwf.official, atau lainnya)'}
            value={this.state.mobile}
            onChangeText={(val) => this.inputValueUpdate(val, 'sosmed')}
          />
        </View>
        <View style={styles.button}>
          <Button
            title='Tambahkan Event'
            onPress={() => this.storeUser()}
            color={BOX_COLOR}
            disabled={this.state.isLoading}
          />
        </View>
        <View style={{ marginBottom: 100 }}></View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35,
    backgroundColor: BACKGROUNG_COLOR
  },
  inputGroup: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default AddTurnamen;