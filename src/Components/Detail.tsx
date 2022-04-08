import { observer } from 'mobx-react';
import React from 'react';
import { Item } from '../types_funcs';

interface Props {
    post: Item;
}

const Detail = observer(({post}:Props) => {
    return (
        <div>
            <div>
                <span>{post.category}</span><span>{post.date}</span><button>수정</button><button>삭제</button>
            </div>
            <div>
                {post.title}
            </div>
            <div>
                {post.content}
            </div>
        </div>
    );
});

export default Detail;