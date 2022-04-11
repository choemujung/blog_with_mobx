import { observer } from 'mobx-react';
import blogStore from '../store';
import { Item } from '../types_funcs';


const Detail = observer(() => {
    const post: Item | undefined = blogStore.selectedPost;

    if (typeof post !== 'undefined') {
        const handleClickDelete = () => {
            blogStore.delete(post.id);
            blogStore.closeAll();
        }
        // 

        const handleClickEdit = () => {
            blogStore.openEdit(post);
        }

        return (
            <div>
                <div>
                    <h1>{post.category}</h1>
                    <span>{post.date}</span>
                </div>
                <div>
                    {post.title}
                </div>
                <div>
                    {post.content}
                </div>
                <div>
                    <button onClick={handleClickEdit}>수정</button><button onClick={handleClickDelete}>삭제</button>
                </div>
            </div>
        );
    } else {
        return null;
    }
});

export default Detail;