/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, FlatList, RefreshControl, ActivityIndicator} from 'react-native';

type Props = {};
const CITY_NAMES = ['北京', '上海', '广州', '深圳', '杭州', '苏州','成都','武汉'];
export default class FlatListDemo extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            dataArray: CITY_NAMES,
        }
    }

    _renderItem(data) {
        return (
            <View style={styles.item}>
                <Text style={styles.text}>{data.item}</Text>
            </View>
        )
    }

    //refreshing为true时，“下拉刷新”的动作触发这个方法；否则则是“上拉加载”
    loadData(refreshing) {
        if (refreshing) {
            this.setState({
                isLoading: true,//显示正在加载的符号
            });
        }

        //仿照网络请求一个新的数据源
        setTimeout(() => {
            let dataArray = [];
            if (refreshing) {//“下拉刷新”
                dataArray = this.state.dataArray.reverse();
            } else {//“上拉加载”
                dataArray = this.state.dataArray.concat(CITY_NAMES);
            }

            this.setState({
                dataArray: dataArray,//修改数据源
                isLoading: false,//隐藏正在加载的符号
            })
        }, 5000)
    }

    genIndicator = () => {//“上拉加载”的动作触发这个方法
        return (
            <View style={styles.indicatorContainer}>
                <ActivityIndicator
                    style={styles.indicator}
                    size={'large'}
                    color={'red'}
                    animating={true}
                />
                <Text>正在加载更多</Text>
            </View>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.state.dataArray}
                    renderItem={(data) => this._renderItem(data)}
                    // refreshing={this.state.isLoading}
                    // onRefresh={()=>{
                    //     this.loadData()
                    // }}
                    refreshControl={
                        <RefreshControl
                            title={'Loading'}
                            colors={['blue']}//android特有
                            tintColor={'orange'}//ios特有
                            titleColor={'red'}//ios特有
                            refreshing={this.state.isLoading}
                            onRefresh={() => {
                                this.loadData(true)
                            }}
                        />
                    }
                    ListFooterComponent={this.genIndicator}
                    onEndReached={() => {
                        this.loadData()
                    }}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    item: {
        backgroundColor: '#169',
        height: 200,
        marginRight: 15,
        marginLeft: 15,
        marginBottom: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        color: 'white',
        fontSize: 20
    },
    indicatorContainer: {
        alignItems: 'center'
    },
    indicator: {
        color: 'red',//这个设置不起作用，在组件ActivityIndicator中直接设置的color起作用
        margin: 10
    }
});
