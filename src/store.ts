import { makeAutoObservable } from "mobx";
import { Item, getDate, ViewState, NextId } from "./types_funcs";

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
  categories:string[] = [];
  uiState: ViewState = 'none';
  selectedId: number = -1;
  a:number = 0;

  add = () => {
    this.a += 1;
  }

  constructor() {
    makeAutoObservable(this);
    for(let i=0;i<this.posts.length;i++) {
      let category = this.posts[i].category;
      if (!this.categories.includes(category)) {
        this.categories.push(category);
      } 
    }
  }

  //computed
  get postsLength():number {
    return this.posts.length;
  }
  // post 삭제
  delete = (id: number) => {
    this.posts = this.posts.filter(post => post.id !== id);
  }
  get selectedPost():Item {
    const post = this.posts.find(item=>item.id === this.selectedId);
    if (post) {
      return post;
    } else {
      const defaultPost:Item = {
        id:0,
        category:'',
        title:'',
        content:'',
        date:'',
      } 
      return defaultPost;
    }
  }

  readBySearch = (keyword: string): Item[] => {
    return this.posts.filter(item => item.title.includes(keyword) || item.content.includes(keyword));
  }

  readByCategory = (category: string): Item[] => {
    return  this.posts.filter(item => item.category === category);
  }

  addCategory = (category: string) => {
    this.categories.push(category);
  }

  addPost = (category:string, title:string, content:string) => {
    const newPost:Item = {id:NextId.getId(),category,title,content,date:getDate()};
    this.posts = [newPost, ...this.posts];
    this.closeAll();
  }

  updatePost = (id:number, category:string, title:string, content:string, date:string) => {
    const updatePost:Item = {id, category, title, content, date};
    this.posts = this.posts.map(post => (post.id === id) ? updatePost : post);
    this.closeAll();
  }

  openWrite = () => {
    this.uiState = 'write';
  }

  openEdit = (id: number) => {
    this.selectedId = id;
    this.uiState = 'edit';
  }

  openDetail = (id: number) => {
    if (this.uiState === 'detail') {
      (this.selectedId === id) ? (this.uiState = 'none') : (this.selectedId = id);
    } else {
      this.selectedId = id;
      this.uiState = 'detail';
    }
  }
  closeAll = () => {
    this.uiState = 'none';
  }
}

const blogStore = new BlogStore();
export default blogStore;
