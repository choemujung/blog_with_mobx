import { observer } from 'mobx-react-lite';
import React from 'react';
import {Item} from '../types_funcs';
import Category from './Category';
import PostList from './PostList';



interface Props {
    posts: Item[];
}

const Main = observer(({posts}:Props) => {

    return (
        <div>
            <div>
                <b>Mujung's Devlog</b> <input type="text" placeholder='검색어를 입력하세요.'/> <button>검색</button>
            </div>
            <div>
                <button>글쓰기</button>
            </div>
            <div>
                <div className='category'>
                    <Category></Category>
                </div>
                <div className='post-list'>
                    <PostList posts={posts}></PostList>
                </div>
            </div>

        </div>
    );
});

export default Main;