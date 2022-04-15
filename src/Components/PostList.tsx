import { useState } from "react";
import { observer } from 'mobx-react';
import { Item } from '../types_funcs';
import blogStore from '../store';

// components

interface ItemProps {
    post: Item;
}

const PostItem = observer(({post}:ItemProps)=>{
    const [isHide, setHide] = useState<boolean>(true);

    
    return (
        <div onMouseEnter={() => setHide(false)} onMouseLeave={() => setHide(true)}>
            <span onClick={() => blogStore.openDetail(post.id)}>
                <span >{post.title}</span>
                <span>{post.date}</span>
            </span>
            {!isHide && (
                    <span >
                        <button onClick={() => blogStore.openEdit(post.id)}>수정</button>
                        <button onClick={() =>{
                            blogStore.delete(post.id);
                            blogStore.closeAll();
                        }}>삭제</button>
                    </span>
                )}
        </div>
    );
});

interface ListProps {
    posts:Item[];
}

const PostList = observer(({posts}: ListProps) => {   
    return (
        <div>
            {
                posts.map((item: Item) => <PostItem post={item} key={item.id} />
                )
            }
        </div>
    )
});

export default PostList;