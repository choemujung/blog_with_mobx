import { observer } from "mobx-react-lite"

const Category = observer(() => {
    let categories: { [key: string]: number } = { '여행': 50, '맛집': 20, '개발': 10, '일상': 10 };
    let keys = Object.keys(categories);

    return (
        <div>
            <input type="text" placeholder="새 카테고리" /><button>추가</button>
            <div>
                <b>카테고리</b>
                {
                    keys.map(item =>
                        <div>
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