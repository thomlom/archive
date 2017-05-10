-------------------------------------------
Program using sudoku_grid and sudoku_solver
-------------------------------------------

The program below can be used to many purposes

* Solve a grid and see or not its resolution

* Try to simplify a grid

* Produce an image containing the tree that shows all the possible solutions of a sudokus

* See the resolution step by step

Usage
-----
::

  usage: main.py [-h] [-t] [-i] [-s] [-a] sudoku_grid

  positional arguments:
    sudoku_grid      The sudoku's grid represented by a string containing
                     exactly 81 numbers

  optional arguments:
    -h, --help       show this help message and exit
    -t, --talkative  Tells at each step what the program is doing
    -i, --image      Produce a tree image that contains the solutions
    -s, --simplify   Simplify the grid
    -a, --all        Get all solutions of the sudoku grid

Usage examples:
---------------
::

  python3 main.py 490001007000045030382600050003070401800902005907030600030006529020850000500700013
  python3 main.py -s 490001007000045030382600050003070401800902005907030600030006529020850000500700013
  python3 main.py -t 490001007000045030382600050003070401800902005907030600030006529020850000500700013
  python3 main.py -i 490001007000045030382600050003070401800902005907030600030006529020850000500700013
  python3 interface.py


Source code of the `main.py` file:
----------------------------------

.. literalinclude:: ../src/main.py
   :language: python
   :linenos:
