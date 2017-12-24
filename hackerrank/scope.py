class Difference:
    def __init__(self, a):
        self.__elements = a
        self.maximumDifference = 0
    
    def computeDifference(self):
        for i in range(len(self.__elements)):
            for j in range(i+1, len(self.__elements)):
                maximum = abs(self.__elements[i] - self.__elements[j])
                if maximum > self.maximumDifference:
                    self.maximumDifference = maximum

_ = input()
a = [int(e) for e in input().split(' ')]

d = Difference(a)
d.computeDifference()

print(d.maximumDifference)