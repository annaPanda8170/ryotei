# 概要
レストランの一括管理アプリケーションです。<br>予約・会計・スタッフ・ドリンク・顧客の管理の機能を担います。
<br>
<br>

# 接続
<br>

## ①接続にあたって
- 数日に一回データベースをクリアにしているので、ご自由に保存等なさってください。
- このアプリのユーザーはメンバーと言います。メンバーにはグレードがありそれぞれ権限が違います(詳しくは後述)。まずは全ての権限があるGrade3のメンバーでログインしてください。
<br>
<br>

## ②URL
http://restaurant-batch-management.xyz/

## ③メンバーログイン情報
Grade3メンバー
```
Email:a@a
Pass:123123123
```
Grade2メンバー
```
Email:b@b
Pass:123123123
```
Grade1メンバー
```
Email:c@c
Pass:123123123
```
NoGradeメンバー
```
Email:d@d
Pass:123123123
```
<br>
<br>

# 言語・デプロイ環境
- Ruby On Rails
- JQuery
- EC2
<br>
<br>

# データベース
![restaurant (2)](https://user-images.githubusercontent.com/57531048/79423429-8bf69a00-7ff9-11ea-8a54-846e04ad93b6.jpeg)

# 仕様・使い方
<br>

# メンバーのグレード(権限)
登録時はグレードがついておらず、ログインもできません。Grade3のメンバーにグレードを設定されて初めて利用できるようになります。
グレードは3段階あり、権限が大きい順からgrade3→grade2→grade1です。
grade3は、全員のグレード設定と退社処理・編集・閲覧ができます。
grade2は、編集・閲覧ができます。
grade1は、閲覧ができます。
<br>
<br>

## ①ヘッダー
左上にヘッダーが常に表示されています。Menuと時計の2項目です。
<div><img src="https://gyazo.com/ea2616373be30b228c15ece044b6c8e2/raw" width="220px" align="left">Menuをホバーすると4項目が出てきます。全てそれぞれの機能へのリンクになっています。<br clear="all"></div>
 <br>
 <br>
<div><img src="https://gyazo.com/63b03bb14d63834b27168d2dfa055f2c/raw" width="500px" align="left">時計をホバーすると2項目が出てきます。メンバー自身の名前とログアウトのリンクです。<br clear="all"></div>

## ②ドリンク
ドリンク名と価格とメモが登録でき、そのまま会計で利用できます。<br>
http://restaurant-batch-management.xyz/drinks

<div><img src="https://gyazo.com/e7ed9c64037fee7b00fecbc9f77a4754/raw" width="350px" align="left">一覧表示は、カテゴリー絞り込みができ、ページネーションされています。この2機能を両立させるために、Gem等は使っておらず<a href="https://github.com/annaPanda8170/ryotei/blob/master/app/assets/javascripts/drinks.js">このJSファイル</a>で自作しています。<br>ドリンク情報をまとめてcsvファイルとしてダウンロードできます。客用ドリンクメニュー作成等に利用できます。<br clear="all"></div>
 <br>
 <br>

## ③メンバー
基本的にはメンバーを一覧できるだけで、Grade3の場合のみグレード設定ができます。<br>
http://restaurant-batch-management.xyz/members

<div><img src="https://gyazo.com/058fa4ed919c7a522304d765f44142d2/raw" width="350px" align="left">Grade3でログインした場合でグレード未登録のメンバーがいる場合、上に赤く警告が出され、グレード未登録のメンバーのみの一覧のリンクが表示されます。<br>編集を押すとグレードの変更ができます。<br clear="all"></div>
 <br>
 <br>








<img src="https://gyazo.com/dbd924c43688f00c84f9a379721a47dd/raw" width="350px" align="left">あああああああああああああああああああああああいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいllllllllllllllllllllllllllllllllllllllllllooooooooooooooooooooooooooooooooooooooooooあああああああああああああああああああああいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいllllllllllllllllllllllllllllllllllllllllllooooooooooooooooooooooooooooooooooooooooooあああああああああああああああああああああいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいllllllllllllllllllllllllllllllllllllllllllooooooooooooooooooooooooooooooooooooooooooあああああああああああああああああああああいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいlllllllllllllllllllllllllllllllllllllllllloooooooooooooooooooooooooooooooooooooooooo

