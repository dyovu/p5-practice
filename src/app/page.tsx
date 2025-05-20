import Link from 'next/link';


export default function Page() {
  return (
    <>
      <h1>ホーム画面</h1>
      <div>
      <Link href={'/EuclidPattern'}>ユークリッドパターン</Link>
      </div>
      <div>
      <Link href={'/LogarithmicSpiral'}>対数螺旋</Link>
      </div> 
      <div>
      <Link href={'/PixelPainter'}>ピクセルぺいんと</Link>
      </div>
      <div>
      <Link href={'/Graffiti'}>Graffiti</Link>
      </div>
      <div>
      <Link href={'/RecursionPolygon'}>RecursionPolygon</Link>
      </div>
      <div>
      <Link href={'/SierpinskiGasket'}>シェルピンスキーのフラクタル</Link>
      </div>
    </>
  );
}
