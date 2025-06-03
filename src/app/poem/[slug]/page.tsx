import Image from 'next/image';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';

export async function generateStaticParams() {
  try {
    const imagesDirectory = path.join(process.cwd(), 'public/images');
    const files = fs.readdirSync(imagesDirectory);
    
    return files
      .filter(filename => filename.endsWith('.png'))
      .map((filename) => ({
        slug: filename.replace('.png', ''),
      }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

export default async function Page({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  const imagePath = `/images/${slug}.png`;

  // Check if the file exists
  const fullPath = path.join(process.cwd(), 'public', imagePath);
  if (!fs.existsSync(fullPath)) {
    console.error(`File not found: ${fullPath}`);
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
            alt={slug}
            fill
            className="object-contain"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </div>
    </div>
  );
} 