import React from 'react';
import {Appbar} from 'react-native-paper';

const ToolBar = () => {
  const _goBack = () => console.log('Went back');

  const _handleSearch = () => console.log('Searching');

  const _handleMore = () => console.log('Shown more');

  return (
    <Appbar.Header>
      {/* <Appbar.BackAction onPress={_goBack} /> */}
      <Appbar.Action
        icon="format-list-bulleted"
        color="#2bbd7e"
        onPress={_handleMore}
        style={{position: 'absolute', left: 0}}
      />
      <Appbar.Action
        icon="magnify"
        color="#2bbd7e"
        onPress={_handleSearch}
        style={{position: 'absolute', right: 0}}
      />
    </Appbar.Header>
  );
};

export default ToolBar;
