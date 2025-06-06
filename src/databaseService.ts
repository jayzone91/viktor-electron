import { MySQL } from "./utils/mysqlUtils";

export type ArchiveResult = {
  id: number;
  Title: string;
  Body: string;
};

export const CategoryService = {
  searchArchiv: async (search: string): Promise<ArchiveResult[]> => {
    const res = await MySQL.runQuery<ArchiveResult[]>(
      `SELECT * FROM pdfs WHERE body LIKE %${search}% OR title LIKE %${search}%;`
    );
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
