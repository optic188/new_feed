import Image from "next/image";
import fs from 'fs';
import path from 'path';
import { Article } from '../../page';

const getArticleById = async (id: string): Promise<Article | undefined>  => {
    const filePath = path.join(process.cwd(), 'app', 'data', 'mocked-data.json');
    const jsonData = fs.readFileSync(filePath, 'utf-8');
    const articles: Article[] = JSON.parse(jsonData);
    return articles.find((article) => article.id === id);
}

export default async function ArticlePage({ params }: { params: { id: string } }) {
    const article = await getArticleById(params.id);

    if (!article) {
        return <p>Article not found!</p>;
    }

    return (
        <div className="container mx-auto p-8">
            <h1 className="text-3xl font-bold">{article.title}</h1>
            <Image
                src={article.image}
                width={600}
                height={300}
                alt={article.title}
                priority
            />
            <p className="mt-4 text-lg">{article.full_article}</p>
        </div>
    );
}
