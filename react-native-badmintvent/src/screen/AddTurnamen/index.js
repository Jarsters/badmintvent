import React, { Component } from 'react';
import { Button, StyleSheet, TextInput, ScrollView, ActivityIndicator, View, Text } from 'react-native';
import { BACKGROUNG_COLOR, BOX_COLOR } from '../../helpers/colors';

import firestore from '@react-native-firebase/firestore';

class AddTurnamen extends Component {
  constructor() {
    super();
    // this.dbRef = firebase.firestore().collection('users');
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
      isLoading: false
    };
  }

  inputValueUpdate = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }

  storeUser() {
    if (this.state.nama === '') {
      alert('Fill at least your name!')
    } else {
      this.setState({
        isLoading: true,
      });
      this.setState({
        isLoading: false,
      });
      // console.log(this.state);
      // alert("YEAY")
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
        })
        .then((res) => {
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
            isLoading: false
          });
          console.log("RESPONSE: ", res)
          console.log('masuk')
        })
        .catch(err => {
          console.log("Error found: ", err);
        })
      //   this.dbRef.add({
      //     name: this.state.name,
      //     email: this.state.email,
      //     mobile: this.state.mobile,
      //   }).then((res) => {
      //     this.setState({
      //       name: '',
      //       email: '',
      //       mobile: '',
      //       isLoading: false,
      //     });
      //     this.props.navigation.navigate('UserScreen')
      //   })
      //   .catch((err) => {
      //     console.error("Error found: ", err);
      //     this.setState({
      //       isLoading: false,
      //     });
      //   });
    }
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E" />
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
            placeholder={'Nama Gor'}
            value={this.state.name}
            onChangeText={(val) => this.inputValueUpdate(val, 'gor')}
          />
        </View>
        <View style={styles.inputGroup}>
          <TextInput
            placeholder={'Kota Gor'}
            value={this.state.name}
            onChangeText={(val) => this.inputValueUpdate(val, 'kota')}
          />
        </View>
        <View style={styles.inputGroup}>
          <TextInput
            placeholder={'Jadwal Pertandingan'}
            value={this.state.name}
            onChangeText={(val) => this.inputValueUpdate(val, 'jadwal')}
          />
        </View>
        <View style={styles.inputGroup}>
          <TextInput
            placeholder={'Jumlah Tim'}
            value={this.state.name}
            onChangeText={(val) => this.inputValueUpdate(val, 'tim')}
          />
        </View>
        <View style={styles.inputGroup}>
          <TextInput
            placeholder={'Contact Person 1'}
            value={this.state.mobile}
            onChangeText={(val) => this.inputValueUpdate(val, 'cp1')}
          />
        </View>
        <View style={styles.inputGroup}>
          <TextInput
            placeholder={'Contact Person 2'}
            value={this.state.mobile}
            onChangeText={(val) => this.inputValueUpdate(val, 'cp2')}
          />
        </View>
        <View style={styles.inputGroup}>
          <TextInput
            placeholder={'Link Sosmed Event'}
            value={this.state.mobile}
            onChangeText={(val) => this.inputValueUpdate(val, 'sosmed')}
          />
        </View>
        <View style={styles.button}>
          <Button
            title='Tambahkan Event'
            onPress={() => this.storeUser()}
            color={BOX_COLOR}
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