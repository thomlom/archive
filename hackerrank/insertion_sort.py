size = int(input())
arr = [int(i) for i in input().split()]
numberOfShift = 0
for i in range(1, len(arr)):
    j = i 
    while j > 0 and arr[j] < arr[j-1]:
        arr[j], arr[j-1] = arr[j-1], arr[j]
        numberOfShift += 1
        j -= 1 

print(numberOfShift)
            
    