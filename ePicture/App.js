import * as React from 'react';
import { Button, Image, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import * as FileSystem from 'expo-file-system';


export default class ImagePickerExample extends React.Component {
  state = {
    image: null,
    imageBase64: null
  };

  render() {
    let { image } = this.state;
    const up_button = <Button title="Upload" onPress={uploadToImgur(imageBase64)} />
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button title="Pick an image from camera roll" onPress={this._pickImage} />
        {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
        {this.state.image ? up_button : <View></View>}
      </View>
    );
  }

  componentDidMount() {
    this.getPermissionAsync();
  }

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  };

  _pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: false,
        aspect: [4, 3],
        quality: 1,
        noData: false
      });
      if (!result.cancelled) {
        this.setState({ image: result.uri });
      }

      console.log(result);
      const base64 = await FileSystem.readAsStringAsync(result.uri, { encoding: 'base64' });
      this.setState({imageBase64: base64})
      //console.log(base64)
      //uploadToImgur()
    } catch (E) {
      console.log(E);
    }
  };
}

const uploadToImgur = (base64) => {
 console.log('hej hej')
  fetch('https://api.imgur.com/3/upload', {
    method: 'POST',
    headers: {
      'Authorization': 'Client-ID 1ea9d8b68e5bf9f'
    },
    body: JSON.stringify({
      'image': base64
    })
  })
  .then(response => console.log(response))
  .catch(error => {
    console.error(error);
  });
}