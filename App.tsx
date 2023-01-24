import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import LinearGradient from 'react-native-linear-gradient';

const Colors = {
  black: '#000',
  white: '#FFF',
  grey: '#a9a9a9',
  light: '#f1f1f1',
  brandPrimary: '#118AFB',
  alertGreen: '#02CF01',
  alertYellow: '#ffd379',
  alertRed: '#ff3b45',
};

function App(): JSX.Element {
  const [password, setPassword] = React.useState('');
  const [strength, setStrength] = React.useState(0);

  const strengthCalculator = (currentPass: string) => {
    const length = currentPass.length;

    if (length < 4) {
      // Set strength isWeak.
      setStrength(0);
    } else if (length >= 4 && length < 7) {
      // Set strength isMedium.
      setStrength(1);
    } else if (length >= 8) {
      // Set strength isStrong.
      setStrength(2);
    }
  };

  const onChangeText = (text: string) => {
    setPassword(text);
    strengthCalculator(text);
  };

  const renderStrength = () => {
    switch (strength) {
      case 0:
        return (
          <View>
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              colors={[Colors.brandPrimary, Colors.alertRed]}
              style={styles.linearGradient}>
              <View style={[styles.indicatorBar]} />
            </LinearGradient>
            <Text style={styles.passWeak}>Weak password</Text>
          </View>
        );
      case 1:
        return (
          <View>
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              colors={[Colors.brandPrimary, Colors.alertYellow]}
              style={styles.linearGradient}>
              <View style={[styles.indicatorBar]} />
            </LinearGradient>
            <Text style={styles.passMedium}>Medium password</Text>
          </View>
        );
      case 2:
        return (
          <View>
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              colors={[Colors.brandPrimary, Colors.alertGreen]}
              style={styles.linearGradient}>
              <View style={[styles.indicatorBar]} />
            </LinearGradient>
            <Text style={styles.passStrong}>Strong password</Text>
          </View>
        );
      default:
        return (
          <View>
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              colors={[Colors.brandPrimary, Colors.alertRed]}
              style={styles.linearGradient}>
              <View style={[styles.indicatorBar]} />
            </LinearGradient>
            <Text style={styles.passWeak}>Weak password</Text>
          </View>
        );
    }
  };

  const renderIcon = () => {
    switch (strength) {
      case 0:
        return <Icon name="alert-circle" size={22} color={Colors.alertRed} />;
      case 1:
        return (
          <Icon name="alert-circle" size={22} color={Colors.alertYellow} />
        );
      case 2:
        return (
          <Icon name="checkmark-circle" size={22} color={Colors.alertGreen} />
        );
      default:
        return <Icon name="alert-circle" size={22} color={Colors.alertRed} />;
    }
  };

  return (
    <SafeAreaView>
      <View style={styles.logoWrapper}>
        <Image style={styles.logo} source={require('./assets/logo.png')} />
      </View>
      <View style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.container}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <>
              <View style={styles.wrapper}>
                <Text style={styles.copy}>New password</Text>
                <TextInput
                  style={styles.input}
                  secureTextEntry={true}
                  onChangeText={onChangeText}
                  placeholder="Type here..."
                  value={password}
                />
                {password && (
                  <View style={styles.iconWrapper}>{renderIcon()}</View>
                )}
              </View>
              {password && (
                <View style={styles.wrapper}>{renderStrength()}</View>
              )}
            </>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  copy: {
    fontSize: 16,
    color: Colors.grey,
  },
  logoWrapper: {
    top: 40,
    position: 'absolute',
    width: '100%',
  },
  logo: {
    width: '100%',
    height: 70,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    height: '100%',
    width: '100%',
  },
  input: {
    height: 40,
    marginVertical: 10,
    borderWidth: 1,
    padding: 10,
    width: '100%',
    borderColor: Colors.light,
  },
  wrapper: {
    width: '80%',
    marginHorizontal: 'auto',
  },
  indicatorBar: {
    height: 5,
    width: '100%',
    borderRadius: 5,
  },
  linearGradient: {
    borderRadius: 5,
    marginBottom: 8,
  },
  iconWrapper: {
    height: 40,
    position: 'absolute',
    right: 0,
    top: 26,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 5,
  },
  passWeak: {
    color: Colors.alertRed,
  },
  passMedium: {
    color: Colors.alertYellow,
  },
  passStrong: {
    color: Colors.alertGreen,
  },
});

export default App;
