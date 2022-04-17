import { NONAME } from 'dns';
import { autorun } from 'mobx';
import { observer } from 'mobx-react-lite';
import { useEffect, useRef, useState } from 'react';
import blogStore from '../store';
import { Item } from '../types_funcs';
import Category from './Category';
import PostList from './PostList';


const LeftTemplate = observer(() => {
    const searchInput = useRef<HTMLInputElement>(null);
    const [posts, setPosts] = useState<Item[]>(blogStore.posts);
    const [onFilter, setFilter] = useState<{category:string|null, search:string|null}>
    ({
        category:null,search:null
    });
    // useEffect(() => {
    //     (searchInput.current !== null) && (searchInput.current.value = '');
    // });
    // useEffect로 초기화 안해주면 posts가 바뀌었을 때 렌더링이 안되고, 
    // 초기화 해주면 필터링이 안되고.
    // useEffect(()=>{
    //     setPosts(blogStore.posts);
    // },[posts]);

    autorun(()=>{
        if(onFilter.category !== null) {
            setPosts(blogStore.readByCategory(onFilter.category));
        } else if(onFilter.search !== null) {
            setPosts(blogStore.readBySearch(onFilter.search));
        } else {
            setPosts(blogStore.posts);
        }
    });

    const handleClickSearch = () => {
        if (searchInput.current !== null) {
            if (searchInput.current.value === '') {
                alert('검색어를 입력해주세요.');
            } else {          
                setFilter({category:null, search:searchInput.current.value});      
                setPosts(blogStore.readBySearch(searchInput.current.value));
                blogStore.closeAll();
            }
        }
    }

    const handleClickWrite = () => {
        blogStore.openWrite();
    }

    const changePosts = (posts:Item[]) => {
        setPosts(posts);
        blogStore.closeAll();
    }

    const setCategory = (newCategory:string|null) => {
        setFilter({category:newCategory, search:null});
    }


    return (
        <div>
            <div>
                <b onClick={()=>changePosts(blogStore.posts)}>Mujung's Devlog</b> <input ref={searchInput} type="text" placeholder='검색어를 입력하세요.' />
                <button onClick={handleClickSearch}>검색</button>
            </div>
            <div>
                <button onClick={handleClickWrite}>글쓰기</button>
            </div>
            <div>
                <div className='category'>
                    <Category setCategory={()=>setCategory}/>
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