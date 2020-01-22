import argparse
import os
import time
import xlrd
import csv

def main():
    parser = argparse.ArgumentParser(description='Convert .xls or .xlsx files to .csv')
    parser.add_argument("file", help="The folder containaing all Excel files to convert")
    parser.add_argument("-d", "--destination", help="The destination folder of your .csv files")
    parser.add_argument("-v", "--verbose", help="increase output verbosity", action="store_true")
    args = parser.parse_args()

    if args.file:
        path_to_excel_folder = args.file

    # Change path to work in the excel directory, if not we would get a FileNotFoundError
    os.chdir(path_to_excel_folder)

    # Process all excel files
    all_excel_files = [file for file in os.listdir('.') if file.endswith(".xls") or file.endswith(".xlsx")]
    for excel_file in all_excel_files:
        try:
            (excel_filename, excel_extension) = os.path.splitext(excel_file)
            workbook = xlrd.open_workbook(excel_file)
            all_sheets = [workbook.sheet_by_index(nsheet) for nsheet in range(workbook.nsheets)]
            for sheet in all_sheets:
                filename = "{}-sheet-{}.csv".format(excel_filename, sheet.name)
                if args.destination:
                    try:
                        os.makedirs(args.destination)
                    except:
                        pass # means that folder already exists
                    filename = os.path.join(args.destination, filename)
                if args.verbose:
                    start = time.time()
                    print("Creating {}...".format(filename))
                csv_file = open(filename, 'w', newline='')
                writer = csv.writer(csv_file)
                for nrow in range(sheet.nrows):
                    writer.writerow(sheet.row_values(nrow))
                if args.verbose:
                    end = time.time()
                    print("Done in {}s!".format(end - start))
                csv_file.close()
        except:
            if args.verbose:
                print("Cannot process {}".format(excel_file))
            pass

# This script might be imported in another one so we don't want him to be executed when imported
if __name__ == '__main__':
    main()
