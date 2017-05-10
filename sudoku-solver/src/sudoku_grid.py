#!/usr/bin/python3
# coding: utf-8

'''
:mod:`sudoku_grid` module : module that manages the grid of a sudoku

:author: `LOMBART Thomas - VASILEV Martin`

:date: December 2016
'''


# CONSTRUCTORS


def create(data):
    """
    Creates a grid based on the data given

    :param data: the raw data that describes the sudoku
    :type data: str
    :return: a grid (list of lists), each cell being a dictionary with a value and hypothetic values
    :rtype: list
    :UC: the data is a string which contain exactly 81 numbers
    """
    try:
        assert len(data) == 81 and isinstance(data, str)
        grid = [[{'value': data[i + j * 9], 'hypothetic': ({str(k) for k in range(1, 10)} if data[i + j * 9] == '0' else set())} for i in range(9)] for j in range(9)]
        assign_hypothetic_values(grid)
        return grid
    except:
        raise AssertionError('The line given is not valid. Please verify that you gave 81 numbers')

# SELECTORS


def get_value(grid, x, y):
    """
    Returns the value of the cell at line x and column y

    :param grid: a sudoku grid
    :type grid: grid
    :param x: x coordinate (line)
    :type x: int
    :param y: y coordinate (column)
    :type y: int
    :return: the value of the grid at the precised coordinates
    :rtype: int
    :UC: 0 <= x < 9 and 0 <= y < 9, grid is a valid sudoku grid
    :Examples:

    >>> grid = create(sudoku)
    >>> get_value(grid, 2, 4)
    '0'
    >>> get_value(grid, 1, 0)
    '4'
    >>> get_value(grid, -2, 4)
    x and y must be integers between 0 and 8
    """
    try:
        assert (x >= 0 and x < 9) and (y >= 0 and y < 9)
        return grid[x][y]['value']
    except AssertionError:
        print("x and y must be integers between 0 and 8")
    except:
        print("An error occurred")


def get_hypothetic(grid, x, y):
    """
    Returns the hypothetic values of the grid at line x and column y

    :param grid: a sudoku grid
    :type grid: grid
    :param x: x coordinate (line)
    :type x: int
    :param y: y coordinate (column)
    :type y: int
    :return: the hypothetic values of the grid at the precised coordinates
    :rtype: set
    :UC: 0 <= x < 9 and 0 <= y < 9, grid is a valid sudoku grid
    :Examples:

    >>> grid = create(sudoku)
    >>> get_hypothetic(grid, 1, 0)
    set()
    >>> get_hypothetic(grid, 0, 0)
    {'6', '5', '9', '7', '8'}
    >>> get_hypothetic(grid, 1, -2)
    x and y must be integers between 0 and 8
    """
    try:
        assert (x >= 0 and x < 9) and (y >= 0 and y < 9)
        return grid[x][y]['hypothetic']
    except AssertionError:
        print("x and y must be integers between 0 and 8")
    except:
        print("An error occurred")


def get_line(grid, n):
    """
    Returns the nth line of the grid

    :param grid: a sudoku grid
    :type grid: grid
    :param n: the number of the line we want to get
    :type n: int
    :return: the values corresponding to the nth line
    :rtype: list
    :UC: 0 <= n < 9, grid is a valid sudoku grid
    :Examples:

    >>> grid = create(sudoku)
    >>> get_line(grid, 4)
    ['0', '0', '8', '0', '0', '0', '3', '0', '0']
    >>> get_line(grid, 8)
    ['0', '0', '0', '8', '0', '6', '0', '0', '0']
    >>> get_line(grid, 9)
    n must be between 0 and 8 included (Remember, we're counting from 0)
    """
    try:
        assert n >= 0 and n < 9
        return [cell['value'] for cell in grid[n]]
    except AssertionError:
        print("n must be between 0 and 8 included (Remember, we're counting from 0)")
    except:
        print("An error occurred")


def get_column(grid, n):
    """
    Returns the nth column of the grid

    :param grid: a sudoku grid
    :type grid: grid
    :param n: the number of the column we want to get
    :type n: int
    :return: the values corresponding to the nth column
    :rtype: list
    :UC: 0 <= n < 9, grid is a valid sudoku grid
    :Examples:

    >>> grid = create(sudoku)
    >>> get_column(grid, 4)
    ['0', '0', '0', '5', '0', '9', '0', '0', '0']
    >>> get_column(grid, 2)
    ['0', '0', '0', '0', '8', '1', '0', '0', '0']
    >>> get_column(grid, 45)
    n must be between 0 and 8 included (Remember, we're counting from 0)
    """
    try:
        assert n >= 0 and n < 9
        return [line[n]['value'] for line in grid]
    except AssertionError:
        print("n must be between 0 and 8 included (Remember, we're counting from 0)")
    except:
        print("An error occurred")


