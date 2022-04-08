import React from 'react';
import PostList from './Components/PostList';
import Category from './Components/Category';
import { Item, getDate, NextId } from'./types_funcs';
import blogStore from './store';
import { observer } from 'mobx-react';
import Write from './Components/Write';
import Detail from './Components/Detail'
import Main from './Components/Main';

const sample: Item[] = [
  {
    id: 1,
    title: 'js',
    content: 'react',
    category: '일상',
    date: getDate(),
  },
  {
    id: 2,
    title: 'java',
    content: 'spring',
    category: '개발',
    date: getDate(),
  },
  {
    id: 3,
    title: 'c#',
    content: '.net core',
    category: '개발',
    date: getDate(),
  },
  {
    id: 4,
    title: 'python',
    content: 'django',
    category: '낙서',
    date: getDate(),
  },
  {
    id: 5,
    title: 'node',
    content: 'express',
    category: '여행',
    date: getDate(),
  }
]


const App = observer(() => {
  let posts = blogStore.posts;
  return (
    <div>
      <Main posts={posts}></Main>
    </div>
  );
});


export default App;
