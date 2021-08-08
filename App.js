import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, SafeAreaView, FlatList, ActivityIndicator, Image} from 'react-native';

const dataURL = "https://raw.githubusercontent.com/RyanHemrick/star_wars_movie_app/master/movies.json";
const imgURL = "https://raw.githubusercontent.com/RyanHemrick/star_wars_movie_app/master/public/images/";

const App = () => {

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(dataURL)
        .then((response) => response.json())
        .then((json) => setData(json.movies))
        .catch((error) => alert(error))
        .finally(setLoading(false));
  });

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? <ActivityIndicator /> : <FlatList
          data={data}
          keyExtractor={(item, index) => item.episode_number}
          renderItem={({item}) => {
            return(
                <View style={styles.container}>
                  <Text>
                    Title: {item.title}
                  </Text>
                  <Text>
                    Number of episode: {item.episode_number}
                  </Text>
                  <Image source={{uri: imgURL+item.poster}} style={styles.logo}/>
                </View>
            )}}
      />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 75,
    height: 75
  }
});

export default App;

