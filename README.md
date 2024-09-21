# realtime-chat-system
このプロジェクトではFastAPIを利用して小規模なリアルタイムチャットの仕組みを作成します。

## インストール

Python環境を未構築の方は[こちら](https://www.python.jp/install/windows/install.html)を参考に`Python3.12.4`をインストールください。
*※当プロジェクトはWindows環境の*Python3.12.4*でのみ動作を確認済。*


下記で動作に必要なライブラリを一括でインストール可能です。
```bash
# 未インストールであればsetuptoolsをインストール
pip install setuptools
```

```bash
# setup.pyがあるディレクトリで以下を実施
pip install .
```
*※上記でインストールされるライブラリはrequirements.txtを参照してください。*

## 使い方
1. 必要なライブラリをインストールする。
2. ターミナルで`uvicorn main:app --reload`を実行する。
3. http://127.0.0.1:8000/ にアクセスする。
4. ユーザー名の入力や表示、変更および入力したメッセージの表示が正しく行われているかを確認する。
5. 適宜機能の追加やデザインの変更を行う。

##### その他
問題が発生した際にはお手数ですが[*Issues*](https://github.com/t4ned4/create-aituber/issues)を残していただくか、taneda.bp@gmail.comまでご連絡ください。

## 製作者
名前: t4ned4
GitHub: @t4ned4
X: @tane_programing

# ライセンス

このプロジェクトはMITライセンスに基づいて公開されています。詳細については`LICENSE.txt`ファイルをご覧ください。


*このREADMEは2024年9月22日時点での内容です。*
