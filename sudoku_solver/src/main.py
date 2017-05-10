#!/usr/bin/python3
# coding: utf-8

'''
Main program

:author: `LOMBART Thomas - VASILEV Martin`

:date: December 2016
'''

import argparse
import sudoku_grid
import sudoku_solver

parser = argparse.ArgumentParser()
parser.add_argument("sudoku_grid", help="The sudoku's grid represented by a string containing exactly 81 numbers")
parser.add_argument("-t", "--talkative", action="store_true", help="Tells at each step what the program is doing")
parser.add_argument("-i", "--image", action="store_true", help="Produce a tree image that contains the solutions")
parser.add_argument("-s", "--simplify", action="store_true", help="Simplify the grid")
parser.add_argument("-a", "--all", action="store_true", help="Get all solutions of the sudoku grid")

args = parser.parse_args()

if __name__ == '__main__':
    try:
        grid = sudoku_grid.create(args.sudoku_grid)
        if args.image:
            sudoku_solver.tree = []
            sudoku_solver.solve_grid(grid, normal_mode=False)
            sudoku_solver.create_dot_file(sudoku_solver.tree)
        if args.talkative:
            sudoku_solver.solve_grid(grid, talkative=True)
        elif args.all:
            sudoku_solver.solve_grid(grid, normal_mode=False)
            for i in range(len(sudoku_solver.sols)):
                print("Solution {:d}".format(i+1), end="\n")
                sudoku_grid.print_grid(sudoku_solver.sols[i])
        elif args.simplify:
             simplified_grid = sudoku_solver.simplify_grid(grid)
             if simplified_grid == 'invalid':
                 print("This grid can't be simplified")
             else:
                 sudoku_grid.print_grid(simplified_grid)
        else:
            solved_grid = sudoku_solver.solve_grid(grid)
            print("I've reached the solution!")
            sudoku_grid.print_grid(solved_grid)
    except:
        parser.print_help()
