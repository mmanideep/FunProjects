using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace SudokuSolverBackTracking
{
    public class Cell
    {
        private int currentVal;

        public List<int> PossibleValues;

        public Cell(int val)
        {
            this.currentVal = val;
            this.PopulatePossibleValues();
        }

        public int CurrentVal { get => this.currentVal; set => this.currentVal = value; }

        public void RemovePossibleValue(int x)
        {
            if (this.PossibleValues.Contains(x))
            {
                this.PossibleValues.Remove(x);
            }
        }

        public void AddPossibleValue(int x)
        {
            if (!this.PossibleValues.Contains(x))
            {
                this.PossibleValues.Add(x);
            }
        }

        public List<int> DeepCopyListOfPossibleValues()
        {
            var copy = new List<int>();
            foreach(var item in this.PossibleValues)
            {
                copy.Add(item);
            }
            return copy;
        }

        public override string ToString() 
        {
            return this.currentVal.ToString();
        }

        private void PopulatePossibleValues()
        {
            this.PossibleValues = Enumerable.Range(1, 9).ToList();
            if (this.PossibleValues.Contains(this.currentVal))
            {
                this.PossibleValues.Remove(this.currentVal);
            }
        }
    }
}
