import { LanguageSwitcher } from "@/components/language-switcher";
import Image from "next/image";
import Link from 'next/link';
import path from "path";
import fs from "fs";
export interface Article  {
    id: string;
    title: string;
    subtitle: string;
    image: string;
    short_article: string;
    full_article: string;
};

const getArticlesData = async(language: string): Promise<Article[]> =>{
    const filePath = path.join(process.cwd(), 'data', `mocked-data-${language}.json`);
    const jsonData = fs.readFileSync(filePath, 'utf-8');
    const articles: Article[] = JSON.parse(jsonData);
    return articles;
}
const Home  = async ({ searchParams }: { searchParams: { lang?: string }}) => {
    const language = searchParams.lang || 'EN'
    const articles = await getArticlesData(language);

  return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 sm:p-8 lg:p-12 gap-12">
          <p className="text-2xl font-bold">News feed</p>
          <LanguageSwitcher/>
          <div className="w-full max-w-screen-lg">
              {articles.map((article) => {
                  return (
                      <Link key={article.id} href={`/articles/${article.id}?language=${language}`}>
                          <div
                              className="flex flex-col md:flex-row items-start gap-4 md:gap-6 p-4 md:p-6 bg-white shadow-lg rounded-lg w-full mb-8"
                          >
                              <Image
                                  className="w-full md:w-1/4 h-auto object-cover rounded-lg"
                                  src={article.image}
                                  width={180}
                                  height={120}
                                  alt={article.title}
                                  priority
                              />
                              <div className="flex-1">
                                  <h2 className="text-2xl text-gray-700">{article.title}</h2>
                                  <p className="mt-2 text-gray-700">{article.short_article}</p>
                              </div>
                          </div>
                      </Link>
                  );
              })}
          </div>
      </div>
  );
}
export default Home;
