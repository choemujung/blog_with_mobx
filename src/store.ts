import { NONAME } from "dns";
import { makeAutoObservable } from "mobx";
import { Item, getDate, ViewState } from "./types_funcs";

const sampleItems: Item[] = [
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
  posts: Item[] = sampleItems;
  curPosts: Item[] = this.posts;
  categories: { [key: string]: number } = {'전체':0};
  uiState: ViewState = 'none';
  selectedPost?: Item;

  constructor() {
    makeAutoObservable(this);
    for(let i=0;i<this.posts.length;i++) {
      let cate = this.posts[i].category;
      let keys = Object.keys(this.categories);
      if (keys.includes(cate)) {
        this.categories[cate] += 1;
      } else {
        this.categories[cate] = 1;
      }
    }
    console.log(this.categories);
  }

  delete = (id: number) => {
    this.posts = this.posts.filter(post => post.id !== id);
    this.curPosts = this.curPosts.filter(post => post.id !== id);
  }

  // action
  setCurPosts = (posts:Item[]) => {
    this.curPosts = posts;
  }
  readByKeyword = (keyword: string): void => {
    this.curPosts = this.posts.filter(item => item.title.includes(keyword) || item.content.includes(keyword));
  }

  readByCate = (category: string): void => {
    this.curPosts = this.posts.filter(item => item.category == category);
  }

  addCategory = (category: string) => {
    this.categories[category] = 0;
  }

  openWrite = () => {
    this.uiState = 'write';
  }

  openEdit = (post: Item) => {
    this.selectedPost = post;
    this.uiState = 'edit';
  }

  openDetail = (post: Item) => {
    if (this.uiState === 'detail') {
      (this.selectedPost === post) ? (this.uiState = 'none') : (this.selectedPost = post);
    } else {
      this.selectedPost = post;
      this.uiState = 'detail';
    }
  }
  closeAll = () => {
    this.uiState = 'none';
  }
}

const blogStore = new BlogStore();
export default blogStore;
