import { observer } from "mobx-react-lite"
import { useRef } from "react";
import blogStore from "../store";
import { Item } from "../types_funcs";

interface Props {
    setPosts:(posts:Item[]) => void;
}

const Category = observer(({setPosts}:Props) => {
    const textRef = useRef<HTMLInputElement>(null);

    const handleClickItem = (category:string) => {
        const posts = blogStore.readByCategory(category);
        setPosts(posts);
        blogStore.closeAll();
    };

    const handleClickAdd = () => {
        (textRef.current !== null) && blogStore.addCategory(textRef.current.value);
    }; 

    return (
        <div>
            <input ref={textRef} type="text" placeholder="새 카테고리" /><button onClick={handleClickAdd}>추가</button>
            <div>
                <b>카테고리</b>
                {
                    blogStore.categories.map((category,index) =>
                        <div key={index} onClick={()=>handleClickItem(category)}>
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