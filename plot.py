import matplotlib.pyplot as plt
import numpy as np
import json
from pprint import pprint
def plot_hans():
    with open("data/hans.json") as f:
        hans_raw = json.load(f)
    hans = [0] * 13
    for raw in hans_raw:
        hans[raw] += 100.0 / len(hans_raw)
    y_axis = np.arange(len(hans))[1:]
    x_axis = hans[1:]
    print(x_axis)

    plt.bar(y_axis, x_axis, alpha=0.5)
    plt.ylabel("")
    plt.title("")
    plt.show()

def plot_yakus():
    with open("data/yakus.json") as f:
        raws = json.load(f)
    yakus = {}
    for raw in raws:
        yakuhai = False
        for key in raw.keys():
            yakus[key] = yakus.get(key, 0) + 100.0 / len(raws)
            if not yakuhai and key in ["役牌白","役牌中","役牌発","場風東","場風南","自風北","自風南","自風東","自風西"]:
                if len(raw) == 1:
                    yakus["字牌"] = yakus.get("字牌", 0) + 100.0 / len(raws)
                    yakuhai = True
        if len(raw) == 1:
            concat = str(list(raw.keys()))
            yakus[concat] = yakus.get(concat, 0) + 100.0 / len(raws)
    sorted_yakus = list(yakus.items())
    sorted_yakus.sort(key=lambda x: -x[1])
    # sorted_yakus = [x for x in sorted_yakus if not("[" in x[0]) or x[1] > 1]
    for yaku in sorted_yakus:
        print(f"|{yaku[0]}|{yaku[1]:.2}%|")
plot_hans()
plot_yakus()
# 🀀🀁🀂🀃🀄🀅🀆 🀇🀈🀉🀊🀋🀌🀍🀎🀏 🀙🀚🀛🀜🀝🀞🀟🀠🀡 🀐🀑🀒🀓🀔🀕🀖🀗🀘
