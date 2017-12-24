cnt = 0
s = input()
subs = input()

for i in range(len(s)):
    if s[i:i+len(subs)] == subs:
        cnt += 1

print(cnt)