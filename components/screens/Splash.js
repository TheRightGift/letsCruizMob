import React, { Component } from 'react';
import { StyleSheet, Image, StatusBar} from "react-native";
import { Layout, Text } from '@ui-kitten/components';
import Socket from "../../api/socket";
import { connect } from 'react-redux';
import { COLORS, SIZES } from '../../constants/index';
import SplashScreen from 'react-native-splash-screen';
import { getGistAPI, getGistCategoryAPI, getLiveTvAPI } from '../../api';


class Splash extends Component {
    /**
	 * Constructor.
	 */
	constructor(inProps) {
		super(inProps);
		
		this.state = {}		
	} /* End constructor. */

	// dataExists = (arr, id) => {
	// 	return arr.some(function(el) {
	// 	  	return el._id === id;
	// 	}); 
	// }

    componentDidMount() {		
		SplashScreen.hide();
		StatusBar.setBarStyle('dark-content');
		StatusBar.setBackgroundColor(COLORS.primary);
		Socket.startup();	
		
		
		if(this.props.articles.length < 1){
			Socket.setUp();
		} else {
			let datetimeLatestArticle = this.props.articles[0]['dateCreated'];
			Socket.checkDataUpdate(datetimeLatestArticle);
		}		

		this.props.navigation.navigate('app');

		Socket.io.on("updatedTV", (data) => {
			// TODO: update store
			console.log(data);
		})
	}

    render () {
        return (
			<Layout style={styles.container}>
				<Layout style={[ styles.row, {backgroundColor: 'rgba(255, 255, 255, 0)'}]}>
					<Image source={require('../../img/splashImg.jpg')} style={styles.image}/>
				</Layout>
				<Layout style={[styles.row, {backgroundColor: 'rgba(255, 255, 255, 0)'}]}>
					<Text style={styles.title}>
						Let's Cruiz
					</Text>
				</Layout>
				<Layout style={[styles.row, styles.descRow, {backgroundColor: 'rgba(255, 255, 255, 0)'}]}>
                    <Text style={styles.desc}>
                        NEWS . LIVE FOOTBALL . CHAT
                    </Text>
                </Layout>
			</Layout>
            
        )
    }
}

const styles = StyleSheet.create({	
	container: {
        flex: 1,
		flexDirection: 'column',
		alignContent: 'center',
		justifyContent: 'center'
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    title: {
        fontSize: 40,
        fontWeight: '700',
		color: COLORS.primary
    },
	image: {
		width: SIZES.width * 0.7,
		resizeMode: 'contain'
	}
});

/**
 * Function to map state to Component props.
 */
 const mapStateToProps = (inState) => {
	return {
		articles: inState.articleReducer.articles,
		categories: inState.articleReducer.categories,
		liveTvs : inState.liveTvReducer.liveTvs
	};
};


// Export components.
export default connect(mapStateToProps, {})(Splash);