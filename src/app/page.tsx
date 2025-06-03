import Link from 'next/link';
import fs from 'fs';
import path from 'path';

export default function Home() {
  const imagesDirectory = path.join(process.cwd(), 'public/images');
  const files = fs.readdirSync(imagesDirectory)
    .filter(filename => filename.endsWith('.png'));

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Poetry Collection</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {files.map((filename) => {
            const poemName = filename.replace('.png', '');
            const encodedName = poemName.split(' ').map(part => encodeURIComponent(part)).join(' ');
            
            return (
              <Link
                key={filename}
                href={`/poem/${encodedName}`}
                className="block p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <h2 className="text-xl font-semibold text-gray-800">
                  {poemName}
                </h2>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
