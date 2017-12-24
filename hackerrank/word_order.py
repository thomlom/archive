from collections import Counter, OrderedDict

class OrderedCounter(Counter, OrderedDict):
	pass

words = [input().strip() for i in range(int(input()))]
c = OrderedCounter(words)
print(len(c))
print(*c.values)