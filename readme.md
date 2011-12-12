# JavaScript Advent Calendar 2011 (フレームワークコース) 11 日目
---

## Namespace と brook を使ったサンプルアプリケーション

### はじめに

[JavaScript Advent Calendar 2011 (フレームワークコース)](http://atnd.org/events/21977) 11 日目担当の tanabe です。本日は Namespace と brook を簡単に紹介しようと思います。  
サンプルのコードを読んでいただき「へー、こんな風に書くのね」と、なんとなくわかっていただくのが目的です。  

### Namespace とは

Namespace は名前の通り JavaScript にネームスペースを提供するライブラリです。  
依存関係とそのネームスペースで公開されているメソッドが一目瞭然になるところが魅力的だと私は思います。

### brook とは

promise という概念で非同期処理をシーケンシャルに記述できることが特徴の JavaScript フレームワークです。  
他にも様々な機能があるのですが、今回は「channel」という、オブザーバパターンを提供する機能を使ってみました。  

### 各ライブラリのリポジトリ

Namespace と brook は GitHub 上で開発されています。  
興味を持たれた方は watch や fork をしてみてください。  

* [Namepsace](https://github.com/hirokidaichi/namespace-js)
* [brook](https://github.com/hirokidaichi/brook)

### サンプル

[サンプル](http://tanabe.github.com/Advent-calnedar-2011/)

※最新版の Chrome などでお試しください。

左上の move ボタンを押すと四角いグラフィックが順番に動いてから消えると思います。  
その中の「順番に動いてから消える」という部分に brook を使っています。  

### ざっくりコード解説

では、ざっくりとコードを解説していきます。

#### brook の前に Namepace から

brook が Namespace に依存しているので、行頭でこのような宣言が行われます。

    Namespace('com.kaihatsubu.sample')
    .use('brook *')
    .use('brook.channel *')
    .use('brook.model *')
    .use('brook.util *')

use は、Perl の use や ActionScript の import と同じ意味を持ちます。  
今回はアスタリスクを使って、すべてのモジュールを利用できるようにしていますが、  
use('some.package doSomething') として、依存しているモジュールを個別に指定することも出来ます。  

ns.provide で別のネームスペースに公開するモジュールを定義します。

    ns.provide({
      Sample: Sample
    });

Namespace を apply することでエントリポイントになります。

    Namespace('com.kaihatsubu.sample.main').use('com.kaihatsubu.sample *').apply(function(ns) {
      var sample = new ns.Sample();
      sample.initialize();
    });

#### 四角が移動完了したことを通知する

四角が移動した際に、

    ns.sendChannel('onFinishRectMove').run(_self);

が呼び出されています。このコードは channel promise にメッセージを送信させています。  
ActionScript で書くと dispatcher.dispatchEvent(event); に近いです。  

#### 四角が移動完了した通知を受け取る

上記で送信されたメッセージをどのように受け取るかというと

    ns.observeChannel('onFinishRectMove',
      ns.promise(function(next, value) {
        if (index < _self.rects.length - 1) {
          index++; 
          moveRect();
        }
        next(value);
      })
      .bind(ns.promise(function(next, value) {
        value.hide();
      }))
    );

このようにして受け取ります。ns.observeChannel が受け取る側のメソッドです。object.addEventListener() に近いです。

上のコードでは promise が登場しています。  
冒頭で「promise という概念で非同期処理をシーケンシャルに記述できる」と書きました。  
あまりいい例ではないかもしれませんが、ここでは「四角が動き終わったあとに消える」という一連動作をシーケンシャルに記述しています。  

promise では bind() を使っていくらでも処理を数珠つなぎのように記述することができます。

    hoge
    .bind(foo)
    .bind(bar)
    .bind(baz)
    .run();

### いきなりまとめ

以上が、大規模 JavaScript アプリケーション開発をサポートする Namespace と brook の紹介でした。  
brook は若干敷居が高いかもしれませんが、Namespace は明日にでも使えるライブラリだと思います。  
JavaScript 開発でネームスペースの管理をしていない方はこれを機に導入してみてはいかがでしょうか。  
