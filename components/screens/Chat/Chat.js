import React from 'react';
import { StyleSheet, Text, View, Dimensions, StatusBar} from "react-native";
// import {appColorSecondary, appColorPrimary, appColorTertiary} from '../../../app.json';
import { Container, Header, Left, Body, Right, Button, Icon, Content, Tab, Tabs, ScrollableTab } from 'native-base';
import ComingSoon from '../ComingSoon';
import { COLORS, SIZES } from '../../../constants/index';

class Chat extends React.Component {

	/**
	 * Constructor.
	 */
	constructor(inProps) {

		super(inProps);
		this.state = {
            
		};
		
	} /* End constructor. */

		
	componentDidMount() {
		StatusBar.setBarStyle('dark-content');
		StatusBar.setBackgroundColor(COLORS.primary);
  	}; /* End componentDidMount(). */

	render() {        
        return(
            <ComingSoon/>
        )
	}
}

const styles = StyleSheet.create({	
    
});


// Export components.
export default Chat;