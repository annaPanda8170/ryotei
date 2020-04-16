# 概要
レストランの一括管理アプリケーションです。<br>予約・会計・スタッフ・ドリンク・顧客の管理の機能を担います。

# 接続
## ①接続にあたって
- 数日に一回データベースをクリアにしているので、ご自由に保存等なさってください。
- このアプリのユーザーはメンバーと言います。メンバーにはグレードがありそれぞれ権限が違います(詳しくは後述)。まずは全ての権限があるGrade3のメンバーでログインしてください。

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

# 言語・デプロイ環境
- Ruby On Rails
- JQuery
- EC2

# データベース
![restaurant (2)](https://user-images.githubusercontent.com/57531048/79423429-8bf69a00-7ff9-11ea-8a54-846e04ad93b6.jpeg)

# 仕様・使い方
## ①ヘッダー
左上にヘッダーが常に表示されています。Menuと時計の2項目です。
<div><img src="https://gyazo.com/ea2616373be30b228c15ece044b6c8e2/raw" width="220px" align="left">Menuをホバーすると4項目が出てきます。全てそれぞれの機能へのリンクになっています。<div></div></div>
<div><img src="https://gyazo.com/63b03bb14d63834b27168d2dfa055f2c/raw" width="550px" align="left">時計をホバーすると2項目が出てきます。メンバー自身の名前とログアウトのリンクです。</div>

<img src="https://gyazo.com/dbd924c43688f00c84f9a379721a47dd/raw" width="350px" align="left">あああああああああああああああああああああああいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいllllllllllllllllllllllllllllllllllllllllllooooooooooooooooooooooooooooooooooooooooooあああああああああああああああああああああいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいllllllllllllllllllllllllllllllllllllllllllooooooooooooooooooooooooooooooooooooooooooあああああああああああああああああああああいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいllllllllllllllllllllllllllllllllllllllllllooooooooooooooooooooooooooooooooooooooooooあああああああああああああああああああああいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいlllllllllllllllllllllllllllllllllllllllllloooooooooooooooooooooooooooooooooooooooooo

