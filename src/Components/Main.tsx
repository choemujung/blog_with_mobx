import { observer } from 'mobx-react-lite';
import React, { useEffect, useRef, useState } from 'react';
import blogStore from '../store';
import {Item} from '../types_funcs';
import Category from './Category';
import PostList from './PostList';



interface Props {
    component?:JSX.Element;
}

const Main = observer(({component}:Props) => {
    const searchInput = useRef<HTMLInputElement>(null);

    useEffect(() => {
        (searchInput.current !== null) && (searchInput.current.value = '');
    });

    const handleClickSearch = () => {
        (searchInput.current !== null) && blogStore.readByKeyword(searchInput.current.value);
        blogStore.closeAll();
    }

    const handleClickWrite = () => {
        blogStore.openWrite();
    }

    const handleClickHome = () => {
        blogStore.setCurPosts(blogStore.posts);
        blogStore.closeAll();
    }
    

    return (
        <div>
            <div>
                <div>
                    <b onClick={handleClickHome}>Mujung's Devlog</b> <input ref={searchInput} type="text" placeholder='검색어를 입력하세요.' />
                    <button onClick={handleClickSearch}>검색</button>
                </div>
                <div>
                    <button onClick={handleClickWrite}>글쓰기</button>
                </div>
                <div>
                    <div className='category'>
                        <Category></Category>
                    </div>
                    <div className='post-list'>
                        <PostList></PostList>
                    </div>
                </div>
            </div>
            {
                (component) && <div>{component}</div>
            }
        </div>
    );
});

export default Main;