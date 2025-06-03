import Image from 'next/image';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';

type Props = {
  params: {
    slug: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateStaticParams() {
  const imagesDirectory = path.join(process.cwd(), 'public/images');
  const files = fs.readdirSync(imagesDirectory);
  
  return files.map((filename) => ({
    slug: encodeURIComponent(filename.replace('.png', '')),
  }));
}

export default async function PoemPage({ params }: Props) {
  const { slug } = params;
  const decodedSlug = decodeURIComponent(slug);
  const imagePath = `/images/${decodedSlug}.png`;

  // Check if the file exists
  const fullPath = path.join(process.cwd(), 'public', imagePath);
  if (!fs.existsSync(fullPath)) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-4xl mx-auto">
        <Link 
          href="/"
          className="inline-block mb-6 text-blue-600 hover:text-blue-800 transition-colors"
        >
          ← Back to Poems
        </Link>
        <div className="relative w-full aspect-[3/4]">
          <Image
            src={imagePath}
            alt={decodedSlug}
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>
    </div>
  );
} 