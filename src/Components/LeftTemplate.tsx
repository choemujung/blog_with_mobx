import { type } from '@testing-library/user-event/dist/type';
import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';
import { useEffect, useRef, useState } from 'react';
import blogStore from '../store';
import { Item } from '../types_funcs';
import Category from './Category';
import PostList from './PostList';


const LeftTemplate = observer(() => {
    const searchInput = useRef<HTMLInputElement>(null);
    let posts = blogStore.posts;
    interface filterType {
        category: null | string;
        search: null | string;
    }
    const [filter, setFilter] = useState<filterType>({
        category: null,
        search: null,
    });
    // useEffect(() => {
    //     (searchInput.current !== null) && (searchInput.current.value = '');
    // });
    // useEffect로 초기화 안해주면 posts가 바뀌었을 때 렌더링이 안되고, 
    // 초기화 해주면 필터링이 안되고.


    const handleClickSearch = () => {
        if (searchInput.current !== null) {
            if (searchInput.current.value === '') {
                alert('검색어를 입력해주세요.');
            } else { 
                setFilter({category: null, search:searchInput.current.value})                  
                blogStore.closeAll();
            }
        }
    }

    const handleClickWrite = () => {
        blogStore.openWrite();
    } 

    const handleClickCategory = (newCategory:string) => {
        setFilter({category:newCategory, search:null});
        blogStore.closeAll();
    }

    const allPosts = () => {
        setFilter({category:null, search:null});
        blogStore.closeAll();
    }

    return (
        <div>
            <div>
                <b onClick={allPosts}>Mujung's Devlog</b> <input ref={searchInput} type="text" placeholder='검색어를 입력하세요.' />
                <button onClick={handleClickSearch}>검색</button>
            </div>
            <div>
                <button onClick={handleClickWrite}>글쓰기</button>
            </div>
            <div>
                <div className='category'>
                    <Category handleClickCategory={handleClickCategory} allPosts={allPosts}/>
                </div>
                <div className='post-list'>
                    {
                        
                    }
                    <PostList filter={filter}/>
                </div>
            </div>
        </div>
    );
});

export default LeftTemplate;