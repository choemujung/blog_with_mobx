import React from 'react';
import PostList from './Components/PostList';
import Category from './Components/Category';
import { Item, getDate, NextId } from'./types_funcs';
import blogStore from './store';
import { observer } from 'mobx-react';
import Write from './Components/Write';
import Detail from './Components/Detail'
import Main from './Components/Main';

const App = observer(() => {
  let ui = blogStore.uiState;
  
  switch(ui) {
    case 'none': 
      return (
        <Main/>
      )
    case 'detail':
      return (
        <Main component={<Detail/>}/>
      )
    case 'write':
      return (
        <Main component={<Write/>}/>
      )
    case 'edit' :
      return (
        <Main component={<Write post={blogStore.selectedPost}/>}/>
      )


  }
  return (
    <div>
      <Main></Main>
    </div>
  );
});


export default App;
