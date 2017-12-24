nArray, nRotations, nQueries = map(int, input().split(' '))
arr = [int(i) for i in input().split(' ')]

for i in range(nQueries):
	ind = int(input())
	print(arr[(ind-nRotations)%nArray])


