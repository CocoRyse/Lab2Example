import React, { useEffect, useState } from 'react';
import { Card } from 'react-native-elements';
import { DataProvider } from '../services/DataProvider';
import { View } from 'react-native';
import { ErrorMessage, Formik } from 'formik';
import {
  NativeBaseProvider,
  Text,
  Input,
  Button,
  Flex,
  Box,
} from 'native-base';
import { object, string, number } from 'yup';

const ErrorComponent = (msg) => (
  <Text color="red.700" fontSize="md">
    {msg}
  </Text>
);

const validationSchema = object().shape({
  title: string().required(ErrorComponent('Необходимо ввести автора')),
});

const EditBookScreen = ({ route, navigation }) => {
  const id = route?.params?.id ?? -1;
  const [defaultValues, setDefaultValues] = useState({
    id,
    author: '',
    country: '',
    imageLink: '',
    language: '',
    link: '',
    pages: 0,
    title: '',
    year: 0,
  });

  useEffect(() => {
    if (id !== -1) {
      DataProvider.getBookByID(id).then((data) => {
        setDefaultValues(data);
      });
    }
  });

  const handleSubmit = (values) => {
    console.log(values);
    if (id === -1) {
      DataProvider.putBook(values);
    } else {
      DataProvider.updateBook(values);
    }
    navigation.goBack();
  };

  return (
    <Card>
      <Card.Title>{id === -1 ? 'Добавление' : 'Редактирование'}</Card.Title>
      <Card.Divider />
      <View style={{ height: 600 }}>
        <Formik
          initialValues={defaultValues}
          enableReinitialize={true}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          {(props) => {
            return (
              <NativeBaseProvider>
                <Flex>
                  <Box>
                    <Text fontSize="md">Название книги:</Text>
                    <Input
                      onChangeText={props.handleChange('title')}
                      onBlur={props.handleBlur('title')}
                      value={props.values.title}
                      placeholder="Введите название книги"
                      variant="underlined"
                      mt={5}
                    />
                    <ErrorMessage name="title" />
                  </Box>
                  <Button
                    size="sm"
                    fontSize="md"
                    variant="outline"
                    colorScheme="coolGray"
                    h={{
                      md: '10',
                    }}
                    mt={6}
                    onPress={props.handleSubmit}
                  >
                    Сохранить
                  </Button>
                </Flex>
              </NativeBaseProvider>
            );
          }}
        </Formik>
      </View>
    </Card>
  );
};

export default EditBookScreen;
