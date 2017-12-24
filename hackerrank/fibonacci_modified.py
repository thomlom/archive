def fib(u0, u1, n):
    if n == 0:
        return u0
    elif n == 1:
        return u1
    else:
        return (fib(u0, u1, n-1))**2 + fib(u0, u1, n-2)

u0, u1, n = map(int, input().split())
print(fib(u0, u1, n-1))