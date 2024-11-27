import Link from 'next/link';
import '@/styles/global.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <head>{/* 必要に応じてメタタグやタイトルをここに追加 */}</head>
      <body>
        <nav>
          <Link href={'/'}>ホーム</Link>
          <Link href={'/EuclidPattern'}>Euclid Pattern</Link>
          <Link href={'/ContinuedFraction'}>Continued Fraction</Link>
        </nav>
        {children}
      </body>
    </html>
  );
}
