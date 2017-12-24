v = int(input())
n = int(input())
arr = [int(i) for i in input().split(' ')]

for i in range(n):
    if v == arr[i]:
        print(i)
        break