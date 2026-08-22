# 月夜のおみくじ

[![Version](https://img.shields.io/badge/version-v0.3.0-2f6f6a.svg)](https://github.com/watanabe3tipapa/omikuji/releases)
[![Issues](https://img.shields.io/github/issues/watanabe3tipapa/omikuji.svg)](https://github.com/watanabe3tipapa/omikuji/issues)
[![GitHub Pages](https://img.shields.io/badge/demo-GitHub%20Pages-1a3937.svg)](https://watanabe3tipapa.github.io/omikuji/)

**今日の流れを、そっとひらく。**

月夜のおみくじは、夜の静けさのなかで、いまの自分に届く小さな言葉を受け取るための静的Webアプリケーションです。墨色、月光、銅色、青緑の細線で構成した「月夜の書院」を舞台に、ひと呼吸してからおみくじを引く体験を提供します。

公開サイト: https://watanabe3tipapa.github.io/omikuji/

---

## 概要

- 静的なHTML/CSS/JavaScriptだけで動作するおみくじアプリケーションです。
- 結果はクライアントサイド（ブラウザ）でランダム抽選され、六種類の運勢とそれぞれの読み解きが表示されます。
- 体験設計として「引く前の一拍」を重視し、三回までの抽選制限や四回目の演出（悪夢→空白→初期化）といった仕様があります。

---

## 主な特徴

- 月夜の書院を想起させる和モダンなビジュアル（墨色の背景、格子、紙面、月光の配色など）
- 六種類の運勢: 大吉・中吉・小吉・吉・末吉・凶（重み付けなしでランダム抽選）
- 結果には「読み解き」「願いごと」「ひととの縁」「開運のしるし」を表示
- 三回までの抽選制限、四回目は七秒の悪夢表示→三秒の黒一色空白→初期状態へ戻る
- 外部ランタイム不要（PyScript等を使わず、純粋なWeb技術で実装）
- アクセシビリティ対応（キーボードフォーカス、`aria-live`、`prefers-reduced-motion` への配慮）
- GitHub Pagesによる公開を想定したワークフローを用意

---

## クイックスタート

前提として、リポジトリに含まれる静的ファイル（index.html 等）をブラウザで開けば動作を試せます。ローカルで簡易サーバーを立てる一例として、README に記載されている手順を以下に示します。

1. リポジトリを取得する

```bash
git clone https://github.com/watanabe3tipapa/omikuji.git
cd omikuji
```

2. index.html をブラウザで直接開く、またはローカルサーバーを起動する

```bash
python3 -m http.server 8000
```

ブラウザで http://localhost:8000 を開くと動作を確認できます。

注意: ここに示した手順は README に記載されているものに基づきます。

---

## 実装の仕組み（概要）

- 抽選はクライアントサイドで完結し、main.js のロジックが Math.random() を使って六種類の運勢から選びます。
- 三回目までは直前の結果と同じ運勢が選ばれないようにし、四回目の試行時には悪夢演出と短い空白画面を経て初期状態へ戻ります。
- ページの再読み込みで初期状態に戻り、結果履歴や個人情報は保存しません。

（詳細な仕様はリポジトリ内のドキュメントを参照してください。）

---

## リポジトリ構成（主要ファイル）

```
omikuji/
├── index.html                  # 画面構造、メタデータ、アクセシブルな操作要素
├── main.css                    # 配色、格子、紙面、アニメーション、レスポンシブ表示
├── main.js                     # 抽選、三回制限、悪夢演出、初期化のロジック
├── README.md                   # 本書
├── CHANGELOG.md                # 更新履歴
├── docs/INTERACTION-SPEC.md    # 抽選・悪夢演出仕様（詳細ドキュメント）
└── .github/workflows/deploy.yml # GitHub Pages へデプロイするワークフロー
```

---

## アクセシビリティとレスポンシブ

- キーボードフォーカスの明示、操作要素への適切なラベル付けを行っています。
- 抽選結果は aria-live="polite" を用いて動的に通知可能な実装です。
- ユーザー環境で prefers-reduced-motion が有効な場合、アニメーションを抑制します。
- モバイル表示に配慮し、狭い画面幅ではレイアウトと文字サイズを調整します。

---

## ドキュメント

- 抽選・悪夢演出などの詳細仕様: docs/INTERACTION-SPEC.md
- 更新履歴: CHANGELOG.md

---

## 公開とデプロイ

- リポジトリの main ブランチから GitHub Actions を使って GitHub Pages へデプロイする構成が用意されています（.github/workflows/deploy.yml）。
- 公開先: https://watanabe3tipapa.github.io/omikuji/

---

## 動作確認（README に記載の手順）

- JavaScript の構文チェック例:

```bash
node --check main.js
```

- ブラウザ上で確認すべき項目（README に記載）:
  - 三回分の抽選が正しく動作するか
  - 四回目の悪夢（7秒）の表示とその後の3秒の空白、初期化が行われるか
  - キーボード操作や狭い画面幅での表示

---

## バージョン履歴（概要）

### v0.3.0 — 月夜のおみくじ

- デザインを「月夜の書院」を軸とする和モダンな体験に刷新
- 旧実装（PyScript）から純粋な JavaScript 実装へ移行
- 六種類の運勢、三回までの抽選上限、四回目の悪夢演出、アクセシビリティ対応、GitHub Pages 自動公開を整備

---

## 連絡先

- リポジトリ: https://github.com/watanabe3tipapa/omikuji
