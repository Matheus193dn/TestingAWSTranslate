/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect } from 'react';
import type { Node } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import AWS from 'aws-sdk';
import RNFS, { downloadFile } from 'react-native-fs';
import CameraRoll from '@react-native-community/cameraroll';

const Section = ({ children, title }): Node => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

const translate = new AWS.Translate({
  accessKeyId: '*************',
  secretAccessKey: '************',
  region: 'us-east-2',
})

const App: () => Node = () => {
  // const params = {
  //   SourceLanguageCode: 'vi',
  //   TargetLanguageCode: 'en',
  //   Text: 'Sử dụng dịch vụ dịch của AWS',
  // };

  // translate.translateText(params, (error, data) => {
  //   if (error) {
  //     console.log('error: ', error);
  //   } else {
  //     console.log('data: ', data);
  //   }
  // });

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };


  const downloadFile = () => {
    console.log('start download');
    const fileURL = 'https://file-examples-com.github.io/uploads/2017/04/file_example_MP4_1920_18MG.mp4';
    const downloadDest = `${RNFS.DocumentDirectoryPath}/file_example_MP4_1920_18MG.mp4`;
    const ret = RNFS.downloadFile({ fromUrl: fileURL, toFile: downloadDest });

    ret.promise.then(async res => {
      console.log('file downloaded');
      console.log('res: ', res);
      const filePath = 'file://' + downloadDest;
      await CameraRoll.save(filePath).then(console.log);
    }).catch(err => {
      console.log('download err: ', err);
    });
  }

  useEffect(() => {
    downloadFile();
  }, []);

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Section title="Step One">
            Edit <Text style={styles.highlight}>App.js</Text> to change this
            screen and then come back to see your edits.
          </Section>
          <Section title="See Your Changes">
            <ReloadInstructions />
          </Section>
          <Section title="Debug">
            <DebugInstructions />
          </Section>
          <Section title="Learn More">
            Read the docs to discover what to do next:
          </Section>
          <LearnMoreLinks />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
