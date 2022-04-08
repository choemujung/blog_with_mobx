import { useEffect, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import { Item } from '../types_funcs';


interface Props {
    post?: Item;
}
const style = {
    resize: "none",
}
const Write = observer(({ post }: Props) => {
    let categories: { [key: string]: number } = { '여행': 50, '맛집': 20, '개발': 10, '일상': 10 };
    const titleRef = useRef<HTMLInputElement>(null);
    const cateRef = useRef<HTMLSelectElement>(null);
    const contentRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (titleRef.current !== null && contentRef.current !== null && cateRef.current !== null) {
            titleRef.current.value = '';
            contentRef.current.value = '';
            if (post !== undefined) {
                titleRef.current.value = post.title;
                contentRef.current.value = post.content;
            }
        }
    });



    const handleClickPublishBtn = () => {
        if ((titleRef.current !== null) && (contentRef.current !== null) && (cateRef.current !== null)) {
            const [title, content, cate] = [titleRef.current.value, contentRef.current.value, cateRef.current.value];
            if (title !== '') {
                if (content !== '') {
                    if (cateRef.current.value == '전체') {

                    } else {

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
                <select defaultValue={post?.category} ref={cateRef}>
                    {Object.keys(categories).map((item, index)=><option key={index}>{item}</option>)}
                </select>
                <button>취소</button>
                <button>발행</button>
            </div>
            <div>
                <input type="text" placeholder='제목' ref={titleRef}/>
            </div>
            <div>
                <textarea name="" placeholder='내용' ref={contentRef}></textarea>
            </div>

        </div>
    );
});

export default Write;

