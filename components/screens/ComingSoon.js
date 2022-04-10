import React, { Component } from 'react';
import { StyleSheet, Image, View, StatusBar} from "react-native";
import { Button, Layout, Text, Input } from '@ui-kitten/components';
import Socket from "../../api/socket";
import LinearGradient from 'react-native-linear-gradient';
import { COLORS, SIZES } from '../../constants/index';

class ComingSoon extends Component {
    /**
	 * Constructor.
	 */
	constructor(inProps) {
		super(inProps);
		
		this.state = {
			// coinDataRecieved: false
		}		
	} /* End constructor. */

    componentDidMount() {
		
		StatusBar.setBarStyle('light-content');
		StatusBar.setBackgroundColor(COLORS.primary);
	}

    render () {
        return (
            <LinearGradient colors={[COLORS.primary, COLORS.white]} style={styles.container}>
                <Layout style={[ styles.row, styles.imageRow, {backgroundColor: 'rgba(255, 255, 255, 0)'}]}>
                    <Image source={require('../../img/comingSoon.png')} style={styles.image} />
                </Layout>
                <Layout style={[styles.row, styles.titleRow, {backgroundColor: 'rgba(255, 255, 255, 0)'}]}>
                    <Text style={styles.title}>
                        Coming Soon
                    </Text>
                </Layout>
                <Layout style={[styles.row, styles.descRow, {backgroundColor: 'rgba(255, 255, 255, 0)'}]}>
                    <Text style={styles.desc}>
                        This Exciting feature is not available yet. Please watch this space.
                    </Text>
                </Layout>
            </LinearGradient>
        )
    }
}

const styles = StyleSheet.create({	
	container: {
        flex: 1,
        paddingHorizontal: SIZES.width * 0.15,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    imageRow: {        
        marginTop: SIZES.height * 0.3
    },
    titleRow: {
        marginTop: SIZES.height * 0.025,
        marginBottom: SIZES.height * 0.035,
    },
    title: {
        fontSize: 12,
        fontWeight: '700'
    },
    descRow: {

    },
    desc: {
        fontSize: 24,
        fontWeight: '700',
        textAlign: 'center'
    }
});


// Export components.
export default ComingSoon;