import { observer } from "mobx-react-lite"
import { useRef } from "react";
import blogStore from "../store";

const Category = observer(() => {
    let categories: { [key: string]: number } = blogStore.categories;
    let keys = Object.keys(categories);
    const textRef = useRef<HTMLInputElement>(null);



    const handleClickItem = (category:string) => {
        blogStore.readByCate(category);
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
                    keys.map(item =>
                        <div onClick={()=>handleClickItem(item)}>
                            <span>{item}</span>
                            <span>({categories[item]})</span>
                        </div>
                    )
                }
            </div>
        </div>
    )
});

export default Category;