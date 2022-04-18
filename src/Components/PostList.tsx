import { useEffect, useState } from "react";
import { observer } from 'mobx-react';
import { Item } from '../types_funcs';
import blogStore from '../store';
import { toJS } from "mobx";

// components

interface ItemProps {
    post: Item;
}

const PostItem = observer(({ post }: ItemProps) => {
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
                    <button onClick={() => {
                        blogStore.delete(post.id);
                        blogStore.closeAll();
                    }}>삭제</button>
                </span>
            )}
        </div>
    );
});

interface ListProps {
    filter: { category: null | string, search: null | string }
}

const PostList = observer(({ filter }: ListProps) => {
    const { category, search } = filter;
    let posts = blogStore.posts;

    useEffect(() => {
        console.log(`카테고리: ${category} 검색어: ${search}`);
        if (category && !search) {

        } else if (!category && search) {

        } else {

        }
        console.log(toJS(posts));
    });

    if (category && !search) {
        return (
            <div>
                {
                    blogStore.readByCategory(category).map((item: Item) => <PostItem post={item} key={item.id} />)
                }
            </div>
        )
    } else if (!category && search) {
        return (
            <div>
                {
                    blogStore.readBySearch(search).map((item: Item) => <PostItem post={item} key={item.id} />)
                }
            </div>
        )
    } else {
        return (
            <div>
                {
                    blogStore.posts.map((item: Item) => <PostItem post={item} key={item.id} />)
                }
            </div>
        )
    }
});

export default PostList;