import { Layout, Text } from '@ui-kitten/components';
import React, {useEffect, useState} from 'react';
import { StyleSheet, FlatList, Image, TouchableOpacity} from "react-native";
import {useSelector, useDispatch} from 'react-redux';
import { COLORS, SIZES } from '../../../constants';
import TvListItem from './TvListItem';

const OngoingTV = () => {
    const [ongoing, setOngoing] = React.useState([]);
    const liveTvs = useSelector(state => state.liveTvReducer.liveTvs);
    const init = () => {
        let onGoingTvs = liveTvs.filter(function(e) {
            return e.onGoing === 'Y';
        });
        setOngoing(onGoingTvs);
    }
    useEffect(() => {
        init();
    }, []);
    
    if(liveTvs.length > 0){
        return(
            <FlatList
            removeClippedSubviews 
            maxToRenderPerBatch={20} 
            updateCellsBatchingPeriod={80}
            data={ongoing}
            initialNumToRender={20}
            renderItem={({ item }) => (
                <TvListItem tv={item} src={'OnGoing'}/>                          
            )}
            keyExtractor={item => item._id}
            />
        )
    } else {
        return(
            <Layout style={styles.container}>
				<Layout style={[ styles.row, {backgroundColor: 'rgba(255, 255, 255, 0)'}]}>
					<Image source={require('../../../img/noData.png')} style={styles.image}/>
				</Layout>
				<Layout style={[styles.row, {backgroundColor: 'rgba(255, 255, 255, 0)'}]}>
					<Text style={styles.title}>
                        No live program at the moment.
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
        // fontSize: 40,
        // fontWeight: '700',
		color: COLORS.blu
    },
	image: {
		width: SIZES.width * 0.7,
		resizeMode: 'contain'
	}
});

export default OngoingTV;