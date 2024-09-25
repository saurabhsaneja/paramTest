import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, ActivityIndicator, StyleSheet, useWindowDimensions } from 'react-native';
import * as Service from '../global/Service'
import { getFont } from '../helper';

const Pagination = () => {
  const { width, height } = useWindowDimensions()
  // ?_start=10&_limit=10
  const [data, setData] = useState([]);
  const [start, setStart] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isListEnd, setIsListEnd] = useState(false);

  useEffect(() => {
    loadMoreData();
  }, [start]);

  const loadMoreData = async () => {
    if (!loading && !isListEnd) {
      setLoading(true);
      // Simulate API call
      const newData = await fetchDataFromApi(start);
      console.log('newData', newData);
      if (newData.length > 0) {
        setData([...data, ...newData]);
      } else {
        setIsListEnd(true);
      }
      setLoading(false);
    }
  };

  const fetchDataFromApi = async () => {
    console.log('fetchDataFromApi');
    try {
      const response = await Service.getApi(Service.TODOS + `?_start=${start}&_limit=10`)
      // console.log('response', JSON.stringify(response));
      if (response?.status == 200) {
        return response?.data
      } else {
        return []
      }
    } catch (error) {
      return []
    }
    // // Mock data fetching logic
    // const newItems = Array.from({ length: 10 }, (_, index) => ({
    //   id: `id-${page}-${index}`,
    //   title: `Item ${page}-${index}`,
    // }));
    // return newItems;
  };

  const handleLoadMore = () => {
    setStart(start + 10);
  };

  const renderFooter = () => {
    return loading ? (
      <View style={{ padding: 10 }}>
        <ActivityIndicator size="large" />
      </View>
    ) : null;
  };
  const renderTodo = (item) => {
    return (
      <View style={[styles.todoContainer, { width: width * 0.9 }]} >
        <View>
          <Text style={styles.heading} >Title</Text>
          <Text style={styles.title} >{item.title}</Text>
          <View style={styles.border} />
          <Text style={styles.heading} >Completed</Text>
          <Text style={styles.title} >{item.completed ? 'True' : 'False'}</Text>
          <View style={styles.border} />
          <Text style={styles.heading} >UserID</Text>
          <Text style={styles.title} >{item.userId}</Text>
          <View style={styles.border} />
          <Text style={styles.heading} >id</Text>
          <Text style={styles.title} >{item.id}</Text>
        </View>
      </View>
    )
  }
  const Empty = () => (
    <View>
      <Text style={[styles.title, { color: 'black' }]} >No data to show</Text>
    </View>
  )

  return (
    <FlatList
      data={data}
      style={{ flex: 1 }}
      contentContainerStyle={{ backgroundColor: 'white', alignItems: 'center' }}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => renderTodo(item)}
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.5} // load more when the scroll is halfway from the bottom
      ListFooterComponent={renderFooter}
      ListEmptyComponent={<Empty />}
    />
  );
};

export default Pagination;

const styles = StyleSheet.create({
  todoContainer: {
    backgroundColor: 'blue',
    borderRadius: 20,
    // width: '90%',
    padding: 20,
    marginBottom: 10
  },
  heading: {
    color: 'white',
    fontSize: 20,
    fontFamily: getFont('M')
  },
  title: {
    color: 'white',
    fontSize: 20,
    fontFamily: getFont('R')
  },
  border: {
    marginVertical: 5,
    backgroundColor: 'black',
    height: 1,
    width: '100%'
  }
})