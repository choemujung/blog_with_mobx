import { makeAutoObservable } from "mobx";
import { Item,getDate } from "./types_funcs";

const sample: Item[] = [
    {
      id: 1,
      title: 'js',
      content: 'react',
      category: '일상',
      date: getDate(),
    },
    {
      id: 2,
      title: 'java',
      content: 'spring',
      category: '개발',
      date: getDate(),
    },
    {
      id: 3,
      title: 'c#',
      content: '.net core',
      category: '개발',
      date: getDate(),
    },
    {
      id: 4,
      title: 'python',
      content: 'django',
      category: '낙서',
      date: getDate(),
    },
    {
      id: 5,
      title: 'node',
      content: 'express',
      category: '여행',
      date: getDate(),
    }
  ]
class BlogStore {
    posts:Item[] = sample;

    constructor() {
        makeAutoObservable(this);
    }

    delete = (id: number) => {
        this.posts = this.posts.filter(post => post.id !== id);
    }
}

const blogStore = new BlogStore();
export default blogStore;
