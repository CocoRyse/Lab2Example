import React, { useEffect, useState } from 'react';
import { Card } from 'react-native-elements';
import { DataProvider } from '../services/DataProvider';
import { View } from 'react-native';
import { ErrorMessage, Formik } from 'formik';
import { NativeBaseProvider, Input, Button, Text } from 'native-base';
import { object, string } from 'yup';

const buttons = ['Сохранить', 'Отменить'];

const validationSchema = object().shape({
  title: string().required('Необходимо ввести название'),
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
    if (id !== -1 && !defaultValues.id) {
      DataProvider.getBookByID(id).then((data) => {
        setDefaultValues(data);
      });
    }
  }, []);

  return (
    <Card>
      <Card.Title>Редактирование</Card.Title>
      <Card.Divider />
      <View>
        <Formik
          initialValues={defaultValues}
          enableReinitialize={true}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            console.log(values);
            if (id > -1) {
              DataProvider.updateBook(values);
            } else {
              DataProvider.putBook(values);
            }
            navigation.goBack();
          }}
        >
          {(props) => {
            return (
              <NativeBaseProvider>
                <View>
                  <Text fontSize="sm">Название книги:</Text>
                  <Input
                    onChangeText={props.handleChange('title')}
                    onBlur={props.handleBlur('title')}
                    value={props.values.title}
                    placeholder="Input"
                    variant="underlined"
                  />
                  <ErrorMessage name="title" />
                </View>
                <Button
                  size="sm"
                  fontSize="md"
                  variant="outline"
                  w={{
                    base: '75%',
                    md: '15%',
                  }}
                  h={{
                    md: '10',
                  }}
                  mt={6}
                  onPress={props.handleSubmit}
                >
                  Сохранить
                </Button>
              </NativeBaseProvider>
            );
          }}
        </Formik>
      </View>
    </Card>
  );
};

export default EditBookScreen;
