import { observer } from 'mobx-react-lite';
import { useEffect, useRef, useState } from 'react';
import blogStore from '../store';
import { Item } from '../types_funcs';
import Category from './Category';
import PostList from './PostList';


const LeftTemplate = observer(() => {
    const searchInput = useRef<HTMLInputElement>(null);
    const [posts, setPosts] = useState<Item[]>(blogStore.posts);

    // useEffect(() => {
    //     (searchInput.current !== null) && (searchInput.current.value = '');
    // });
    useEffect(()=>{
        setPosts(blogStore.posts);
        console.log(posts);
    });

    const handleClickSearch = () => {
        if (searchInput.current !== null) {
            if (searchInput.current.value === '') {
                alert('검색어를 입력해주세요.');
            } else {
                const posts = blogStore.readByKeyword(searchInput.current.value);
                setPosts(posts);
                blogStore.closeAll();
            }
        }
    }

    const handleClickWrite = () => {
        blogStore.openWrite();
    }

    const handleClickHome = () => {
        setPosts(blogStore.posts);
        blogStore.closeAll();
    }


    return (
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
                    <Category setPosts={(posts:Item[])=>setPosts(posts)}/>
                </div>
                <div className='post-list'>
                    {
                        
                    }
                    <PostList posts={posts}/>
                </div>
            </div>
        </div>
    );
});

export default LeftTemplate;