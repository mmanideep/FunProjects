using System;
using System.Collections.Generic;

namespace SudokuSolverBackTracking
{
    class Program
    {
        static void Change(Grid mat)
        {
            mat.matrix[0][0].CurrentVal = 100;
        }

        static void Main(string[] args)
        {
            Console.WriteLine("Welcome to sudoku solver!");
            Console.WriteLine("Enter int from 1-9 and 0 for empty cell");
            var matrix = new List<List<int>>();
            for (var i = 0; i < 9; i++)
            {
                var row = new List<int>();
                for (var j = 0; j < 9; j++)
                {
                    
                    Console.WriteLine($"Row: {i} Col: {j}");
                    var item = Convert.ToInt32(Console.ReadLine());
                    row.Add(item);
                }
                matrix.Add(row);
            }

            var sudoku = new Grid(matrix);
            sudoku.PrintCurrentState();
            sudoku.Solve();
            Console.WriteLine("After change");
            sudoku.PrintCurrentState();
        }
    }
}
