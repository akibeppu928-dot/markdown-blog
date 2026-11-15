---
title: CSVの照合で、抜けと重複を見つける(Python例)
date: 2026-11-13
tags: [Python, CSV, 照合]
description: 2つのCSVを品番で突き合わせて、抜けと重複を一覧にする最小のスクリプトです。
---

2つの一覧を見比べる作業は、目で追うと見落としが出ます。ここでは、品番を鍵にして、片方にしかないものと重複を機械的に出す例を書きます。データはすべて架空です。

## 前提のデータ

`orders.csv`(注文の一覧)と `stock.csv`(在庫の一覧)があり、どちらも1列目が品番です。

```csv
code,name,qty
A-001,サンプル箱 小,20
A-002,サンプル箱 中,15
A-002,サンプル箱 中,15
A-003,サンプル袋,40
```

## スクリプト

```python
import csv
from collections import Counter

def read_codes(path):
    with open(path, encoding="utf-8", newline="") as f:
        return [row["code"].strip() for row in csv.DictReader(f)]

orders = read_codes("orders.csv")
stock = read_codes("stock.csv")

dup = [c for c, n in Counter(orders).items() if n > 1]
only_orders = sorted(set(orders) - set(stock))
only_stock = sorted(set(stock) - set(orders))

print("重複:", dup)
print("注文にだけある:", only_orders)
print("在庫にだけある:", only_stock)
```

## 結果の読み方

- 重複は、同じ品番が2回以上出ているもの
- 「注文にだけある」は、在庫の一覧に載っていない品番
- 前後の空白は `strip()` で落としてから比べます

### 気をつけること

全角と半角の違い(`A-001` と `Ａ-００１`)は別の文字になります。実際に使うときは、先に表記をそろえる処理を足します。
