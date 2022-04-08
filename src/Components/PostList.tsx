import { useState } from "react";
import { observer } from 'mobx-react';
import { Item } from '../types_funcs';
import blogStore from '../store';

// components

interface ItemProps {
    post: Item;
}

interface ListProps {
    posts: Item[];
}

const PostItem = observer(({post}:ItemProps)=>{
    const [isHide, setHide] = useState<boolean>(true);
    return (
        <div onMouseEnter={() => setHide(false)} onMouseLeave={() => setHide(true)}>
            <span onClick={() => console.log('상세보기 누름')}>{post.title}</span>
            <span>{post.date}</span>
            {!isHide && (
                <span >
                    <button onClick={() => console.log('수정누름')}>수정</button>
                    <button onClick={() => blogStore.delete(post.id)}>삭제</button>
                </span>
            )}
        </div>
    );
});

const PostList = observer(({posts}:ListProps) => {
    return (
        <div>
            {
                posts.map((item: Item) =>
                    <PostItem post={item} key={item.id} />
                )
            }
        </div>
    )
});

export default PostList;