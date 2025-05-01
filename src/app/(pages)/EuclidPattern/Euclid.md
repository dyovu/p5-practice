こんにちは[MYJLab Advent Calendar 2024](https://qiita.com/advent-calendar/2024/myjlab)の7日目を担当します@nightcountrycooperです。
本記事では「数学から創ジェネラティブアート[^1]」の一部を紹介します。
この本は、数学の視覚的な表現やアートへの応用について書かれています。表題に数学とあることから敬遠する人もいるかとおもいますが、初めの方は高校数学までなのであまり難しくないです。
作品例を見るだけでもおもしろいので、ぜひ興味があれば読んでみてください


## 1. はじめに
本記事では**ユークリッドの互除法**の可視化についてやっていきます。
本の中ではProcessingが使われていますが今回はp5.jsを使っていきます。
本記事のコードは[p5.js Web Editor](https://editor.p5js.org/)で動作するようにしています。自身のpcでの環境構築をしたい場合は他の記事等を参照ください。またその場合本記事のコードを変更する部分が出てきます。

**完成イメージ** 
|![euclid_8_7_10.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3617893/61783501-43cc-6a6e-eebf-df8e34305148.png)|![euclid_3_7_30.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3617893/06977512-cd71-6bc9-28b8-d3f53de5c78f.png)|
|---|---|


## 2.ユークリッドの互除法
ユークリッドの互除法は2つの自然数の最大公約数を求めるときや一次不定方程式($ax + by = 1$みたいなもの)の解を求めるときにつかうものです。
具体的には、（10, 6)2つの整数があったとき
```math
\begin{align}
10 ÷ 6 &= 1 … 4  
\\
6 ÷ 4 &= 1 … 2  
\\
4 ÷ 2 &= 2
\end{align}
```
のようにすることで10と6の最大公約数をもとめられます。
次章からこれを視覚的に表現していきます。
**以下の説明では断りがない限り<font color="Red">横:縦 = 10:6</font>での話をしていきます。ですが最終的なコードは比率が1:1でなければ動作するようになっています。**


## 3. 正方形による長方形の分割
### 図形的な表現
先ほどの(10, 6)の最大公約数を求める流れを図形的に考えると


||
|:-:|
|<img width=70% align="center" src="https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3617893/98eae200-09cb-caaa-eda3-a02bc655c665.png" >|
||

- 10÷6 = 1 … 4 ：(横:縦 = 10:6)の長方形を一辺6の正方形1つと4の辺に分割
- 6÷4 = 1 … 2 → (横:縦 = 4:6)の長方形を一辺4の正方形1つと2の辺に分割
- 4÷2 = 2 (横:縦 = 4:2)の長方形を一辺2の正方形2つに分割
このように考えられる


### 正方形で長方形を分割する関数を作ろう
##### 考え方
- 描画するcanvasはの正方形(例: createCanvas(600, 600))にする
- 関数の引数として(描画する正方形の1編の長さ[wd], 縦横比[ratio], 描画を開始するxの座標[xPos], 描画を開始するyの座標[yPos])をもつ
- 横:縦 = a : b (a>b)のとき分割される長方形の長辺をW, 短辺を`W*(b/a)`とする
    - 横:縦 = 10:6でcanvasが600×600の場合、横の長さを600、縦の長さを600*(6/10)
    - もし(a<b)なら横の長さを600*(6/10)、縦の長さを600にする
- 分割する正方形の1辺の長さを保持する変数(`rem = W*(b/a)`)をつくる
    - この変数は分割の向きが変わるときに変更される
    - 10:6のときは6
    - 4:6の時は4
    - 4:2の時は2


##### 描画の流れ
- 正方形の描画の開始位置(xPos, yPos)とすると, `xPos + rem < W`の間xPos にremを足していく
- `xPos + rem < W`になったら`rem = W - xPos`とする(分割する向きを変える)
- 縦長の長方形に対しても同じ操作をする

これを繰り返すことで長方形を正方形で分割できる

##### 注意点
- 縦横比によって最初に分割する方向を変える
以上を繰り返していくことで長方形を正方形で分割することができる。また(a<b)のときも同様に分割できる
- 連続的な処理はいらないのでdraw関数ではなくsetup関数の中で呼び出す
- rem > 0の時、縦に分割した次は必ず横に分割(逆も同じ)



#### 自分のコード

```ts:setup.ts
function setup() {
  createCanvas(600, 600);
  colorMode(HSB, 1);
  noStroke();

  const WIDTH = width;
  // 縦横比
  const horizontal = 5;
  const vertical = 3;
  // ratioは横/縦, ration > 1は横長, ratio < 1は縦長
  const ratio =  horizontal/vertical;

  let wd = WIDTH;
  let xPos = 0;
  let yPos = 0;

  divideRectangle(wd, ratio, xPos, yPos)
}
```

```ts:divideRectangle
// 正方形による長方形の分割
// 引数には長方形の長辺の長さ、縦横比、左上のx座標、左上のy座標を持つ
 const divideRectangle = (wd, ratio, xPos, yPos) => {
  let ittr = 0;
  let rem;
  let xEndPos;
  let yEndPos;

  if (ratio < 1) {
    // 横長の長方形を分割
    xEndPos = wd*ratio;
    yEndPos = wd;
    rem = wd*ratio;
    ittr = 0;
  }else{
    // 縦の長方形を分割
    xEndPos = wd;
    yEndPos = wd/ratio;
    rem = wd/ratio;
    ittr = 1;
  }

  // 分割する正方形が誤差による閾値を超えるまで
  while (rem > 0.1) {
    ittr++;
    if(ittr % 2 == 0) {
      while (xPos + rem <= xEndPos+ 0.1) { 
        fill(color(random(1), 1, 1));
        rect(xPos, yPos, rem, rem);
        xPos += rem;
      }
      rem = xEndPos - xPos;
    } else {
      while (yPos + rem <= yEndPos + 0.1) {
        fill(color(random(1), 1, 1));
        rect(xPos, yPos, rem, rem);
        yPos += rem;
      }
      rem = yEndPos - yPos;
    }
  }
}
```



## 4.長方形による正方形の分割
### 図形的な表現
先ほどの長方形を横に圧縮して正方形を作るという考えでもできるが今回は
正方形を横:縦 = 10:6の長方形で分割していく方向で考える。
||
|:-:|
|<img width=70% align="center" src="https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3617893/5ade5c74-5ed5-4355-b367-450529a3af18.png" >|
||



### 正方形を長方形で分割する関数を作ろう
##### 考え方・注意点
基本的には長方形の分割と同じ考え方
- 受け取る引数は長方形の時と同じ
- 最初の分割の方向は縦横比(ratio)で決まる(ittrによらない)
- remが保持している値が次の長方形のどの辺にあたるのか注意
    - 横に分割し終えたら、新しいremは`rem = yEndpos - yPos`となりこれは次の長方形の縦(短辺)を表す
    - 縦に分割し終えたら、新しいremは`rem = xEndpos - xPos`となりこれは次の長方形の横(短辺)を表す
- `rem*ratio`や`rem/ratio`の誤差に注意


#### 自分のコード

- remが0に限りなく近い近似値を示すことがあるため0.1を閾値としている
- ratio > 1であれば `xPos + rem*ratio < xEndPos+0.1`が`false`となるのでittrの値は0でも1でも関係ない


```ts:divideSquare
// 長方形による正方形の分割
// 引数には全体の正方形の一片の長さ、縦横比、左上のx座標、左上のy座標を持つ
const divideSquare = (wd, ratio, xPos, yPos) => {
  let ittr = 0;
  let xEndPos = wd;
  let yEndPos = wd;
  let rem = wd;

  // 描画の開始はratioの値で決まるためittrは0でも1でもok
  while (rem > 0.1) {
    ittr++;
    if(ittr % 2 == 1) {
      while (xPos + rem*ratio < xEndPos+0.1) {
        fill(color(random(1), 1, 1));
        rect(xPos, yPos, rem*ratio, rem);
        xPos += rem*ratio;
      }
      rem = xEndPos - xPos;
    } else {
      while (yPos + rem/ratio < yEndPos+0.1) {
        fill(color(random(1), 1, 1));
        rect(xPos, yPos, rem, rem/ratio);
        yPos += rem/ratio;
      }
      rem = yEndPos - yPos;
    }
  }
}
```

## 再帰的に分割する
長方形の分割と正方形の分割ができれば、これらを再帰的に繰り返すことで、冒頭で示したような図形を描画することができる。
上の2つの関数`divideRectangle()`と`divideSquare()`を書き換えるかコピーして新たな関数を作る

##### 考え方
1. 正方形を長方形で分割
2. 分割した長方形を正方形で分割

分割する辺がある値以下になるまで上の操作を繰り返す
- 最初に呼び出す関数は、divideSquare()として、どこまで分割するかの閾値を引数で渡す
- 分割する正方形や長方形の大きさに注意する
    - 分割を再帰的に行おうとすると(xEndPos, yEndPos)を適切に設定する必要がある
- 再帰的に呼び出すときに引数として渡す`wd`が常に同じ部分を指しているか意識する(長辺の長さ、縦の長さ...etc)
    - 自分は長辺の長さ(正方形の場合は一辺の長さ）を渡すようにして、受け取り側でも場合分けをしている
- 描画のタイミングを変える
    - 今までは正方形の描画は`divideRectangle()`の中で、長方形の描画は`divideSquare()`の中で行なっていた
    - 再帰的に呼び出す際は呼び出した関数の中で描画の処理をする


#### 自分のコード
- プログラム全体としては大きい四角形の上に小さい四角形を塗り重ねていく
- 閾値thrは長方形では短辺の長さを判定している
- recurDivideSquare()に適切な引数をわたしsetupで呼び出すことで描画できる

```ts:recurDivideSquare
// 引数には分割する正方形の一辺の長さ、縦横比、左上のx座標、左上のy座標を持つ
const recurDivideSquare = (thr, wd, ratio, xPos, yPos) => {
  let ittr = 0;
  let xEndPos = wd + xPos;
  let yEndPos = wd + yPos;
  let rem = wd;

  // ここで呼び出し元の正方形を描画する
  fill(color(random(1), 0.4, 1));
  rect(xPos, yPos, rem, rem);

  // ratioによらず引数にわたすwdの値を一定にするために場合分けをする
  while (rem > thr) {
    ittr++;
    if(ittr % 2 == 1) {
      while (xPos + rem*ratio < xEndPos+0.1) {
        ratio > 1 ? recurDivideRectangle(thr, rem*ratio, ratio, xPos, yPos) : recurDivideRectangle(thr, rem, ratio, xPos, yPos);
        xPos += rem*ratio;
      }
      rem = xEndPos - xPos;
    } else {
      while (yPos + rem/ratio < yEndPos+0.1) {
        ratio > 1 ? recurDivideRectangle(thr, rem, ratio, xPos, yPos) : recurDivideRectangle(thr, rem/ratio, ratio, xPos, yPos);
        yPos += rem/ratio;
      }
      rem = yEndPos - yPos;
    }
  }
}
```

```ts:recurDivideRectangle
// 引数には長方形の長辺の長さ、縦横比、左上のx座標、左上のy座標を持つ
 const recurDivideRectangle = (thr, wd, ratio, xPos, yPos) => {
  let ittr = 0;
  let rem;
  let xEndPos;
  let yEndPos;

  // ratioによって描画する長方形の向きが変わるため場合分けをする
  // ここで呼び出し元の長方形の描画を行う
  if (ratio < 1) {
    xEndPos = wd*ratio + xPos;
    yEndPos = wd + yPos;
    rem = wd*ratio;
    ittr = 0;
    fill(color(random(1), 0.4, 1));
    rect(xPos, yPos, wd*ratio, wd);
  }else{
    xEndPos = wd + xPos;
    yEndPos = wd/ratio + yPos;
    rem = wd/ratio;
    ittr = 1;
    fill(color(random(1), 0.4, 1));
    rect(xPos, yPos, wd, wd/ratio);
  }

  while (rem > thr) {
    ittr++;
    if(ittr % 2 == 0) {
      while (xPos + rem <= xEndPos+ 0.1) { 
        recurDivideSquare(thr, rem, ratio, xPos, yPos);
        xPos += rem;
      }
      rem = xEndPos - xPos;
    } else {
      while (yPos + rem <= yEndPos + 0.1) {
        recurDivideSquare(thr, rem, ratio, xPos, yPos);
        yPos += rem;
      }
      rem = yEndPos - yPos;
    }
  }
}
```

## おわりに
再帰的な描画では縦横比と閾値(thr)を変化させることで色々な模様に変化します。

|![10_6_15.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3617893/0efe5d7e-06b9-2fa8-a7ec-42cefc9c0c66.png)|![11_23_15.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3617893/633a3762-bc63-6d33-9eba-79035c5f4350.png)|
|:-:|:-:|
|numA = 10, numB = 6, thr = 15 |numA = 11, numB = 23, thr = 15 | 
|![9_10_10.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3617893/b6ad1d17-4ca2-1701-f36f-7feba4ad1dfc.png)| ![120_121_30.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3617893/eb833d88-1f6c-c65c-0d08-34c06649b032.png)|
| numA = 9, numB = 10, thr = 10| numA = 120, numB = 121, thr = 30|


これらの値をインタラクティブに変化させたり、時間やnoiseなどを使って描画を変化させていくなど表現の仕方はいろいろあると思います。この本には他にも様々な数学の可視化などが載っています。ぜひ興味があれば読んでみてください。


[^1]: 巴山竜来, 数学から創ジェネラティブアート, 技術評論社, 2019