def get_square(grid, n):
    """
    Returns the nth square of the grid

    :param grid: a sudoku grid
    :type grid: grid
    :param n: the number of the square we want to get
    :type n: int
    :return: the list of values that corresponds to the nth square
    :rtype: list
    :UC: 0 <= n < 9, grid is a valid sudoku grid
    :Examples:

    >>> grid = create(sudoku)
    >>> get_square(grid, 2)
    ['0', '1', '0', '0', '0', '0', '0', '0', '0']
    >>> get_square(grid, 7)
    ['4', '0', '0', '1', '0', '0', '8', '0', '6']
    """
    try:
        assert n >= 0 and n < 9
        row_add, col_add = ((n) // 3) * 3, ((n) % 3) * 3
        return [grid[i + row_add][j + col_add]['value'] for i in range(3) for j in range(3)]
    except AssertionError:
        print("n must be between 0 and 8 included (Remember, we're counting from 0)")
    except:
        print("An error occurred")

# PREDICATE


def is_empty(grid, x, y):
    """
    Returns whether a cell is empty or not

    :param grid: a sudoku grid
    :type grid: grid
    :param x: x coordinate (line)
    :type x: int
    :param y: y coordinate (column)
    :type y: int
    :return: if a cell is empty
    :rtype: bool
    :UC: 0 <= x < 9 and 0 <= y < 9, grid is a valid sudoku grid
    :Examples:

    >>> grid = create(sudoku)
    >>> is_empty(grid, 0, 6)
    True
    >>> is_empty(grid, 2, 1)
    False
    """
    try:
        return get_value(grid, x, y) == '0'
    except:
        print("An error occured")

# OTHER FUNCTIONS


def assign_hypothetic_values(grid):
    '''
    Assigns the hypothetical values for each cell of the sudoku grid

    :param grid: the sudoku grid that we want to modify
    :type grid: grid
    :UC: grid is a valid sudoku grid
    '''
    for x in range(9):
        for y in range(9):
            if is_empty(grid, x, y):
                # Get the hypothetic values for the cell at line x and column y
                cell_hypothetic = get_hypothetic(grid, x, y)

                square = get_square(grid, 3 * (x // 3) + (y // 3))
                row = get_line(grid, x)
                col = get_column(grid, y)

                # Add all the lists of values and turn them into a set to remove possible
                # duplicates
                s = set(square + row + col)

                # .discard() removes val from set cell_hypothetic if present
                for value in s:
                    cell_hypothetic.discard(value)
                set_hypothetic(grid, x, y, cell_hypothetic)


def set_value(grid, x, y, value):
    """
    Sets a new value in the grid at line x and column y

    :param grid: a sudoku grid
    :type grid: grid
    :param x: x coordinate (line)
    :type x: int
    :param y: y coordinate (column)
    :type y: int
    :param value: the new value we want to set at the coordinates (x, y)
    :type value: str
    :UC: 0 <= x < 9 and 0 <= y < 9, value is a string, grid is a valid sudoku grid
    """
    try:
        assert (x >= 0 and x < 9) and (y >= 0 and y < 9) and isinstance(value, str)
        grid[x][y]['value'] = value
    except AssertionError:
        print("x, y and value must integers between 0 and 8.")
    except:
        print("An error occured")


def set_hypothetic(grid, x, y, hypothetic):
    """
    Sets a new set of hypothetic values in the grid at line x and column y

    :param grid: a sudoku grid
    :type grid: grid
    :param x: x coordinate (line)
    :type x: int
    :param y: y coordinate (column)
    :type y: int
    :param hypothetic: the new hypothetic values we want to set at the coordinates (x, y)
    :type hypothetic: set
    :UC: 0 <= x < 9 and 0 <= y < 9, hypothetic is a set of values, grid is a valid sudoku grid
    """
    try:
        assert (x >= 0 and x < 9) and (y >= 0 and y < 9) and isinstance(hypothetic, set)
        grid[x][y]['hypothetic'] = hypothetic
    except AssertionError:
        print("x, y must be integers between 0 and 8 and the hypothetic values must be in a set.")
    except:
        print("An error occured")


def print_grid(grid):
    """
    Prints the grid in the terminal

    :param grid: a sudoku grid
    :type grid: grid
    :UC: grid is a valid sudoku grid
    """
    separator = '+' + '-------+' * 3
    print(separator)
    for i in range(1, 10):
        print('|', end=' ')
        for j in range(1, 10):
            if grid[i - 1][j - 1]['value'] == '0':
                print('.', end=' ')
            else:
                print(grid[i - 1][j - 1]['value'], end=' ')
            if j % 3 == 0:
                print('|', end=' ')
        print()
        if i % 3 == 0:
            print(separator)

sudoku = '000000010400000000020000000000050407008000300001090000300400200050100000000806000'

if __name__ == '__main__':
    import doctest
    doctest.testmod()
