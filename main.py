from random import randint
a = randint(1, 10)
if a == 10:
    i = "大吉"
    pyscript.write("result",i)
if a < 10 and a >7:
    i = "忠吉"
    pyscript.write("result",i)
if a < 8 and a > 1:
    i = "昇吉"
    pyscript.write("result",i)
if a == 1:
    i = "凶"
    pyscript.write("result",i)
