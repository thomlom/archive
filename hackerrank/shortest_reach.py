EDGE_LENGTH = 6

nQueries = int(input())

for _ in range(nQueries):
    nNodes, nEdges = map(int, input().split())
    links = []
    for i in range(nEdges):
        node1, node2 = map(int, input().split())
        links.append((node1, node2))
    startingNode = int(input())
    
    # CALCULATE DISTANCE HERE
    # http://eddmann.com/posts/depth-first-search-and-breadth-first-search-in-python/
    
    distances = [1, 2, 3, 4]
    
    for i in distances:
        print(i, end= ' ')
    
    print(links)