#!/usr/bin/python3
# coding: utf-8

'''
:mod:`sudoku_solver` module : module that manages the resolution of a sudoku

:author: `LOMBART Thomas - VASILEV Martin`

:date: December 2016
'''

import sudoku_grid
import os
import time
import random

# Global variable for simplify_grid
sols = list()

# Global variable for solve_sudoku
tree = list()

# Unique identifier for solve_grid
var = 0


def clear():
    """
    Clears the console
    """
    os.system('cls' if os.name == 'nt' else 'clear')


def is_solved(grid):
    '''
    Tells whether a grid is solved or not

    :param grid: a sudoku grid
    :type grid: grid
    :return: whether the grid is solved or not
    :rtype: bool
    :UC: grid is a valid sudoku grid
    :Examples:

    >>> grid = sudoku_easy
    >>> is_solved(sudoku_grid.create(grid))
    False
    >>> grid = sudoku_solved
    >>> is_solved(sudoku_grid.create(grid))
    True
    '''
    s = set(str(i) for i in range(1, 10))

    for i in range(9):

        square = sudoku_grid.get_square(grid, i)
        row = sudoku_grid.get_line(grid, i)
        col = sudoku_grid.get_column(grid, i)

        # If one square or one line or one column doesn't contain numbers from
        # 1 to 9 then the grid is not solved
        if not(set(square) == set(row) == set(col) == s):
            return False

    # Passed all the tests
    return True


def is_solvable(grid):
    '''
    Says whether the grid is solvable or not

    :param grid: a sudoku grid
    :type grid: grid
    :return: True if grid is solvable, False otherwise
    :rtype: boolean
    :UC: grid is a valid sudoku grid
    :Examples:

    >>> grid = sudoku_grid.create(sudoku_easy)
    >>> is_solvable(grid)
    True
    >>> sudoku_grid.set_hypothetic(grid, 0, 2, set())
    >>> is_solvable(grid)
    False
    '''
    for i in range(9):
        for j in range(9):

            # We get hypothetic values for one cell whose coordinates are [i,j]
            cell_hypothetic = sudoku_grid.get_hypothetic(grid, i, j)

            # If one cell his empty and has no hypothetic cells, then the
            # grid is not solvable
            if cell_hypothetic == set() and sudoku_grid.is_empty(grid, i, j):
                return False

    # Passed all the tests
    return True


def most_constraint(grid):
    """
    Returns the most constraint cell of the sudoku grid

    :param grid: a sudoku grid
    :type grid: grid
    :return: coordinates of the most constraint cell
    :rtype: tuple
    :UC: grid is a valid sudoku grid
    :Examples:

    >>> grid = sudoku_grid.create(sudoku_easy)
    >>> sudoku_grid.assign_hypothetic_values(grid)
    >>> x,y = most_constraint(grid)
    >>> sudoku_grid.get_hypothetic(grid,x,y)
    {'2'}
    """
    x, y, number_of_hypothetic = 0, 0, 9

    # Iterate through the whole grid
    for i in range(9):
        for j in range(9):

            cell_hypothetic = sudoku_grid.get_hypothetic(grid, i, j)

            if len(cell_hypothetic) > 0 and len(cell_hypothetic) <= number_of_hypothetic:
                x, y, number_of_hypothetic = i, j, len(cell_hypothetic)

            if len(cell_hypothetic) == 1:
                return x, y

    return (x, y)


def grid_to_string(grid):
    '''
    Converts a sudoku grid to a string containing all values of the current sudoku grid

    :param grid: a sudoku grid
    :type grid: grid
    :return: The string corresponding to the sudoku grid
    :rtype: str
    :UC: grid is a valid sudoku grid
    :Examples:

    >>> grid = sudoku_grid.create(sudoku_easy)
    >>> grid_to_string(grid)
    '490001007000045030382600050003070401800902005907030600030006529020850000500700013'
    '''
    return ''.join(str(sudoku_grid.get_value(grid, i, j)) for i in range(9) for j in range(9))


def simplify_grid(grid):
    '''
    Simplifies the grid to the maximum possible

    :param grid: a sudoku grid
    :type grid: grid
    :returns: the simplified grid
    :rtype: grid
    :UC: grid is a valid sudoku grid
    '''
    grid_str_next = grid_to_string(grid)
    grid_str = grid_str_next
    global sols
    sols = list()
    # Call solve_grid to get all solutions in the sols variable
    solve_grid(grid, normal_mode=False)
    invalid_grid = len(sols) > 1

    while len(sols) == 1:
        # Initialize counter
        sols = list()

        # Choose the coordinates of a random non-empty cell
        i, j = random.randint(0, 8), random.randint(0, 8)
        while sudoku_grid.is_empty(grid, i, j):
            i, j = random.randint(0, 8), random.randint(0, 8)

        # Create the temporary grid, becasue the grid in parameter is modified
        grid_str = grid_str_next
        grid_temp = sudoku_grid.create(grid_str)

        # Modify the temporary grid
        sudoku_grid.set_value(grid_temp, i, j, '0')
        sudoku_grid.set_hypothetic(grid_temp, i, j, set(str(i) for i in range(1, 10)))

        # Create next state grid
        grid_str_next = grid_to_string(grid_temp)

        # We check if the grid is solvable
        solve_grid(grid_temp, talkative=False, normal_mode=False)


    if invalid_grid:
        return "invalid"
        sols = list()
    else:
        sols = list()
        return sudoku_grid.create(grid_str)


