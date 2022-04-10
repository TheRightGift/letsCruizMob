import React, { useState, useEffect } from "react";
import { StyleSheet, BackHandler, StatusBar} from "react-native";
import { Layout, Button } from '@ui-kitten/components';
import {  NodePlayerView } from 'react-native-nodemediaclient';
import { COLORS, SIZES } from '../../../constants';
import useDeviceOrientation from '@rnhooks/device-orientation';
import FullScreenAndroid from 'react-native-fullscreen-chz';


const VideoPlayer = (props) => {
    FullScreenAndroid.enable();
    
    const deviceOrientation = useDeviceOrientation();
    
    const [playerRef, setPlayerRef] = useState(null);

    useEffect(() => {
        StatusBar.setHidden
        
        const backAction = () => {
          stopVid();
        };
    
        const backHandler = BackHandler.addEventListener(
          "hardwareBackPress",
          backAction
        );
    
        return () => backHandler.remove();
    }, []);

    

    // playVid = () => {
    //     playerRef.start()
    // }

    stopVid = () => {
        playerRef.stop()
    }

    if(deviceOrientation === 'portrait'){
        return(
            <Layout style={styles.container}>
                <NodePlayerView 
                style={styles.playerVerical}
                ref={(vp) => { 
                    setPlayerRef(vp) 
                }}
                // inputUrl={"rtmp://192.168.0.180/live/LETSKRUZ_LIVE_STREAM"}
                inputUrl={"rtmp://ec2-34-207-70-221.compute-1.amazonaws.com/live/LETSKRUZ_LIVE_STREAM"}
                scaleMode={'ScaleAspectFill'}
                bufferTime={300}
                maxBufferTime={1000}
                autoplay={true}
                />
            </Layout>
        )
    } else if(deviceOrientation === 'landscape'){
        return(
            <Layout style={styles.container}>
                <NodePlayerView 
                style={styles.playerHorizontal}
                ref={(vp) => { 
                    setPlayerRef(vp) 
                }}
                inputUrl={"rtmp://192.168.43.2/live/LETSKRUZ_LIVE_STREAM"}
                scaleMode={'ScaleAspectFit'}
                bufferTime={300}
                maxBufferTime={1000}
                autoplay={true}
                />
            </Layout>
        )
    }
    
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
		flexDirection: 'column',
		alignContent: 'center',
		justifyContent: 'center',
        backgroundColor: COLORS.black,
        padding: 0
    },
    playerVerical: {
        minHeight: 100
    },
    playerHorizontal: {
        height: SIZES.width,
        width: SIZES.height
    }
});
export default VideoPlayer;