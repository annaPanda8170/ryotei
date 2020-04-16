# 概要
レストランの一括管理アプリケーションです。<br>予約・会計・スタッフ・ドリンク・顧客の管理の機能を担います。
<br>今回は架空の料亭の管理を想定していますが、今後各レストランの形態に合わせてカスタマイズできるように拡張するつもりです。
<br>
<br>

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

# メンバーのグレード(権限)について
メンバーにはそれぞれグレードがつきます。<br>登録時はグレードがついておらず、ログインもできません。Grade3のメンバーにグレードを設定されて初めて利用できるようになります。
<br>グレードは3段階あり、権限が大きい順からgrade3→grade2→grade1です。
<br>grade3は、全員のグレード設定と退社処理・編集・閲覧ができます。
<br>grade2は、編集・閲覧ができます。
<br>grade1は、閲覧ができます。
<br>
<br>

# 仕様・使い方

## ①ヘッダー
左上にヘッダーが常に表示されています。Menuと時計の2項目です。
<br>

<div><img src="https://gyazo.com/ea2616373be30b228c15ece044b6c8e2/raw" width="220px" align="left">Menuをホバーすると4項目が出てきます。全てそれぞれの機能へのリンクになっています。<br clear="all"></div>
 <br>
 <br>
<div><img src="https://gyazo.com/63b03bb14d63834b27168d2dfa055f2c/raw" width="500px" align="left">時計をホバーすると2項目が出てきます。メンバー自身の名前とログアウトのリンクです。<br clear="all"></div>
<br>
 <br>

## ②予約一覧
予約が日毎に時間と部屋のチャート表示されます。root画面はここに設定しています。
<br>

<div><img src="https://gyazo.com/5649b418db59c90cc17689082f671006/raw" width="350px" align="left">右上で日付指定できます。日付絶対指定と今表示されている日からの相対指定ができます。<br>予約は削除してもデータベース上は削除されずに、下に一覧表示されます。<br>チャート上の予約にホバーすると、詳細と会計へのリンクが表示されます。<br clear="all"></div>
 <br>
 <br>
<div><img src="https://gyazo.com/f1a510dc49ef7aa2c6f3e7ea595868ce/raw" width="350px" align="left">チャート内の予約はドラッグ&ドロップして部屋や時間を変更できます。UI上で変更すればAjaxでデータベースも変更されます。<br>予約が重ならないように<a href="https://github.com/annaPanda8170/ryotei/blob/readme/app/models/reservation.rb">バリデーションを細かく自作</a>していて、さらにUI上もこのバリデーションと一致するようにドラッグ&ドロップの許可不許可を振り分けています。不許可であると元の場所に戻ります。<br clear="all"></div>
<br>
<br>

## ③予約詳細・登録・編集
詳細・登録・編集機能はありますが、[show・new・editアクションはありません](https://github.com/annaPanda8170/ryotei/blob/readme/app/controllers/reservations_controller.rb)。<br>全てをindex画面で受け付け、[Ajaxを大量に使用](https://github.com/annaPanda8170/ryotei/blob/readme/app/assets/javascripts/reservations.js)しています。
<br>

<div><img src="https://gyazo.com/6c2b2f34350bffc5affb1ec50069613f/raw" width="350px" align="left">3機能全て下にスライドウインドウが現れ、ここで利用します。このような仕様にした理由は、一覧を見ながらこれらの機能を使いたいと思ったからです。<br>スライドウインドウの下に隠れた部分が見えないので、スライドウインドウが現れたときのみ下の画面のmargin-bottomをスライドウインドウの高さ分加えるような細かいこともしています。<br clear="all"></div>
<br>
<br>

## ④会計
予約からリンクで移ります。会計できるのは当日のみで、過去は会計が終わっていれば記録を見ることができます。
<br>

<div><img src="https://gyazo.com/5649b418db59c90cc17689082f671006/raw" width="350px" align="left">当日の予約一覧のチャート内のの各席には会計の状態が表示されています。未会計であればホバーした時のみ会計へのリンクが表示され、会計中であれば赤丸でリンクが表示され、会計済であれば席全体の色が濃く変わります。<br clear="all"></div>
 <br>
 <br>
<div><img src="https://gyazo.com/4d67a50beabd87665b1181ed2725dcdd/raw" width="350px" align="left">予約段階で部屋と料理は確定しているので、ドリンクのみ加えます。一旦保存することもそのまま会計することもできます。<br>会計はクレジットか現金かを選び、現金であれば釣りも計算します。このアプリは通販サイトではなく実店舗での利用を想定しているので、クレジットの決済機能はつけていません。<br>ドリンクはこの会計用のテーブルと別テーブルで編集ができないので、<a href="https://github.com/annaPanda8170/ryotei/blob/readme/app/assets/javascripts/sales.js">JSファイル</a>で、編集時はデータを引き出しフォームに入れ込んで元々登録されていたドリンクは消去する処理をしています。<br clear="all"></div>
<br>
<br>

## ⑤ドリンク
ドリンク名と価格とメモが登録でき、そのまま会計で利用できます。
<br>

<div><img src="https://gyazo.com/e7ed9c64037fee7b00fecbc9f77a4754/raw" width="350px" align="left">一覧表示は、カテゴリー絞り込みができ、ページネーションされています。この2機能を両立させるために、Gem等は使っておらず<a href="https://github.com/annaPanda8170/ryotei/blob/master/app/assets/javascripts/drinks.js">このJSファイル</a>で自作しています。<br>ドリンク情報をまとめてcsvファイルでダウンロードできます。客用ドリンクメニュー作成等に利用できます。<br clear="all"></div>
 <br>
 <br>

## ⑥メンバー
基本的にはメンバーを一覧できるだけで、Grade3の場合のみグレード設定ができます。
<br>

<div><img src="https://gyazo.com/058fa4ed919c7a522304d765f44142d2/raw" width="350px" align="left">Grade3でログインした場合でグレード未登録のメンバーがいる場合、上に赤く警告が出され、グレード未登録のメンバーのみの一覧のリンクが表示されます。<br>編集を押すとグレードの変更ができます。<br clear="all"></div>
 <br>
 <br>

## ⑥クライアント
クライアントを一覧できます。
<br>

<div><img src="https://gyazo.com/ca7435aa14e30aa1c65d5c6fc0e62cbc/raw" width="350px" align="left">予約歴を新しい順に、未来のものは赤、過去のものは黒で表示します。<br clear="all"></div>
 <br>
 <br>

# 今後の拡張予定
- 営業時間の設定機能
- 一席の時間設定機能
- 部屋や席の設定機能
- シフト管理機能
