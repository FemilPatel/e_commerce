import React, {Component} from 'react';
import {Text, StyleSheet, View, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default class Home extends Component {
  render() {
    return (
      <>
        <View
          style={{
            flex: 0.9,
            flexDirection: 'row',
            backgroundColor: '#0070C0',
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity
          //onPress={() => this.props.navigation.toggleDrawer()}
          >
            <Ionicons
              style={{color: '#fff', marginHorizontal: 10, marginVertical: 5}}
              name="filter"
              size={35}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons
              style={{color: '#fff', marginHorizontal: 10, marginVertical: 5}}
              name="search"
              size={35}
            />
          </TouchableOpacity>
        </View>
        <View style={{flex: 10, backgroundColor: '#fff'}}>
          <Text> Home </Text>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({});
