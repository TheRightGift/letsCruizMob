import React, { Component } from 'react';
import { StyleSheet, View, StatusBar, ActivityIndicator, FlatList, TouchableOpacity, TouchableHighlight, Image} from "react-native";
import Socket from '../../../api/socket';
import { getNumberedGistAPI} from '../../../api';
import { Text, Spinner , Icon, Layout } from '@ui-kitten/components';
import { connect } from 'react-redux';
import { Overlay } from 'react-native-elements';
import LottieView from 'lottie-react-native';
import { addArticleData, updateCategoryData, updateArticleData, addCategoryData, setArticleData, setCategoryData } from "../../../store/actions/articleAction";
import {setLiveTvData, addLiveTvData, updateLiveTvData} from '../../../store/actions/liveTvAction';
import { COLORS, SIZES } from '../../../constants';
import Articles from './Articles';
import NetworkUtils from "../NetworkUtils";
import FullScreenAndroid from 'react-native-fullscreen-chz';

class Gist extends Component {
	
	/**
	 * Constructor.
	 */
	constructor(inProps) {

		super(inProps);
		this.state = {
			loadingNewArticles: false,
			newArticleAlert: false,
			allArticles: [],
            articles: null,
			errMsg: '',
            alertVisible: false,
            spinnerVisible: false,
			modalVisible: false,
			visible: true,
			loadingMoreArticle: false,
			loadingMore: false,
			articlesToRender: 20,
			page: 0,
			category: 'All',
			networkStatus: false
		};

		this.newArticle = [];
		
	} /* End constructor. */

	toggleOverlay = () => {
		this.setState({visible: !this.state.visible});
	};

	spinner = () => {
        if (this.state.spinnerVisible) {
            return (
                // <View style={styles.spinnerContainer}>
                //     {/* <ActivityIndicator size='large' color={COLORS.primary}/> */}
				// 	<Text>here</Text>
                // </View>
				<Overlay isVisible={this.state.visible} onBackdropPress={this.toggleOverlay}>
					<LottieView source={require('../../../hiFastLoader.json')} autoPlay loop style={{height: SIZES.height * 0.15}}/>
				</Overlay>
            );
        } else {
            return null;
        }        
    }

    hideDialog = () => {
        this.setState({alertVisible: false });
    }

	getGistsByCategory = (categoryName) => {
		this.setState({spinnerVisible: true, category: categoryName, page: 0});
		let articles = this.props.articles;

		let catArticles = articles.filter((article) => {
			return article.category === categoryName;
		});
		
		this.setState({articles: catArticles});
		this.setState({spinnerVisible: false});
	}

	fetchMoreArticles = () => {
		this.setState(
			(prevState, nextProps) => ({
			  page: prevState.page + 1,
			  loadingMore: true
			}),
			() => {
			  this.getGists();
			}
		);
	};	

	geAllGists = () => {
		this.setState({category: 'All', page: 0});
		// this.getGists();
		let allArticles = this.props.articles;
	}

	socketToGetLatestArticles = () => {
		if(this.props.articles.length > 0){
			let datetimeLatestArticle = this.props.articles[0]['dateCreated'];

			// getLatestArticle (socket conn server endpoint)
			Socket.io.emit("dataUpdate", { date: datetimeLatestArticle });
		}
	}

	getGists = () => {
		let allArticles = this.props.articles;
		this.setState({articles: allArticles});

		if(this.state.networkStatus){
			// get articles posted after the last time usewr pulled articles
			if(this.props.articles.length > 0){
				// Make socket connection to DB to get posts after the latest post
				this.socketToGetLatestArticles();
			} else {
				// Make socket connection to DB to get latest 500 articles	
				let numOfArticles = 500;			
				getNumberedGistAPI(numOfArticles).then(
					({ data, status }) => {
						if(data.status == 200){    
							this.props.setArticleData(data.articles); 
						} 
					},
					(err) => {
						console.log(err);
					}
				)
			}
		} else {// else
			// inform user to fix internet connect and press get latese
			if(this.props.articles.length < 1){
				// display a component for user to reload after fixing internet connection
			}
		}	
		
	}

