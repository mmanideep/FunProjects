using System;
using System.Collections.Generic;
using System.Text;

namespace SudokuSolverBackTracking
{
    public class Grid
    {
        public List<List<Cell>> matrix;

        public Grid(List<List<int>> inputSudoku)
        {
            this.matrix = new List<List<Cell>>();

            foreach (var row in inputSudoku)
            {
                var matrixRow = new List<Cell>();
                foreach(var item in row)
                {
                    var cell = new Cell(item);
                    matrixRow.Add(cell);
                }
                matrix.Add(matrixRow);
            }
            for(var row = 0; row < 9; row++)
            {
                for (var col = 0; col < 9; col++)
                {
                    var currentVal = this.matrix[row][col].CurrentVal;
                    this.RemoveThePossibleValueInColumn(currentVal, col);
                    this.RemoveThePossibleValueInRow(currentVal, row);
                    this.RemoveThePossibleValueInGrid(currentVal, row, col);
                }
            }
        }

        public void PrintCurrentState()
        {
            foreach(var row in matrix)
            {
                Console.WriteLine(string.Join(" ", row));
            }
        }

        public bool Solve()
        {
            int? minCellRow;
            int? minCellCol;
            (minCellRow, minCellCol) = this.FindNextEmptyCell();

            if (!minCellRow.HasValue)
            {
                Console.WriteLine("Solved sudoku");
                this.PrintCurrentState();
                return true;
            }

            var row = minCellRow.Value;
            var col = minCellCol.Value;
            var possibleValues = this.matrix[row][col].DeepCopyListOfPossibleValues();
            foreach(var possibleVal in possibleValues)
            {
                this.matrix[row][col].CurrentVal = possibleVal;
                if (!this.IsTheColSafe(col))
                {
                    this.matrix[row][col].CurrentVal = 0;
                }
                else if (!this.IsTheRowSafe(row))
                {
                    this.matrix[row][col].CurrentVal = 0;
                }
                else if (!this.IsTheGridSafe(row, col))
                {
                    this.matrix[row][col].CurrentVal = 0;
                }
                else if (!this.Solve())
                {
                    this.matrix[row][col].CurrentVal = 0;
                }
                else
                {
                    return true;
                }
            }

            return false;
        }

        private (int?, int?) FindNextEmptyCell()
        {
            int? minCellRow = null;
            int? minCellCol = null;
            for (var row = 0; row < 9; row++)
            {
                for (var col = 0; col < 9; col++)
                {
                    if (this.matrix[row][col].CurrentVal == 0)
                    {
                        minCellRow = row;
                        minCellCol = col;
                        return (minCellRow, minCellCol);
                    }
                }
            }
            return (minCellRow, minCellCol);
        }

        private void RemoveThePossibleValueInRow(int possibleValue, int rowIndex)
        {
            foreach(var cell in this.matrix[rowIndex])
            {
                cell.RemovePossibleValue(possibleValue);
            }
        }

        private void RemoveThePossibleValueInColumn(int possibleVal, int colIndex)
        {
            for(var i = 0; i < this.matrix.Count; i++)
            {
                this.matrix[i][colIndex].RemovePossibleValue(possibleVal);
            }
        }

        private void RemoveThePossibleValueInGrid(int possibleVal, int rowIndex, int colIndex)
        {
            for (var row = 3 * (rowIndex / 3); row < 3 * (rowIndex / 3) + 3; row++)
            {
                for (var col = 3 * (colIndex / 3); col < 3 * (colIndex / 3) + 3; col++)
                {
                    this.matrix[row][col].RemovePossibleValue(possibleVal);
                }
            }
        }

        private bool IsTheGridSafe(int rowIndex, int colIndex)
        {
            var values = new List<int>();
            for (var row = 3 * (rowIndex / 3); row < 3 * (rowIndex / 3); row++)
            {
                for (var col = 3 * (colIndex / 3); col < 3 * (colIndex / 3) + 3; col++)
                {
                    if (this.matrix[row][col].CurrentVal == 0)
                    {
                        break;
                    }

                    if (values.Contains(this.matrix[row][col].CurrentVal))
                    {
                        return false;
                    }
                    else
                    {
                        values.Add(this.matrix[row][col].CurrentVal);
                    }
                }
            }
            return true;
        }

        private bool IsTheRowSafe(int rowIndex)
        {
            var values = new List<int>();
            for (int col = 0; col < this.matrix[rowIndex].Count; col++)
            {
                var cell = this.matrix[rowIndex][col];
                if (cell.CurrentVal == 0)
                {
                    break;
                }

                if (values.Contains(cell.CurrentVal))
                {
                    return false;
                }
                else
                {
                    values.Add(cell.CurrentVal);
                }
            }
            return true;
        }

        private bool IsTheColSafe(int colIndex)
        {
            var values = new List<int>();
            for (var i = 0; i < this.matrix.Count; i++)
            {
                var cell = this.matrix[i][colIndex];
                if (cell.CurrentVal == 0)
                {
                    break;
                }

                if (values.Contains(cell.CurrentVal))
                {
                    return false;
                }
                else
                {
                    values.Add(cell.CurrentVal);
                }
            }
            return true;
        }
    }
}
