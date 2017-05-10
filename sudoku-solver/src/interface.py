#!/usr/bin/python3
# coding: utf-8

'''
GUI of the sudoku

:author: `LOMBART Thomas - VASILEV Martin`

:date: December 2016
'''

from tkinter import *
from tkinter import messagebox
from tkinter import filedialog
import sudoku_grid
import sudoku_solver

# Global variable that will be used to display some feedback messages below the grid
textVar = ''
orig_grid = ''
grid_state = ''
master = None
remove_color = False


def create_grid(master):
    '''
    Creates the grid of the GUI
    '''
    # Create the entire grid
    big_frame = Frame(master)
    big_frame.configure(background='black')
    # One sudoku box is the child of the big_frame
    sudoku_boxes = [Frame(big_frame) for _ in range(9)]

    for x in range(9):

        for y in range(9):
            # Formula that gets a button
            box = sudoku_boxes[3*(x//3) + (y//3)]

            b = Button(box, width=1, height=1, text='', state=DISABLED)
            # .grid() places the button in one of the sudoku boxes
            b.grid(row=x%3, column=y%3)

    for x in range(9):
        # Place little frames in the big one
        sudoku_boxes[x].grid(row=x//3, column=x%3,padx = 2, pady= 2)
    # Place big frame
    big_frame.grid(row=0, column=0,padx = 5, pady = 5)

def initialize_buttons():
    '''
    Initializes the button global variable to a list containing all the `sudoku cells` (buttons)
    '''
    global master

    sudoku_frame = master.winfo_children()[1]
    sudoku_boxes = sudoku_frame.winfo_children()
    sudoku_cells_temp = [sudoku_box.winfo_children() for sudoku_box in sudoku_boxes]
    sudoku_cells = [item for sublist in sudoku_cells_temp for item in sublist]

    new_sudoku_cells = []

    for x in range(9):
        t = 27*(x//3) + 3*(x%3)
        line = sudoku_cells[t:t+3] + sudoku_cells[t+9:t+12] + sudoku_cells[t+18:t+21]
        new_sudoku_cells += line

    global buttons

    buttons = new_sudoku_cells

def change_button_value(event):
    '''
    Increments the value of a particular sudoku square
    '''
    # Get value of the button
    clicked_btn = event.widget
    text_var = clicked_btn.cget('text')
    try:
        value = int(text_var)
    except:
        value = 0

    next_state = (value + 1)%10
    if next_state == 0:
        clicked_btn.config(text='')
    else:
        clicked_btn.config(text=str(next_state))

    global remove_color

    if remove_color:

        reset_colors()
        remove_color = False

def reset_colors():
    '''
    Resets the original colors for the sudoku grid
    '''
    global buttons

    for button in buttons:
        if button['state'] == NORMAL:
            button.config(background='old lace')
        else:
            button.config(background='ivory')


def update_grid_state():
    '''
    Updates the global variable grid_state
    '''
    global buttons

    current_grid = ''

    # Create the grid as a string
    for x in range(81):
        value = buttons[x]['text']
        if value == '':
            current_grid += '0'
        else:
            current_grid += value

    global grid_state
    grid_state = current_grid

def update_grid(grid):
    '''
    Updates the sudoku grid using the grid parameter
    '''
    #Initialization of the original grid value
    global orig_grid
    orig_grid = grid

    global buttons

    for x in range(9):
        for y in range(9):
            n = x*9 + y
            value = grid[n]
            btn = buttons[n]
            if value == '0':
                btn.config(text='')
                btn.config(state=NORMAL)
                btn.config(background='old lace')
                btn.bind('<Button-1>',change_button_value)
            else:
                btn.config(text=value)
                btn.config(state=DISABLED)
                btn.config(background='ivory')
                btn.unbind('<Button-1>')

    update_grid_state()

def check_solution():
    '''
    Checks if the current_state of the sudoku is solved
    '''
    update_grid_state()

    global grid_state
    # Check whether the sudoku grid is solved or not
    state = sudoku_solver.is_solved(sudoku_solver.sudoku_grid.create(grid_state))

    if state:
        messagebox.showinfo(title='Success!', message='You have mananged to solve the sudoku grid, Good job! :)')
        #Freeze the check solution button
        global textVar
        textVar.set('Congratulations! You solved it :)')
        check_button = master.winfo_children()[2].winfo_children()[1]
        check_button.config(state=DISABLED)
    else:
        messagebox.showinfo(title='Failure...', message='Your solution is incorrect, keep trying ... :/')

def valid_grid(grid):
    '''
    Predicate that answers whether the sudoku grid is valid
    '''
    for s in grid:
        if not s in '0123456789':
            return False
        else:
            return True and len(grid)==81

def open_grid():
    '''
    Opens a grid through a separate file or through player input
    '''
    ans = messagebox.askquestion(title='Open mode', message='Open grid through input?')
    if ans == 'yes':
        toplevel = Toplevel()
        toplevel.wm_title('Open')

        label = Label(toplevel, text='Please enter a valid grid (containing 81 digits) in the input field below :', wraplength=250)
        label.grid(row=0,column=0,padx=5,pady=5)

        entry_frame = Frame(toplevel)

        def validate_grid():
            grid = entry.get()

            if not valid_grid(grid):
                messagebox.showwarning(title='Invalid grid',message='Invalid grid!')
                toplevel.grab_set()
            else:
                toplevel.destroy()
                update_grid(grid)
                textVar.set('Good luck!')

                #Remove the disabled state of check_solution
                check_button = master.winfo_children()[2].winfo_children()[1]
                check_button.config(state=ACTIVE)

        submit = Button(entry_frame, text='Validate', command=validate_grid)
        entry = Entry(entry_frame)

        entry.grid(row=0, column=0)
        submit.grid(row=0, column=1)

        entry_frame.grid(row=1,column=0,padx=5,pady=5)

    else:
        ans = messagebox.askquestion(title='Open mode',message='Open a file containing a valid sudoku grid?')
        if ans == 'yes':
            file = filedialog.askopenfile(parent=master,mode='r',title='Choose a file')
            if file != None:
                grid = file.read()

                if valid_grid(grid):
                    update_grid(grid)
                    textVar.set('Good luck!')

                    #Remove the disabled state of check_solution
                    check_button = master.winfo_children()[2].winfo_children()[1]
                    check_button.config(state=ACTIVE)
                else:
                    messagebox.showwarning(title='Invalid grid',message='Invalid grid')


def save_grid():
    '''
    Saves the current state of the grid in a separate file, that can be opened later to be continued
    '''
    global grid_state
    try:
        assert grid_state != ''
        file_to_save = filedialog.asksaveasfile(mode='w', defaultextension=".txt")
        # Next line prevents user to do something when press 'Cancel' button
        if file_to_save is None:
            return
        update_grid_state()
        file_to_save.write(grid_state)
        messagebox.showinfo(title='Success!', message='Your grid was succesfully saved! :)')
    except AssertionError:
        messagebox.showwarning(title='Error', message='I can\'t save a non-existing grid!')

def reset():
    '''
    Removes all of the player input on the current sudoku_grid
    '''
    global orig_grid
    try:
        update_grid(orig_grid)
    except:
        pass

def solve_sudoku():
    '''
    Handles the Solve menu option
    '''
    global grid_state
    if grid_state!='':
        if sudoku_solver.is_solved(sudoku_grid.create(grid_state)):
            messagebox.showinfo(title='Solved', message='Grid is already solved! :)')
        else:
            def solve():
                global grid_state

                grid = sudoku_grid.create(grid_state)
                solved_grid = sudoku_solver.grid_to_string(sudoku_solver.solve_grid(grid))
                if var.get():
                    sudoku_solver.create_dot_file(sudoku_solver.tree)
                toplevel_big.destroy()
                update_grid(solved_grid)

                global master, textVar, orig_grid

                textVar.set('You\'ll solve it next time ;)')
                # Disable check solution
                master.winfo_children()[2].winfo_children()[1].config(state=DISABLED)

            # Create new dialog window
            toplevel_big = Toplevel()
            toplevel_big.wm_title('Grid solver')

            toplevel = Frame(toplevel_big)
            toplevel.grid(row=0, column=0, padx=5, pady=5)

            label = Label(toplevel, text='Choose whether to draw the `solution tree` or not by checking the radio button and press solve to see the solution', wraplength=200)
            var = IntVar()
            checkbutton = Checkbutton(toplevel, text = 'Draw `solution tree`', variable = var)
            button = Button(toplevel, text='Solve!', command = solve)

            label.grid(row=0, column=0)
            checkbutton.grid(row=1, column=0)
            button.grid(row=2, column=0)

    else:
        messagebox.showwarning(title = 'Error', message='You must open a grid in order to see its solution!')

def simplify_sudoku():
    '''
    Handles the simplify menu option
    '''
    global grid_state
    grid_temp = sudoku_solver.sudoku_grid.create(grid_state)
    if grid_state!= '':
        ans = messagebox.askyesno(title='Simplify grid',message='Simplify grid?')
        if ans:
            simpl_grid = sudoku_solver.grid_to_string(sudoku_solver.simplify_grid(grid_temp))
            update_grid(simpl_grid)

            textVar.set('Good luck!')
            master.winfo_children()[2].winfo_children()[1].config(state=NORMAL)
        else:
            pass
    else:
        messagebox.showwarning(title='Error', message='Invalid grid')

def usage():
    '''
    Manages the Help option in the Help menu, defines the usage of the GUI
    '''
    GUIDE_TEXT = """Welcome to Martin and Thomas' Sudoku game/solver!

    To simply play a game of sudoku:
    - Go to the `File` menu
    - Click Open
    - Follow the instructions
    - Press a square to increment it's number
    - When you think your grid is solved, press the Check solution button!

    Resize a grid:
    - Open the `File` menu
    - Click Resize
    - Follow the instructions

    When playing a game of sudoku, you can choose to:
    - Let the computer solve the grid for you! (And draw the `solution tree`)
    - Simplify a solved grid into a grid with a single unique solution!
    - Save the grid in order to solve it later!

    Solving a grid:
    - Open the `Addons` menu
    - Click Solve
    - Follow the instructions

    Reset a grid:
    - Open the `Addons` menu
    - Click Reset
    - Follow the instructions

    Simplifying a grid:
    - Open the `Addons` menu
    - Click Simplify
    - Follow the instructions

    Checking a grid:
    - Open the `Addons` menu
    - Click Check
    - Follow the instructions

    Thank you for using our program! Have fun!"""

    toplevel = Toplevel()
    toplevel.wm_title('SUDOKU GUIDE/USAGE')

    title_label = Label(toplevel, text='GUIDE')
    title_label.grid(row=0,column=0)
    label = Label(toplevel, text=GUIDE_TEXT, justify='left')
    label.grid(row=1,column=0,pady=5)

def check():
    '''
    Checks the values that the player has input
    '''
    #Check if a grid is loaded
    global grid_state
    if grid_state != '':

        #Update the grid_state in order to take new players inputed values
        update_grid_state()

        #Getting the grid
        global orig_grid
        grid = orig_grid

        #Getting the solved grid
        solved_grid = sudoku_solver.grid_to_string(sudoku_solver.solve_grid(sudoku_grid.create(grid)))

        global buttons

        for i in range(81):
            button = buttons[i]
            text, state = button['text'], button['state']
            if solved_grid[i] == text:
                if state ==NORMAL:
                    button.config(background='green')
            else:
                if state == NORMAL and text !='':
                    button.config(background='red')

        global remove_color
        remove_color = True

    else:
        messagebox.showwarning(title='Error',message='You must open a grid first!')

def resize():
    '''
    Resizes the grid based on player input
    '''

    def resize_cmd():
        '''
        The direct command for the Submit button on the resize toplevel
        '''
        try:
            size = int(var.get())

            global buttons

            for button in buttons:
                button.config(width=size)
                button.config(height=size)

            messagebox.showinfo(title='Succes', message='Grid resized')
            top.destroy()

        except:
            messagebox.showwarning(title='Error', message='Invalid value!')


    top = Toplevel()
    top.wm_title('Resize grid')

    frame = Frame(top)

    label = Label(frame,wraplength=250 ,text='Enter an integer, that will be the width and height of one sudoku cell')

    submit_frame = Frame(top)

    var = IntVar(submit_frame)
    entry = Entry(submit_frame, textvariable=var)

    button = Button(submit_frame, text='Submit', command = resize_cmd)

    entry.grid(row=0, column=0, padx=2, pady=2)
    button.grid(row=0, column=1, padx=0, pady=2)

    label.grid(row=0, column=0,padx=3,pady=3)


    submit_frame.grid(row=1, column=0, padx=3, pady=3)
    frame.grid(row=0, column=0, padx=5, pady=5)

def main():
    '''
    The main function for the Sudoku GUI.

    '''
    root = Tk()
    root.wm_title('Sudoku')

    # Configure the bar menu
    menubar = Menu(root)

    filemenu = Menu(menubar, tearoff=0)
    # Add all sub-options
    filemenu.add_command(label='Open', command=open_grid)
    filemenu.add_command(label='Save', command=save_grid)
    filemenu.add_separator()
    filemenu.add_command(label='Resize', command=resize)
    filemenu.add_command(label='Exit', command = root.destroy)
    # Then add the option
    menubar.add_cascade(label='File',menu=filemenu)

    solvemenu = Menu(menubar, tearoff=0)
    solvemenu.add_command(label='Solve', command=solve_sudoku)
    solvemenu.add_command(label='Reset', command=reset)
    solvemenu.add_command(label='Simplify', command=simplify_sudoku)
    solvemenu.add_separator()
    solvemenu.add_command(label='Check', command=check)
    menubar.add_cascade(label='Addons',menu=solvemenu)

    helpmenu = Menu(menubar, tearoff=0)
    helpmenu.add_command(label='Help', command=usage)
    menubar.add_cascade(label='Help',menu=helpmenu)

    root.config(menu=menubar)

    global master
    master = root

    #Initialize the grid
    create_grid(root)


    #Status bar
    status_frame = Frame(root)

    global textVar
    textVar = StringVar()
    textVar.set('Welcome, for the guide open the Help menu tab!')
    status = Label(status_frame, textvariable=textVar, bd=1, anchor=W, wraplength=200)
    status.grid(row=0,column=0,pady=3,padx=3)

    #Check solution button that we find below the grid
    check_sol_btn = Button(status_frame, text='Check solution',state=DISABLED, command=check_solution)
    check_sol_btn.grid(row=0, column=1, pady=3,padx=3)

    #Pack the status_frame
    status_frame.grid(row=1, column=0)

    initialize_buttons()

    mainloop()

if __name__ == '__main__':
    # No need for the doctests here
    main()
