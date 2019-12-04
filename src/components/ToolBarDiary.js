import React, { useState } from 'react';
import { Appbar } from 'react-native-paper';
import { Snackbar } from 'react-native-paper';

const ToolBarDiary = () => {
  const _handleHint = () => {
    setHint(true);
  };
  const _handleMore = () => console.log('Shown more');
  const [hint, setHint] = useState(false);

  return (
    <>
      <Appbar.Header>
        {/* <Appbar.BackAction onPress={_goBack} /> */}

        <Appbar.Action
          icon='format-list-bulleted'
          color='#2bbd7e'
          onPress={_handleMore}
          style={{ position: 'absolute', left: 0 }}
        />
        <Appbar.Action
          icon='help'
          color='#2bbd7e'
          onPress={_handleHint}
          style={{ position: 'absolute', right: 0 }}
        />
      </Appbar.Header>
      <Snackbar
        duration={2000}
        visible={hint}
        onDismiss={() => setHint(false)}
        action={{
          label: 'Okay',
          onPress: () => {
            // Do something
            setHint(false);
          },
        }}
      >
        Long press on an item to delete it
      </Snackbar>
    </>
  );
};

export default ToolBarDiary;
