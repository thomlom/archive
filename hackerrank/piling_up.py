t = int(input())
for _ in range(t):
    n = int(input())
    l = [int(k) for k in input().split()]
    i = 0
    while i < n-1 and l[i] >= l[i+1]:
        i += 1
    while i < n-1 and l[i] <= l[i+1]:
        i += 1
    if i == n-1:
        print("Yes")
    else:
        print("No")