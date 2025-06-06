import { MySQL } from "./utils/mysqlUtils";

export type Category = {
  id?: number;
  name: string;
};

export const CategoryService = {
  getCategories: async (): Promise<Category[]> => {
    const res = await MySQL.runQuery<Category[]>(`SELECT * FROM categories`);
    return res;
  },
};

// and call in your .tsx file like

// CategoryService.getCategories()
//       .then((result) => {
//         setCategories(result);
//         setLoading(false);
//       })
//       .catch((error) => console.log(error));
