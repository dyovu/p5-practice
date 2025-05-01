import Link from 'next/link';
import '@/styles/layout.css';

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
          <Link href={'/EuclidPattern'}>ユークリッドパターン</Link>
          <Link href={'/LogarithmicSpiral'}>対数螺旋</Link>
          <Link href={'/PixelPainter'}>ピクセルぺいんと</Link>
          <Link href={'/Graffiti'}>Graffiti</Link>
          <Link href={'/RecursionPolygon'}>RecursionPolygon</Link>
          <Link href={'/Test'}>テスト</Link>
        </nav>
        {children}
      </body>
    </html>
  );
}