def create_dot_file(tree_list):
    '''
    Creates the dot file for the sudoku tree image and draws it

    :param tree_list: The tree used to build the .dot file
    :type tree_list: list
    '''
    # Open the file 'arbre.dot' in write mod in the current working directory
    stream = open('arbre.dot', 'w')

    stream.write('digraph G {\n    bgcolor="#FFFF00";\n    node[style=filled];\n')
    stream.write('    SUDO[shape=hexagon, fillcolor="#FF0000"];\n')

    for leaf in tree_list:

        id = leaf['value']
        parent = leaf['parent']
        solved = leaf['solved']
        real = leaf['value_b']

        if solved:

            stream.write('    "' + id + '"[shape=hexagon, fillcolor="#00FF00", label="' + real + '"];\n')
            stream.write('    "{:s}" -> "{:s}"\n'.format(parent, id))

        else:

            stream.write('    "' + id + '"[label="' + real + '"];\n')
            stream.write('    "{:s}" -> "{:s}"\n'.format(parent, id))

    stream.write('    }')

    stream.close()

    global tree
    tree = []

    # Execute the command system that will produce the .dot file
    os.system('dot -Tpng -o tree.png {:s}'.format('arbre.dot'))


def solve_grid(grid, talkative=False, normal_mode=True, last_value='SUDO'):
    """
    Solves the sudoku grid

    :param grid: a sudoku grid
    :type grid: grid
    :param talkative: Shows in the console how the grid is solved
    :type talkative: bool
    :param normal_mode: If True, only get the first solution otherwise, we get all solutions
    :type normal_mode: bool
    :param last_value:
    :type last_value: str
    :UC: grid is a valid sudoku grid
    :Examples:

    >>> grid = sudoku_grid.create(sudoku_easy)
    """
    if talkative:
        clear()
    if not is_solvable(grid):
        if normal_mode:
            return False
    elif is_solved(grid):
        if talkative:
            sudoku_grid.print_grid(grid)
        if normal_mode:
            return grid
        else:
            global sols
            sols.append(grid)
    else:
        # We get the most_constraint cell
        x, y = most_constraint(grid)
        # We save the grid as a string and get all hypothetic values for
        # this most constraint cell
        grid_str = grid_to_string(grid)
        hypo_values = list(sudoku_grid.get_hypothetic(grid, x, y))

        # iterative variables
        val = 0
        solved = False
        N = len(hypo_values)

        # for each hypothetic value
        while not solved and val < N:
            # We create a new grid that represents a branch
            grid_temp = sudoku_grid.create(grid_str)
            if talkative:
                sudoku_grid.print_grid(grid)
                time.sleep(0.05)
                clear()
            # We set val as the cell's value and no hypothetic values
            sudoku_grid.set_value(grid_temp, x, y, hypo_values[val])
            sudoku_grid.set_hypothetic(grid_temp, x, y, set())
            sudoku_grid.assign_hypothetic_values(grid_temp)
            # Create the new element
            global var
            value = "('{:s}', {:d}, {:d}){:d}".format(hypo_values[val], x, y, var)
            value_box = "('{:s}', {:d}, {:d})".format(hypo_values[val], x, y)
            el = {'parent': last_value, 'value': value, 'solved': is_solved(grid_temp), 'value_b': value_box}
            global tree
            tree = tree + [el]
            # We try to solve the grid for this branch
            solved = solve_grid(grid_temp, talkative=talkative, normal_mode=normal_mode, last_value = value)
            var += 1
            val += 1

        # If loop stops
        if normal_mode:
            return solved


def solve_all_grids(path):
    """
    Program that solves all grids given in the database file

    :param path: The path to solve_grid
    :type path: str
    :UC: None
    """
    with open(path, "r") as f:
        sudoku = f.readline().split(':')[1].strip()
        grid = sudoku_grid.create(sudoku)
        while sudoku != '':
            grid_solved = solve_grid(grid)
            sudoku = f.readline().split(':')[1].strip()
            grid = sudoku_grid.create(sudoku)

# These following grids are used for the doctests
sudoku_easy = '490001007000045030382600050003070401800902005907030600030006529020850000500700013'
sudoku_hard = '050008460004000038000030107000920003020000050700086000208090000460000900015700080'
sudoku_17 = '000000010400000000020000000000050407008000300001090000300400200050100000000806000'
sudoku_mult = '906070403000400200070023010500000100040208060003000005030700050007005000405010708'
sudoku_solved = '123456789456789123789123456312645978645978312978312645231564897564897231897231564'

sud_ex1 = '000204000050708620273659418800306005009105300500907002018402950060501080000803000'
sud_ex2 = '000500420700100000300000000000038000040000050000070000150600000000000803000000002'

if __name__ == '__main__':
    import doctest
    doctest.testmod()
