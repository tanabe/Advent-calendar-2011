# JavaScript Advent Calendar 2011 (フレームワークコース) 11 日目
---

## Namespace と brook を使ったサンプルアプリケーション

### はじめに

11 日目担当の tanabe です。本日は Namespace と brook を簡単に紹介しようと思います。
基本的にコードを読んでいただき「へー、こんな風に書くのね」と、なんとなくわかっていただくのが目的です。

### Namespace とは

Namespace は名前の通り JavaScript にネームスペースを提供するライブラリです。
依存関係がわかりやすく、ネームスペースで公開されているメソッドが一目瞭然な所が魅力的だと私は思います。

### brook とは

promise という概念で非同期処理をシーケンシャルに記述できることが特徴の JavaScript フレームワークです。
他にも様々な機能があるのですが、今回は「channel」という、オブザーバパターンを提供する機能を使ってみました。

### 各ライブラリのリポジトリ

Namespace と brook は GitHub 上で開発されています。
興味を持たれた方は watch や fork をしてみてください。

* [Namepsace](https://github.com/hirokidaichi/namespace-js)
* [brook](https://github.com/hirokidaichi/brook)

### サンプル

http://tanabe.github.com/Advent-calnedar-2011/
※最新版の Chrome などモダンなブラウザでお試しください。

brook が Namespace に依存しているので、行頭でこのような宣言が行われます。

    Namespace('com.kaihatsubu.sample')
    .use('brook *')
    .use('brook.channel *')
    .use('brook.model *')
    .use('brook.util *')

use は、Perl の use や ActionScript の import と同じ意味を持ちます。
今回はアスタリスクを使って、そのパッケージのすべてのモジュールを利用できるようにしていますが、
use('some.package doSomething') として、依存しているモジュールを個別に指定することも出来ます。

