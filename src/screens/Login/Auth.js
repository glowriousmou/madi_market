import React, {Component} from 'react';
import Auth0 from 'react-native-auth0';
import {Button, View, TextInput, Modal, Text, Image} from 'react-native';
class Auth extends Component {
  constructor() {
    super();
    this.state = {
      phone: '',
      code: '',
      codeRequestSent: false,
      LogginIn: false,
      isLoggedin: false,
      accessToken: '',
      idToken: '',
    };
    this.loginUser = this.loginUser.bind(this);
    this.getLoginCode = this.getLoginCode.bind(this);
  }
  componentDidMount() {
    this.auth0 = new Auth0({
      domain: 'dev-8yi292aj.us.auth0.com',
      clientId: 'BtTvyurn2UmLa2UZhhI4NohZlOgFF7u4',
    });
  }
  getLoginCode() {
    this.setState({LogginIn: true});
    this.auth0.auth
      .passwordlessWithSMS({
        phoneNumber: this.state.phone,
      })
      .then(() => {
        this.setState({codeRequestSent: true});
      })
      .catch((error)=>{
          console.log("get login code",error)
      });
  }
  loginUser() {
    this.auth0.auth
      .loginWithSMS({
        phoneNumber: this.state.phone,
        code: this.state.code,
      })
      .then(response => {
        console.log(response);
        this.setState({
          accessToken: response.accessToken,
          idToken: response.idToken,
          isLoggedin: true,
        });
      })
      .catch(console.error);
  }
  render(){
    const {
        codeRequestSent, LogginIn, code, isLoggedin, accessToken, idToken,
      } = this.state;
      return (
        <View>
          {!codeRequestSent ? (
            <>
              <TextInput
                placeholder="Enter Phone"
                onChangeText={text => this.setState({phone: text})}
              />
              <Button
                title={LogginIn ? 'Processing...' : 'Get Code'}
                onPress={this.getLoginCode}
              />
            </>
          ) : (
            <>
              <TextInput
                placeholder="Enter Code"
                value={code}
                onChangeText={text => this.setState({code: text})}
              />
              <Button title="Login" onPress={this.loginUser} />
              <View>
                <Modal transparent={true} visible={isLoggedin}>
                  <View>
                    <View>
                      <Text> Login Successful 👍🏼🎉</Text>
                      <Text> Here are your details:</Text>
                      <Text> Access Token: {' ' + accessToken}</Text>
                      <Text>
                        Id Token:
                        {' ' + idToken.length > 25
                          ? `${idToken.substring(0, 25)}...`
                          : idToken}
                      </Text>
                      <Button title="Logout" onPress={this.logout} />
                    </View>
                  </View>
                </Modal>
              </View>
            </>
          )}
        </View>
    )
  }
}
export default Auth;