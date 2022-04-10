import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, Dimensions, ScrollView} from "react-native";
import {
	Tabs,
	TabScreen,
	useTabIndex,
	useTabNavigation,
  } from 'react-native-paper-tabs';
import { COLORS, SIZES } from '../../../constants/index';
import OngoingTV from './OngoingTV';
import ScheduledTV from './ScheduledTV';

function LiveTV() {
	
	return(
		<Tabs
        // defaultIndex={0} // default = 0
        // uppercase={false} // true/false | default=true | labels are uppercase
        // showTextLabel={false} // true/false | default=false (KEEP PROVIDING LABEL WE USE IT AS KEY INTERNALLY + SCREEN READERS)
        // iconPosition // leading, top | default=leading
        style={{ backgroundColor: COLORS.primary }} // works the same as AppBar in react-native-paper
        // dark={false} // works the same as AppBar in react-native-paper
        // theme={} // works the same as AppBar in react-native-paper
        // mode="scrollable" // fixed, scrollable | default=fixed
        // onChangeIndex={(newIndex) => {}} // react on index change
        // showLeadingSpace={true} //  (default=true) show leading space in scrollable tabs inside the header
        // disableSwipe={false} // (default=false) disable swipe to left/right gestures
      >
        <TabScreen label="Ongoing"  icon="television-play">
           <OngoingTV />
        </TabScreen>
        <TabScreen label="Scheduled" icon="television-guide">
          <ScheduledTV />
        </TabScreen>
      </Tabs>
	)
}

const styles = StyleSheet.create({	
    
});


// Export components.
export default LiveTV;