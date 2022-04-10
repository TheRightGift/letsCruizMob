import React from 'react';
import { StyleSheet, View, StatusBar, ActivityIndicator, FlatList, Alert, TouchableOpacity} from "react-native";
import { WebView } from 'react-native-webview';
import { Button } from 'react-native-elements';
import { Card, Text, Input, Icon, Layout, Divider } from '@ui-kitten/components';
import { COLORS, SIZES } from '../../../constants';

class WebPage extends React.Component {

	/**
	 * Constructor.
	 */
	constructor(inProps) {

		super(inProps);
		this.state = {
            articles: [],
			categories: [],
			errMsg: '',
            alertVisible: false,
            spinnerVisible: false,
			modalVisible: false,
			url: ''
		};
		
	} /* End constructor. */

    goBack = () => {
        this.props.navigation.goBack();
    }

	spinner = () => {
        if (this.state.spinnerVisible) {
            return (
                <View style={styles.spinnerContainer}>
                    <ActivityIndicator size='large' color={COLORS.primary}/>
                </View>
            );
        } else {
            return null;
        }        
    }

    hideDialog = () => {
        this.setState({alertVisible: false });
    }
			
	componentDidMount() {
		StatusBar.setBarStyle('dark-content');
		StatusBar.setBackgroundColor(COLORS.secondary);
  	}; /* End componentDidMount(). */

	render() {        
		let webURL = this.props.route.params.url;
        
		return(
            <Layout style={styles.container}>
				<Layout style={{backgroundColor: COLORS.secondary, flexDirection: 'row', paddingHorizontal: SIZES.width * 0.02, paddingVertical: SIZES.height * 0.002, alignItems: 'center'}}>
					<Text style={{width: SIZES.width * 0.83}} numberOfLines={1}>
						{webURL}
					</Text>
					<Layout style={{width: SIZES.width * 0.15, height: SIZES.height * 0.05, backgroundColor: COLORS.secondary, justifyContent: 'center', alignItems: 'center'}}>
						<TouchableOpacity onPress={() => {this.goBack()}} style={{borderColor: COLORS.black, borderWidth: 1, backgroundColor: COLORS.secondary, width: SIZES.width * 0.13, height: SIZES.height * 0.043, justifyContent: 'center', alignItems: 'center'}}>
							<Icon
								style={{width: 20, height: 20}}
								fill={COLORS.black}
								name='close-outline'
							/>
						</TouchableOpacity>
						
					</Layout>					
				</Layout>
                <WebView 
                source={{ uri: webURL }} 
                startInLoadingState={true}
                onShouldStartLoadWithRequest={(event) => {
                    if (event.url !== webURL) {
                        Alert.alert('Prevent loading');
                        setTimeout(() => {
                            this.goBack();
                        }, 1000)
                        
                        return false
                    } 
                }}
                renderLoading={() => (
                    <ActivityIndicator
						color='black'
						size='large'
						style={styles.flexContainer}
                    />
                )}
				/>
            </Layout>
        )
	}
}

const styles = StyleSheet.create({	
    container: {
		flex: 1,		
	},
	flexContainer: {
		flex: 1,
		height: SIZES.height * 1,
		justifyContent: 'flex-start',
		alignItems: 'center',
		height: 80
	}
});


// Export components.
export default WebPage;