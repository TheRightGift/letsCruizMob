import React, { PureComponent } from 'react';
import { StyleSheet, View, FlatList, TouchableOpacity} from "react-native";
import { Text, Spinner , Icon, Layout } from '@ui-kitten/components';
import { COLORS, SIZES } from '../../../constants';
import Moment from 'moment';

class Articles extends PureComponent {
    
    showWebPage = (url) => {
		this.props.navigation.navigate('WebPage', {url: url});
	}

    render() {
        let articles = this.props.articles;
		// articles = articles.slice(0, 20);
        if(articles.length > 0) {
			return(
				<FlatList
					removeClippedSubviews 
					maxToRenderPerBatch={20} 
					updateCellsBatchingPeriod={80}
					style={styles.noPadding}
					data={articles}
					initialNumToRender={20}
					renderItem={({ item }) => (
						<TouchableOpacity style={styles.gistRow} onPress={() => {this.showWebPage(item.url)}}>
							<Layout style={[styles.category]}>
								<Text style={[styles.smallText, styles.catText]}>{item.category}</Text>
							</Layout>
							<Layout style={styles.gistDetail}>
								<Text style={styles.titleText}>{item.title}</Text>
								<Layout style={styles.row}>
									<Layout style={[styles.row, styles.halfRowWidth]}>
										<Icon
											style={styles.gistIcon}
											fill={COLORS.blu}
											name='eye-outline'
										/>
									</Layout>
									<Layout>
										<Text style={[styles.rightAlign, styles.grayText, styles.smallText, styles.halfRowWidth]}>{Moment(item.dateCreated).fromNow()}</Text>
									</Layout>
								</Layout>
							</Layout>							
						</TouchableOpacity>
						
					)}
					keyExtractor={item => item._id}
					/>
			)
		} else {
			<Layout style={{justifyContent: 'center', alignItems: 'center'}}>
				<Text>No article</Text>
			</Layout> 
		}
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
export default Articles;