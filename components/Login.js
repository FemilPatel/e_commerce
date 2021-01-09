import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  TouchableOpacity,
  CheckBox,
  Alert,
  ScrollView,
} from 'react-native';
import Svg, {Image, Circle, ClipPath} from 'react-native-svg';
import Animated, {
  Clock,
  clockRunning,
  debug,
  Easing,
  Extrapolate,
  interpolate,
  startClock,
  stopClock,
  timing,
  concat,
} from 'react-native-reanimated';
import {TapGestureHandler, State} from 'react-native-gesture-handler';
import Entypo from 'react-native-vector-icons/Entypo';
import Fontisto from 'react-native-vector-icons/Fontisto';

const {width, height} = Dimensions.get('window');
const {Value, event, block, cond, eq, set} = Animated;

function runTiming(clock, value, dest) {
  const state = {
    finished: new Value(0),
    position: new Value(0),
    time: new Value(0),
    frameTime: new Value(0),
  };

  const config = {
    duration: 1000,
    toValue: new Value(0),
    easing: Easing.inOut(Easing.ease),
  };

  return block([
    cond(clockRunning(clock), 0, [
      set(state.finished, 0),
      set(state.time, 0),
      set(state.position, value),
      set(state.frameTime, 0),
      set(config.toValue, dest),
      startClock(clock),
    ]),
    timing(clock, state, config),
    cond(state.finished, debug('stop clock', stopClock(clock))),
    state.position,
  ]);
}

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      check: false,
      email: '',
      password: '',
    };

    this.buttonOpacity = new Value(1);
    this.onStateChange = event([
      {
        nativeEvent: ({state}) =>
          block([
            cond(
              eq(state, State.END),
              set(this.buttonOpacity, runTiming(new Clock(), 1, 0)),
            ),
          ]),
      },
    ]);

    this.onCloseState = event([
      {
        nativeEvent: ({state}) =>
          block([
            cond(
              eq(state, State.END),
              set(this.buttonOpacity, runTiming(new Clock(), 0, 1)),
            ),
          ]),
      },
    ]);

    this.buttonY = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [100, 0],
      extrapolate: Extrapolate.CLAMP,
    });
    this.bgy = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [-height / 3 - 65, 0],
      extrapolate: Extrapolate.CLAMP,
    });

    this.txtInputZindex = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [1, -1],
      extrapolate: Extrapolate.CLAMP,
    });

    this.txtInputY = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [0, 100],
      extrapolate: Extrapolate.CLAMP,
    });

    this.txtInputOpacity = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [1, 0],
      extrapolate: Extrapolate.CLAMP,
    });

    this.rotateCross = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [180, 360],
      extrapolate: Extrapolate.CLAMP,
    });
  }

  CheckBoxText() {
    this.setState({
      check: !this.state.check,
    });
  }

  validates = () => {
    let text = this.state.email;
    let emailError = this.state.emails;
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    let texts = this.state.password;
    let regs = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;

    if (reg.test(text) === false && regs.test(texts) === false) {
      Alert.alert(
        'Alert Title',
        'Invalid EmailId and Password',

        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        {cancelable: false},
      );
      this.setState({email: text});
      this.setState({password: texts});
      return false;
    } else if (reg.test(text) === false) {
      Alert.alert(
        'Alert Title',
        'Invalid EmailId',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        {cancelable: false},
      );
      this.setState({email: text});
      return false;
    } else if (regs.test(texts) === false) {
      Alert.alert(
        'Alert Title',
        'Invalid Password',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        {cancelable: false},
      );
      this.setState({password: texts});
      return false;
    } else {
      this.setState({email: text});
      this.setState({password: texts});
    }
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#fff',
          justifyContent: 'flex-end',
          height: height / 1,
        }}>
        <Animated.View
          style={{
            ...StyleSheet.absoluteFill,
            transform: [{translateY: this.bgy}],
          }}>
          <Svg height={height} width={width}>
            <ClipPath id="clip">
              <Circle r={height} cx={width / 2} />
            </ClipPath>
            <Image
              href={require('../assets/shopping2.jpg')}
              width={width}
              height={height + 20}
              preserveAspectRatio="xMidYMid slice"
              clipPath="url(#clip)"
            />
          </Svg>
        </Animated.View>
        <View style={{height: height / 3}}>
          <TapGestureHandler onHandlerStateChange={this.onStateChange}>
            <Animated.View
              style={{
                ...styles.txtBtn,
                opacity: this.buttonOpacity,
                transform: [{translateY: this.buttonY}],
              }}>
              <Text style={{fontWeight: '700', color: '#0070C0'}}>SIGN IN</Text>
            </Animated.View>
          </TapGestureHandler>
          <Animated.View
            style={{
              ...styles.txtBtn,
              backgroundColor: '#0070C0',
              opacity: this.buttonOpacity,
              transform: [{translateY: this.buttonY}],
            }}>
            <Text style={{color: 'white', fontWeight: '700'}}>
              SIGN IN WITH FACEBOOK
            </Text>
          </Animated.View>

          <Animated.View
            style={{
              zIndex: this.txtInputZindex,
              opacity: this.txtInputOpacity,
              transform: [{translateY: this.txtInputY}],
              height: height / 3,
              ...StyleSheet.absoluteFill,
              top: null,
              justifyContent: 'center',
            }}>
            <TapGestureHandler onHandlerStateChange={this.onCloseState}>
              <Animated.View style={styles.btnClose}>
                <Animated.Text
                  style={{
                    fontSize: 20,
                    transform: [{rotate: concat(this.rotateCross, 'deg')}],
                  }}>
                  X
                </Animated.Text>
              </Animated.View>
            </TapGestureHandler>
            <ScrollView>
              <View style={[styles.txtInput, {flexDirection: 'row'}]}>
                <TextInput
                  type="email"
                  value={this.state.email}
                  keyboardType="email-address"
                  placeholder="EMAIL"
                  placeholderTextColor="#8b8687"
                  underlineColorAndroid="transparent"
                  onChangeText={(text) => this.setState({email: text})}
                />
                <Fontisto
                  style={{marginHorizontal: 10, color: '#8b8687'}}
                  name="email"
                  size={25}
                />
              </View>
              <View style={[styles.txtInput, {flexDirection: 'row'}]}>
                <TextInput
                  type="password"
                  value={this.state.password}
                  placeholder="PASSWORD"
                  keyboardType="email-address"
                  placeholderTextColor="#8b8687"
                  secureTextEntry={true}
                  underlineColorAndroid="transparent"
                  onChangeText={(text) => this.setState({password: text})}
                />
                <TouchableOpacity>
                  <Entypo
                    name="eye"
                    size={35}
                    style={{marginHorizontal: 5, color: '#8b8687'}}
                  />
                </TouchableOpacity>
              </View>
              <TouchableOpacity onPress={this.validates}>
                <Animated.View style={styles.txtBtn}>
                  <Text style={{fontWeight: '700', color: '#0070C0'}}>
                    SIGN IN
                  </Text>
                </Animated.View>
              </TouchableOpacity>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginHorizontal: 20,
                  marginVertical: 5,
                }}>
                <View>
                  <CheckBox
                    value={this.state.check}
                    onChange={() => this.CheckBoxText()}
                  />
                </View>
                <View>
                  <Text style={{fontWeight: '700', color: '#8b8687'}}>
                    Remember me
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginHorizontal: 15,
                  marginVertical: 30,
                }}>
                <TouchableOpacity>
                  <Text style={{fontWeight: '700', color: '#0070C0'}}>
                    Create an Account
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text style={{fontWeight: '700', color: '#0070C0'}}>
                    Forget Password?
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </Animated.View>
        </View>
      </View>
    );
  }
}

export default Login;

const styles = StyleSheet.create({
  txtBtn: {
    height: 50,
    backgroundColor: '#fff',
    marginHorizontal: 30,
    marginVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    shadowOffset: {width: 2, height: 2},
    shadowColor: '#000',
    shadowOpacity: 0.2,
    elevation: 5,
  },
  txtInput: {
    height: 50,
    borderRadius: 30,
    borderWidth: 0.5,
    marginHorizontal: 20,
    paddingLeft: 10,
    marginVertical: 5,
    borderColor: 'rgba(0,0,0,0.2)',
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  btnClose: {
    height: 40,
    width: 40,
    backgroundColor: 'white',
    borderRadius: 20,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: -60,
    left: width / 2 - 20,
    shadowOffset: {width: 2, height: 2},
    shadowColor: '#000',
    shadowOpacity: 0.2,
    elevation: 5,
  },
});
