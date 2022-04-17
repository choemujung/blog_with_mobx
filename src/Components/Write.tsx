import { useEffect, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import { Item } from '../types_funcs';
import blogStore from '../store';


interface Props {
    post?:Item;
}

const Write = observer(({post}:Props) => {
    const titleRef = useRef<HTMLInputElement>(null);
    const contentRef = useRef<HTMLTextAreaElement>(null);
    const categoryRef = useRef<HTMLSelectElement>(null);

    useEffect(() => {
        if (titleRef.current !== null && contentRef.current !== null && categoryRef.current !== null) {
            if (post) {
                console.log(`post : ${post.title}`);
                titleRef.current.value = post.title;
                contentRef.current.value = post.content;
                categoryRef.current.value = post.category;
            } else {
                titleRef.current.value = '';
                contentRef.current.value = '';
                categoryRef.current.value = blogStore.categories[0];
            }
        }
    });

    /*
    props를 넘겨받지 않고 store의 uiState를 참조하여 edit과 write의 ref를 다르게 했는데 
    edit -> write 또는 그 역이 동작하지 않는다. 
    */
    // const Write = observer(() => {
    //     let categories:string[] = blogStore.categories;
    //     const titleRef = useRef<HTMLInputElement>(null);
    //     const contentRef = useRef<HTMLTextAreaElement>(null);
    //     const category = useRef<string>('');
    
    //     useEffect(() => {
    //         if (titleRef.current !== null && contentRef.current !== null) {
    //             if (blogStore.uiState === 'edit') {
    //                 console.log(`post : ${blogStore.selectedPost.title}`)
    //                 titleRef.current.value = blogStore.selectedPost.title;
    //                 contentRef.current.value = blogStore.selectedPost.content;
    //                 category.current = blogStore.selectedPost.category;
    //             } else {
    //                 console.log(`post : ${blogStore.selectedPost.title}`)
    //                 titleRef.current.value = '';
    //                 contentRef.current.value = '';
    //                 category.current = '전체';
    //             }
    //         }
    //     });


    const handleClickPublish = () => {
        if ((titleRef.current !== null) && (contentRef.current !== null) && (categoryRef.current !== null)) {
            const [title, content, category] = [titleRef.current.value, contentRef.current.value, categoryRef.current.value];
            if (title !== '') {
                if (content !== '') {
                    if (post) {
                        console.log('update');
                        blogStore.updatePost(post.id, category, title, content, post.date);
                    } else {
                        console.log('create');
                        blogStore.addPost(category, title, content);
                    }
                } else {
                    alert('본문을 입력해주세요.');
                }
            } else {
                alert('제목을 입력해주세요.');
            }
        }
    }

    return (
        <div>
            <div className='header'>
                <select ref={categoryRef}>
                    {blogStore.categories.map((category,index)=><option value={category} key={index}>{category}</option>)}
                </select>
                <button onClick={()=>blogStore.closeAll()}>취소</button>
                <button onClick={handleClickPublish}>발행</button>
            </div>
            <div>
                <input type="text" placeholder='제목' ref={titleRef}/>
            </div>
            <div>
                <textarea placeholder='내용' ref={contentRef}/>
            </div>
        </div>
    );
});

export default Write;

