import React from 'react';
import { StyleSheet, TouchableOpacity} from "react-native";
import { useNavigation } from '@react-navigation/native';
import { Text, Button, Avatar, ListItem } from '@ui-kitten/components';
import { COLORS, SIZES } from '../../../constants';
import { WS_BASE_URL } from '../../../config';
import moment from 'moment';

const TvListItem = (props) => {
    let tv = props.tv;
	const navigation = useNavigation();

    const ItemImage = () => (
        <Avatar source={{uri: `${WS_BASE_URL}/media/img/${tv.thumbImg}`}} shape='square'/>
    );

	const renderItemAccessory = (props) => (
		<Button size='tiny' onPress={() => navigation.navigate("VideoPlayer")}>Watch</Button>
	);
	
	if(props.src === 'OnGoing'){
		return(
			<ListItem
			title={`${tv.title}`}
			description={`${moment(tv.date).format('ddd Do MMM')} - ${moment(tv.date).format('HH:mm')}`}
			accessoryLeft={ItemImage}
			accessoryRight={renderItemAccessory}
			/>
		) 
	} else {
		return(
			<ListItem
			title={`${tv.title}`}
			description={`${moment(tv.date).format('ddd Do MMM')} - ${moment(tv.date).format('HH:mm')}`}
			accessoryLeft={ItemImage}
			/>
		) 
	}
    
    
}
const styles = StyleSheet.create({	
	category: {
		backgroundColor: COLORS.yelo,
		width: SIZES.width * 0.14,
		height: SIZES.height * 0.07,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: SIZES.width * 0.5
	},
	gistDetail: {
		marginLeft: SIZES.width * 0.015,
		width: SIZES.width * 0.77,
		flexDirection: 'column',
		justifyContent: 'center'
	},
	titleText: {
		fontSize: 15,
		fontWeight: '900'
	},
	catText: {
		color: COLORS.black
	},
	grayText: {
		color: COLORS.blu
	},
	smallText: {
		fontSize: 10
	},
	gistIcon: {
		width: 15,
		height: 15,
		color: COLORS.blu
	},
	blu: {
		backgroundColor: 'blue'
	},
	halfRowWidth: {
		width: SIZES.width * 0.39,
	},
	rightAlign: {
		textAlign: 'right'
	},
	centerAlign: {
		textAlign: 'center'
	},
	container: {
		flex: 1,		
	},
	gistRow: {
		flexDirection: 'row',
		paddingVertical: SIZES.height * 0.02,
		borderBottomColor: COLORS.liteBlu,
		borderBottomWidth: 1,
	},
	row: {
		flexDirection: 'row'
	},
});
export default TvListItem;