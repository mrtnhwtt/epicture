import React from 'react'
import {
    View,
    Text,
    Image,
    Dimensions
} from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { addToFavorites } from '../../API/apiRequests'
  

let windowWidth = Dimensions.get('window').width
  

export default class ImageCard extends React.Component {

    constructor (props) {
        super(props)
        this.state = {
            favorite: false
        }
        this.handleAddToFav = this.handleAddToFav.bind(this);
    }

    componentDidMount () {
        let imageId = null;
        let isFavorite = false;
        if (this.props.result.images) {
            imageId = this.props.result.images[0].id
        }
        this.props.userFavorites.map(function(el, i) {
            if (el.id === imageId) {
                isFavorite = true;
            }
        })
        if (isFavorite === true) {
            this.setState({ favorite: true })
        }
    }

    handleAddToFav() {
        if (this.state.favorite === false) {
            this.setState({ favorite: true });
            addToFavorites(this.props.result.images[0].id)
        }
        else {
            this.setState({ favorite: false });
            addToFavorites(this.props.result.images[0].id)
        }
    }   
  
    render () {
        let { favorite } = this.state;
        let favIcon;
        if (favorite === false) {
            favIcon = ( <Ionicons name="ios-star-outline" size={16} color="white" style={{ paddingTop: 5 }} onPress={() => this.handleAddToFav()} /> )
        }
        else {
            favIcon = ( <Ionicons name="ios-star" size={16} color="yellow" style={{ paddingTop: 5 }} onPress={() => this.handleAddToFav()} /> )
        }
        if (this.props.result.images) {
            if (this.props.result.images[0].link.match(/\.(jpg|png|gif)/g)) {
                return (
                    <View style={{ flex: 1, alignItems: "center", justifyContent: "center", marginBottom: 10 }}>
                        <View style={{ backgroundColor: "#1e3f83", borderRadius: 10, overflow: "hidden" }}>
                            <View style={{ padding: 10, width: "100%" }}>                                
                                <Text style={{ color: "#fff", paddingTop: 5 }}>
                                    { this.props.result.images[0].description }
                                </Text>                                
                            </View>                            
                            <View>
                                <Image
                                    source={{ uri: this.props.result.images[0].link }}
                                    style={{
                                        height: windowWidth - 10,
                                        width: windowWidth - 10
                                    }}
                                />
                            </View>                            
                            <View style={{ padding: 10, width: windowWidth - 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View style={{ paddingTop: 5, flexDirection: 'row' }}>
                                    <Ionicons name="md-eye" size={16} color="white" style={{ marginRight: 2 }} />
                                    <Text style={{ color: "#fff" }}>{ this.props.result.images[0].views }</Text>
                                    <Text style={{ color: "#fff", marginLeft: 5, fontStyle: 'italic' }}>{new Date(this.props.result.images[0].datetime * 1000).toLocaleString("en-US", {year: "numeric", month: "numeric", day: "numeric"})}</Text>                                    
                                </View>
                                {favIcon}                                
                            </View>
                        </View>
                    </View>                    
                )
            }
            else {
                return null;
            }
        }
        else {
            return null
        }
    }
}