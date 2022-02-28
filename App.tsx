/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useState, useCallback, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import CodePush from 'react-native-code-push';
import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

declare const global: {HermesInternal: null | {}};

const App = () => {
  const [isReady, setIsReady] = useState(false);
  const codePushSync = useCallback(() => {
    CodePush.sync(
      {
        updateDialog: {
          title: '업데이트 알림',
          optionalIgnoreButtonLabel: '확인',
          optionalInstallButtonLabel: '업데이트',
          optionalUpdateMessage: [
            '대기 중인 업데이트가 있습니다.',
            '업데이트 하시겠습니까?',
            '1분 이상 소요될 수 있으니',
            '버튼을 누르고 잠시만 기다려주세요.',
          ].join('\n'),
          mandatoryUpdateMessage: [
            '필수 업데이트가 필요합니다.',
            '버튼을 누르고 1분 이상 소요될',
            '수 있으니 잠시만 기다려주세요.',
          ].join('\n'),
          mandatoryContinueButtonLabel: '업데이트',
        },
        installMode: CodePush.InstallMode.IMMEDIATE,
        mandatoryInstallMode: CodePush.InstallMode.IMMEDIATE,
      },
      (state) => {
        console.log('CodePush.SyncStatus', state);
        if (
          [
            CodePush.SyncStatus.CHECKING_FOR_UPDATE,
            CodePush.SyncStatus.AWAITING_USER_ACTION,
            CodePush.SyncStatus.DOWNLOADING_PACKAGE,
            CodePush.SyncStatus.INSTALLING_UPDATE,
            CodePush.SyncStatus.SYNC_IN_PROGRESS,
            CodePush.SyncStatus.UNKNOWN_ERROR,
          ].includes(state)
        ) {
          setIsReady(false);
        } else if (
          [
            CodePush.SyncStatus.UP_TO_DATE,
            CodePush.SyncStatus.UPDATE_IGNORED,
            CodePush.SyncStatus.UPDATE_INSTALLED,
          ].includes(state)
        ) {
          setIsReady(true);
        }
      },
    );
  }, []);

  useEffect(() => {
    if (__DEV__) {
      return;
    }
    codePushSync();

    return () => {};
  }, [codePushSync]);

  if (!isReady) {
    return <ActivityIndicator />;
  }

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <Header />
          {global.HermesInternal == null ? null : (
            <View style={styles.engine}>
              <Text style={styles.footer}>Engine: Hermes</Text>
            </View>
          )}
          <View style={styles.body}>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Step One</Text>
              <Text style={styles.sectionDescription}>
                Edit <Text style={styles.highlight}>App.tsx</Text> to change
                this screen and then come back to see your edits.
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>See Your Changes</Text>
              <Text style={styles.sectionDescription}>
                <ReloadInstructions />
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Debug</Text>
              <Text style={styles.sectionDescription}>
                <DebugInstructions />
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Learn More</Text>
              <Text style={styles.sectionDescription}>
                Read the docs to discover what to do next:
              </Text>
            </View>
            <LearnMoreLinks />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default CodePush({checkFrequency: CodePush.CheckFrequency.MANUAL})(App);
