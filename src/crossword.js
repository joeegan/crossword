class Crossword {

   constructor(selector:String) {
      this.tableEl = document.querySelector(selector);
      this.trs = this.tableEl.querySelectorAll('tr');
      this.size = this.trs.length;
      this.minimumWordLength = 4;
      return this;
   }

   initialise() {
      this.colourMapping = this.processInitialGrid();
      this.colourBoard();
      return this;
   }

   /**
    * Colours the board black and white using the colourMapping.
    */
   colourBoard() {
      for (let i = 0; i < this.colourMapping.length; i++) {
         var tds = this.tableEl.querySelectorAll('tr')[i].querySelectorAll('td');
         for (let j = 0; j < tds.length; j++) {
            if (this.colourMapping[i][j] == 0) {
               tds[j].className = 'blank';
            }
         }
      }
   };

   /**
    * Gets a random whole number between min and max.
    */
   getRandomInt (min:Number = 0, max:Number) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
   };

   processInitialGrid() {
      var originalGrid = this.buildInitialGrid();
      var grid = originalGrid.slice();
      var lightRowWasFirst = (originalGrid[0].toString() == this.lightRow.toString());
      var rowStartDarkWasFirst = (originalGrid[0].toString() == this.rowStartDark.toString());
      var rowStartLightWasFirst = (originalGrid[0].toString() == this.rowStartLight.toString());
      var lightRowWasSecond = (originalGrid[1].toString() == this.lightRow.toString());
      var rowStartDarkWasSecond = (originalGrid[1].toString() == this.rowStartDark.toString());
      var rowStartLightWasSecond = (originalGrid[1].toString() == this.rowStartLight.toString());

      // numbers should be random degenerates, but for now...
      if (rowStartLightWasSecond) {
         grid[0][7] = 0;
         grid[this.size-1][(this.size-1)-7] = 0; // symmetry
      } else if (rowStartDarkWasSecond) {
         grid[0][6] = 0;
         grid[this.size-1][(this.size-1)-6] = 0;
      } else if (rowStartLightWasFirst) {
         grid[0][6] = 0;
         grid[this.size-1][(this.size-1)-6] = 0;
      } else if (rowStartDarkWasFirst) {
         grid[1][6] = 0;
         grid[this.size-2][(this.size-1)-6] = 0;
      }
      return grid;
   }

   buildInitialGrid() {
      var arr = [];
      this.lightRow = new String(new Array(13)).split(',').map(function(){ return 1 });
      this.rowStartLight = this.lightRow.map(function(num, i) { return +(i % 2 == 0) });
      this.rowStartDark = this.rowStartLight.map(function(num) { return Math.abs(num-1) });
      var choices = [this.lightRow, this.rowStartDark, this.rowStartLight];
      var firstChoiceIndex = this.getRandomInt(0, choices.length-1);
      var firstChoice = choices.splice(firstChoiceIndex, 1)[0];
      var secondChoice, secondChoiceIndex;
      if (firstChoice.toString() !== this.lightRow.toString()) {
         secondChoice = this.lightRow;
      } else {
         secondChoiceIndex = this.getRandomInt(0, choices.length-1);
         secondChoice = choices.splice(secondChoiceIndex, 1)[0];
      }
      while (arr.length < this.size) {
         arr.push(firstChoice.slice());
         arr.push(secondChoice.slice());
      }
      return arr.splice(0, this.size);
   }
}

var crossword = new Crossword('table').initialise();
