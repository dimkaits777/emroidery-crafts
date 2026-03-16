export interface Product {
  id: string;
  title: string;
  description: string;
  image_url: string;
  product_url: string;
  affilate_url: string;
  button: string;
  category: string;
}

export interface Idea {
  id: string;
  title: string;
  description: string;
  image_url: string;
  category: string;
}

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image_url: string;
}

export interface Equipment {
  id: string;
  title: string;
  description: string;
  image_url: string;
  affilate_url: string;
  category: string;
}
