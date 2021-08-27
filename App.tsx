import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, SafeAreaView, FlatList, ActivityIndicator, Image, Button} from 'react-native';
import _ from "lodash"

const dataURL = "https://raw.githubusercontent.com/RyanHemrick/star_wars_movie_app/master/movies.json";
const imgURL = "https://raw.githubusercontent.com/RyanHemrick/star_wars_movie_app/master/public/images/";

type Movie = {
  title: string,
  episode_number: string,
  main_characters: string[],
  description: string,
  poster: string,
  hero_image: string
}

enum Direction {
  Ascend = "asc",
  Descend = "desc"
}

const App = () => {

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState<Movie[]>([]);
  const [ direction, setDirection ] = useState(Direction.Ascend);

  useEffect(() => {
      fetch(dataURL)
          .then((response) => response.json())
          .then((json) => setData(json.movies))
          .catch((error) => alert(error))
          .finally(() => setLoading(false));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? <ActivityIndicator size="large" animating /> : <FlatList<Movie>
          data={data}
          keyExtractor={(item) => item.episode_number}
          extraData={data}
          renderItem={({item}) => {
            return(
                <View style={styles.item}>
                  <Text style={styles.title}>
                    Title: {item.title}
                  </Text>
                  {/* Epizoda je zminena v titulku
                  <Text>
                    Number of episode: {item.episode_number}
                  </Text>*/}
                  <Image source={{uri: imgURL+item.poster}} style={styles.logo}/>
                </View>
            )}}
      />}
      <Button title='Sort by episodes' onPress={sortListByEpisodes} color='black' ></Button>
    </SafeAreaView>
  );

  function sortListByEpisodes () {
    const newDirection = direction === Direction.Descend ? Direction.Ascend : Direction.Descend
    let sortedData = _.orderBy(data, ['episode_number'],[newDirection])
    setDirection(newDirection)
    setData(sortedData)
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  item:{
    backgroundColor: '#E5E4E2',
    alignItems: 'center',
    padding: 15,
    margin: 10,
    borderRadius: 10,
  },
  logo: {
    width: 75,
    height: 120,
    borderRadius: 10
  },
  title:{
    fontSize: 15,
    fontWeight: 'bold',
    margin: 5
  }
});

export default App;