	catSliderView = () => {
		let cats = this.props.categories;
		if(cats.length > 0){
			return (
				
				<FlatList
				numColumns={1}
				data={cats}
				horizontal
				showsHorizontalScrollIndicator={false}
				renderItem={({ item }) => (
					item._id === 'All' ? <TouchableOpacity style={styles.chip} onPress={() => {this.geAllGists()}}><Text style={styles.chipText}>All</Text></TouchableOpacity> : <TouchableOpacity style={styles.chip} onPress={() => {this.getGistsByCategory(item.name)}}><Text style={styles.chipText}>{item.name}</Text></TouchableOpacity>
				)}
				keyExtractor={item => item._id}
				/>			
			);
		}
	}

	dataExists = (arr, id) => {
		return arr.some(function(el) {
		  	return el._id === id;
		}); 
	}

	loadNewArticle = () => {
		this.setState({loadingNewArticles: true});
		let nuArticle = this.newArticle.reverse();
		
		nuArticle.forEach((article, index) => {
			let articles = this.props.articles;
			let articleExists = this.dataExists(articles, article._id);
			if(!articleExists){
				this.props.addArticleData(article);
			}	

			if(index === nuArticle.length - 1){
				let articles = this.props.articles;
				this.setState({articles: articles, newArticleAlert: false, loadingNewArticles: false});
				this.newArticle = [];
			}
		});		
	}

	newArticleNotifier(){
		let nuArticle = this.state.newArticleAlert;
		
		if(nuArticle){
			if(this.state.loadingNewArticles){
				return(
					<View style={{backgroundColor: COLORS.black, flexDirection: 'row', justifyContent: 'center', paddingVertical: SIZES.height * 0.01}}>
						<Spinner size='tiny' status='warning'/>
					</View>
				)
			} else {
				return(
					<TouchableHighlight style={{backgroundColor: 'blue'}} onPress={() =>{this.loadNewArticle()}}>
						<View style={{flexDirection: 'row', justifyContent: 'center'}}>
							<Icon
								style={{width: 13, height: 13, marginRight: 5, paddingVertical: SIZES.height * 0.02}}
								fill={COLORS.white}
								name='refresh-outline'
							/>
							<Text style={{fontSize: 13, color: COLORS.white, marginTop: 6}}>Click to load new article</Text>
						</View>
					</TouchableHighlight>
				)
			}
			
		}		
	}

	checkNet = async () => {
		let oldNetworkStatus = this.state.networkStatus;
		let res = await NetworkUtils.isNetworkAvailable();
		if(res){
			if(oldNetworkStatus === false){
				this.socketToGetLatestArticles();
			}
			this.setState({networkStatus: true});
		} else {
			this.setState({networkStatus: false})
		}
	}

	socketOperation = () => {
		// ARTICLES
		Socket.io.on("newArticle", (data) => {	
			console.log('NuArticles');	
			console.log(data.article);	
            let article = data.article;
			
			let newArticle = this.newArticle;
			if(newArticle.length > 0){
				newArticle.unshift(article);
			} else {
				newArticle.push(article);
			}
		
			this.setState({newArticleAlert: true, newArticle: newArticle});
        });	

		Socket.io.on("updatedArticle", (data) => {
			console.log('UpdatedArticles');		
			let article = data.article;
			
			this.props.updateArticleData(article);
        });	


		// CATEGORY
		Socket.io.on("newCategory", (data) => {			
            let cat = data.cat;
			
			this.props.addCategoryData(cat);
        });	

		Socket.io.on("updatedCategory", (data) => {
			let cat = data.cat;
			
			this.props.updateCategoryData(cat);
        });	

		Socket.io.on('appSetup', ({articles, cat, tvs}) => {
			this.props.setArticleData(articles); 

			let allArticles = this.props.articles;
			this.setState({articles: allArticles});

			let newObj = {
				_id: 'All'
			}
			cat.unshift(newObj);
			this.props.setCategoryData(cat);

			this.props.setLiveTvData(tvs);

			this.checkNet();
		});

		Socket.io.on('appDataUpdate', ({articles, cat, tvs}) => {
			// ARticles
			articles.forEach((article, index) => {
				let articles = this.props.articles;
				let articleExists = this.dataExists(articles, article._id);
				if(!articleExists){
					this.props.addArticleData(article);
				}	
			});	

			// Categories
			cat.forEach((ct, index) => {
				let categories = this.props.categories;
				let catExists = this.dataExists(categories, ct._id);
				if(!catExists){
					this.props.addCategoryData(ct);
				}	
			});	

			// TVs
			tvs.forEach((tv, index) => {
				let liveTvs = this.props.liveTvs;
				let tvExists = this.dataExists(liveTvs, tv._id);
				if(!tvExists){
					this.props.addLiveTvData(tv);
				} else {
					// update
					this.props.updateLiveTvData(tv);
				}
			});	

			this.checkNet();
		});
	}


	
	componentDidMount() {
		FullScreenAndroid.disable();
		StatusBar.setBarStyle('dark-content');
		StatusBar.setBackgroundColor(COLORS.primary);

		this.socketOperation();


		setInterval(() => {
			this.checkNet();
		}, 4000);

		let allArticles = this.props.articles;
		this.setState({articles: allArticles});
			
  	}; /* End componentDidMount(). */

