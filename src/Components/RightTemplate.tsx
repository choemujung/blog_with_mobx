import { observer } from "mobx-react";
import blogStore from "../store";
import Detail from "./Detail";
import Write from "./Write";

const RightTemplate = observer(() => {
    switch (blogStore.uiState) {
        case 'none':
            return (
                <div></div>
            )
        case 'detail':
            return (
                <div>
                    <Detail></Detail>
                </div>
            )
        case 'write':
            return (
                <div>
                    <Write></Write>
                </div>
            )
        case 'edit':
            return (
                <div>
                    <Write post={blogStore.selectedPost}></Write>
                </div>
            )
    }
});


export default RightTemplate;