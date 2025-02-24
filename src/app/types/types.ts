export type Article = {
  _id?: string;
  title: string;
  content: string;
  categorie?: Categorie;
};

export type ArticleForm = {
  title: string;
  content: string;
  categorieId: string | null | undefined;
};

export type Categorie = {
  _id?: string | null;
  name?: string;
};