	render() {        
		let articles = this.props.articles;
		if(articles !== null && articles.length > 0) {
            return (
				<Layout style={styles.container}>
					
					<Layout style={styles.header}>
						{this.catSliderView()}
					</Layout>
					{
						this.state.loadingMoreArticle && <Text>Loading...</Text>
					}
					{this.newArticleNotifier()}

					{
						articles.length > 0 &&
						<Layout style={styles.padGist}>
							<Articles articles={articles} navigation={this.props.navigation}/>
						</Layout>
					}
					{
						articles.length < 1 && this.spinner()
					}
				</Layout>
                
            );
        } else {
            return(
                <Layout style={styles.container}>
					<Layout style={[ styles.noContentRow, {backgroundColor: 'rgba(255, 255, 255, 0)'}]}>
						<Image source={require('../../../img/noGist.png')} style={styles.image}/>
					</Layout>
					<Layout style={[styles.noContentRow, {backgroundColor: 'rgba(255, 255, 255, 0)'}]}>
						<Text style={styles.title}>
							No gist at the moment.
						</Text>
					</Layout>
				</Layout>
            );
        }  
	}
}

const styles = StyleSheet.create({	
	appThemeText: {
        color: COLORS.primary
    },
    bigIconStyle: {
        fontSize:27,
        marginRight: SIZES.width * 0.07
    },
    boldText: {
        fontWeight: 'bold',
    },
	modalMainView: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end',
        backgroundColor: 'rgba(240,248,255, 0.8)'
    },
    modalShapeView: {
        backgroundColor: "#fff",
        width: SIZES.width,
        height: SIZES.height * 0.9,
        borderTopLeftRadius: SIZES.width * 0.1,
        borderTopRightRadius: SIZES.width * 0.1,
        paddingHorizontal: SIZES.width * 0.035,
    },
	chip: {
		paddingHorizontal: SIZES.width * 0.04, 
		paddingVertical: SIZES.height * 0.01,
		borderWidth: 1,
		borderColor: COLORS.white,
		borderRadius: SIZES.width * 0.06,
		marginRight: SIZES.width * 0.02,		
	},
	chipText: {
		color: COLORS.white,
		fontSize: 12,
	},
	header: {
		backgroundColor: COLORS.primary,
		paddingVertical: SIZES.height * 0.025,
		paddingHorizontal: SIZES.width * 0.025
	},	
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
	red : {
		backgroundColor: 'red'
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
	padGist: {
		paddingLeft: SIZES.width * 0.025,
		paddingRight: SIZES.width * 0.025,
	},
	container: {
		flex: 1,
		top: SIZES.height * 0.046,
		flexDirection: 'column',
		alignContent: 'center',
		justifyContent: 'center', 
		// backgroundColor: 'red'		
	},
	title: {
        // fontSize: 40,
        // fontWeight: '700',
		color: COLORS.blu
    },
	image: {
		width: SIZES.width * 0.7,
		resizeMode: 'contain'
	},
	gistRow: {
		flexDirection: 'row',
		paddingVertical: SIZES.height * 0.02,
		borderBottomColor: COLORS.liteBlu,
		borderBottomWidth: 1,
	},
	noContentRow: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
	row: {
		flexDirection: 'row'
	},
    dialog: {
        padding: 0,
        flexDirection: 'row'
    },  
    alertInnerText: {
        width: SIZES.width * 0.7,
        lineHeight: 20,
        color: COLORS.white
    },  
    red : {
        backgroundColor: 'red'
    },
    spinnerContainer: {
        height: SIZES.height,
        width: SIZES.width,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    icon: {
        width: 20,
        height: 20,
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
export default connect(mapStateToProps, {setArticleData, setCategoryData, addCategoryData, addArticleData, setLiveTvData, updateLiveTvData, addLiveTvData})(Gist);