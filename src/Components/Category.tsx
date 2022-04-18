import { observer } from "mobx-react-lite"
import { useRef } from "react";
import blogStore from "../store";
import { Item } from "../types_funcs";

interface Props {
    handleClickCategory: (category:string) => void;
    allPosts:() => void;
}

const Category = observer(({handleClickCategory, allPosts}:Props) => {
    const textRef = useRef<HTMLInputElement>(null);

    const handleClickItem = (category:string) => {
        handleClickCategory(category);
        blogStore.closeAll();
    };

    const handleClickAdd = () => {
        if (textRef.current !== null){
             blogStore.addCategory(textRef.current.value);
             textRef.current.value = '';
        }
    }; 

    return (
        <div>
            <input ref={textRef} type="text" placeholder="새 카테고리" /><button onClick={() => handleClickAdd()}>추가</button>
            <div>
                <b>카테고리</b>
                <div onClick={() => allPosts()}>
                    <span>전체</span>
                    <span>({blogStore.postsLength})</span>
                </div>
                {
                    blogStore.categories.map((category,index) =>
                        <div key={index} onClick={()=>handleClickCategory(category)}>
                            <span>{category}</span>  
                            <span>({blogStore.posts.filter(post=>post.category === category).length})</span>                      
                        </div>
                    )
                }
            </div>
        </div>
    )
});

export default Category;