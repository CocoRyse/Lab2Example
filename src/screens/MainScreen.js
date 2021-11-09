import React, { useEffect, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
} from 'react-native';
import { Button, ButtonGroup, Card, Icon } from 'react-native-elements';
import { DataProvider } from '../services/DataProvider';

const buttons = ['Удалить', 'Добавить'];

const MainScreen = ({ navigation }) => {
  const [books, setBooks] = useState();
  const [workMode, setWorkMode] = useState(1);

  useEffect(() => {
    let shouldComponentUpdate = true;

    DataProvider.getAllBooks().then((books) => {
      const mappedBooks = books.map((book) => ({
        key: book.id,
        ...book,
      }));

      if (shouldComponentUpdate) {
        setBooks(mappedBooks);
      }
    });

    return () => {
      shouldComponentUpdate = false;
    };
  }, [books]);

  const handleWorkModeButtonsClick = (pressedButtonIndex) => {
    if (pressedButtonIndex === 0) {
      if (workMode === 0) {
        setWorkMode(1);
      } else {
        setWorkMode(0);
      }
    } else {
      navigation.navigate('EditBook');
    }
  };

  const handleDelete = (id) => {
    DataProvider.deleteBook(id);
  };

  const renderListItem = ({ item }) => {
    return (
      <TouchableHighlight
        activeOpacity={0.6}
        underlayColor={workMode ? '#D9D9D9' : '#DD3333'}
        onPress={
          workMode
            ? () => {
                navigation.navigate('EditBook', {
                  id: item.id,
                });
              }
            : () => {
                handleDelete(item.id);
              }
        }
      >
        <View style={styles.textContainer}>
          <Text styles={styles.text}>{item.title}</Text>
          {workMode === 0 && (
            <Button
              icon={<Icon name="close" type="evilicon" color="#f00" />}
              type="clear"
              onPress={
                workMode
                  ? () => null
                  : () => {
                      handleDelete(item.id);
                    }
              }
            />
          )}
        </View>
      </TouchableHighlight>
    );
  };

  return (
    <Card>
      <ButtonGroup
        buttons={buttons}
        containerStyle={{ height: 50 }}
        selectedIndex={workMode ? undefined : workMode}
        selectedButtonStyle={{ backgroundColor: '#f00' }}
        onPress={handleWorkModeButtonsClick}
      />
      <Card.Divider />
      <FlatList style={styles.list} data={books} renderItem={renderListItem} />
    </Card>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  list: {
    marginBottom: 120,
  },
  textContainer: {
    borderColor: '#D3D3D3',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    height: 60,
  },
  text: {
    fontSize: 25,
    minWidth: 350,
  },
  header: {
    fontSize: 25,
    marginBottom: 25,
    fontWeight: '600',
  },
});
