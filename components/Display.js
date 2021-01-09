import React, {Component} from 'react';
import {StyleSheet, Text, View, Animated} from 'react-native';
import {color} from 'react-native-reanimated';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

class display extends Component {
  state = {
    LogoAnime: new Animated.Value(0),
    LogoText: new Animated.Value(0),
    loadingSpinner: false,
  };

  constructor(props) {
    super(props);
    setTimeout(() => {
      this.props.navigation.navigate('Login');
    }, 5000);
  }

  componentDidMount() {
    const {LogoAnime, LogoText} = this.state;
    Animated.parallel([
      Animated.spring(LogoAnime, {
        toValue: 1,
        tension: 10,
        friction: 2,
        duration: 1000,
      }).start(),

      Animated.timing(LogoText, {
        toValue: 1,
        tension: 10,
        friction: 2,
        duration: 1000,
      }),
    ]).start(() => {
      this.setState({loadingSpinner: true});
    });
  }
  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#0070C0',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Animated.View
          style={{
            opacity: this.state.LogoAnime,
            top: this.state.LogoAnime.interpolate({
              inputRange: [0, 1],
              outputRange: [80, 0],
            }),
          }}>
          <FontAwesome5 name="shopping-cart" size={160} color="#fff" />
        </Animated.View>
        <Animated.View style={{opacity: this.state.LogoText}}>
          <Text style={[styles.logoText, {color: '#f8ca00'}]}>Shopping</Text>
          <Text style={[styles.logoText, {color: '#fff'}]}> Hub</Text>
        </Animated.View>
      </View>
    );
  }
}

export default display;

const styles = StyleSheet.create({
  logoText: {
    fontSize: 30,
    textAlign: 'center',
    fontWeight: '700',
  },
});
