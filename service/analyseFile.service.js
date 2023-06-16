/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */
/* eslint-disable prefer-destructuring */
const AppError = require('../utils/appError.utils');

const analyseFile = {
  removeWhiteSpace(string) {
    const newString = string.replace(/\s/g, '');
    return newString;
  }, /**
   *
   * @param { string } sentence
   * @returns array split all information
   */
  getMapSize(sentence) {
    const dataArray = this.removeWhiteSpace(sentence).split('-');

    if (dataArray[0] !== 'C') {
      const ligneError = {
        status: 400,
        message: 'First line of file must content C',
      };
      console.log(ligneError);
      throw new AppError(ligneError);
    }
    const xData = Number(dataArray[1]);
    const yData = Number(dataArray[2]);

    if (xData.isNaN && yData.isNaN) {
      const errorCoordonate = {
        status: 400,
        message: 'File must have only 2 number',
      };
      throw new AppError(errorCoordonate);
    }

    if (dataArray[3]) {
      const errorArray = {
        status: 400,
        message: 'First line couldn\'t have more than 3 character',
      };
      throw new AppError(errorArray);
    }
    const map = [];

    for (let xIndex = 0; xIndex < xData; xIndex += 1) {
      const newArray = [];
      for (let yIndex = 0; yIndex < yData; yIndex += 1) {
        const yArray = [];
        yArray.push(yIndex);
        newArray.push(yArray);
      }
      map.push(newArray);
    }
    return map;
  },

  /**
   *
   * @param { string } sentence received line for put mountain
   * @param { array } map
   * @returns array with a new index, contains localisation
   */
  getMountainLocalisation(sentence, map) {
    const xData = sentence[1];
    const yData = sentence[2];

    map[xData][yData] = ['M'];
    return map;
  },
  /**
   *
   * @param { string } sentence
   * @param { array } map
   * @returns array with a new index, contains localisation
   */
  treasureLocalisation(sentence, map) {
    const xData = sentence[1];
    const yData = sentence[2];
    const numTreasure = sentence[3];

    map[xData][yData] = ['T'];
    map[xData][yData].push([Number(numTreasure)]);
    return map;
  },
  /**
 *
 * @param {array} adventureSentence
 * @param {array} map
 * @returns {array} localisation of adventure and treasure
 */
  adventureSimulated(adventureSentence, map) {
    const endOfAdventure = [];
    const name = adventureSentence[1];
    const xPosition = adventureSentence[2];
    const yPosition = adventureSentence[3];

    const sequences = adventureSentence[5].split('');

    let movingArray = [xPosition, yPosition, 0];
    let orientation = adventureSentence[4];

    sequences.forEach((sequence) => {
      switch (sequence) {
        case 'A':
          movingArray = analyseFile.newPosition(movingArray, orientation, map);
          break;
        case 'D':

          orientation = analyseFile.newRightPosition(orientation);
          break;
        case 'G':
          orientation = analyseFile.newLeftPosition(orientation);

          break;
        default:
          break;
      }
    });

    const xFinalPosition = movingArray[0];
    const yFinalPosition = movingArray[1];
    const numberOfTreasure = movingArray[2];

    endOfAdventure.push('A');
    endOfAdventure.push(name);
    endOfAdventure.push(xFinalPosition);
    endOfAdventure.push(yFinalPosition);
    endOfAdventure.push(orientation);
    endOfAdventure.push(numberOfTreasure);

    return endOfAdventure;
  },
  /**
   *
   * @param {array} positionArray
   * @param {string} direction
   * @param {array} map
   * @param {string} instruction
   * @return {array} new position
   */
  newPosition(positionArray, direction, map) {
    const xPosition = Number(positionArray[0]);
    const yPosition = Number(positionArray[1]);
    const maxX = map.length - 1;
    const maxY = map[0].length - 1;

    let treasureOfAdventure = positionArray[2];
    let newPosition;
    let newX;
    let newY;
    let valueOfPlacement;
    let treasureInStock;

    switch (direction) {
      case 'W':
        newX = xPosition - 1;

        if (newX < 0) {
          newX = xPosition;
        }

        valueOfPlacement = map[newX][yPosition];
        if (valueOfPlacement === 'M') {
          newPosition = [newX, yPosition, treasureOfAdventure];
          break;
        }

        if (valueOfPlacement[0] && valueOfPlacement[0] === 'T') {
          treasureOfAdventure += 1;
          newPosition = [newX, yPosition, treasureOfAdventure];

          treasureInStock = map[newX][yPosition][1];

          if (treasureInStock > 0) {
            map[newX][yPosition][1]--;
          }
          break;
        }

        newPosition = [newX, yPosition, treasureOfAdventure];
        break;
      case 'S':
        newY = yPosition + 1;

        if (newY > maxY) {
          newY = yPosition;
        }

        valueOfPlacement = map[xPosition][newY];
        if (valueOfPlacement === 'M') {
          newPosition = [xPosition, newY, treasureOfAdventure];
          break;
        }

        if (valueOfPlacement[0] && valueOfPlacement[0] === 'T') {
          treasureOfAdventure += 1;
          newPosition = [xPosition, newY, treasureOfAdventure];
          treasureInStock = map[xPosition][newY][1];

          if (treasureInStock > 0) {
            map[xPosition][newY][1]--;
            break;
          }
        }

        newPosition = [xPosition, newY, treasureOfAdventure];

        break;
      case 'E':
        newX = xPosition + 1;
        if (newX > maxX) {
          newX = xPosition;
        }
        valueOfPlacement = map[newX][yPosition];

        if (valueOfPlacement === 'M') {
          newPosition = [newX, yPosition, treasureOfAdventure];
          break;
        }

        if (valueOfPlacement[0] && valueOfPlacement[0] === 'T') {
          treasureOfAdventure += 1;
          newPosition = [newX, yPosition, treasureOfAdventure];
          treasureInStock = map[newX][yPosition][1];

          if (treasureInStock > 0) {
            map[newX][yPosition][1]--;
            break;
          }
        }

        newPosition = [newX, yPosition, treasureOfAdventure];

        break;
      case 'N':
        newY = yPosition - 1;
        if (newY < 0) {
          newY = yPosition;
        }
        valueOfPlacement = map[xPosition][newY];
        if (valueOfPlacement === 'M') {
          newPosition = [xPosition, newY, treasureOfAdventure];

          break;
        }
        if (valueOfPlacement[0] && valueOfPlacement[0] === 'T') {
          treasureOfAdventure -= 1;
          newPosition = [xPosition, newY, treasureOfAdventure];

          treasureInStock = map[xPosition][newY][1];
          if (treasureInStock > 0) {
            map[xPosition][newY][1]--;
            break;
          }
        }
        newPosition = [xPosition, newY, treasureOfAdventure];
        break;
      default:
        break;
    }
    return newPosition;
  },
  newRightPosition(direction) {
    let newDirection;
    switch (direction) {
      case 'N':
        newDirection = 'E';
        break;
      case 'E':
        newDirection = 'S';
        break;
      case 'S':
        newDirection = 'W';
        break;
      case 'W':
        newDirection = 'N';
        break;
      default:
        newDirection = direction;
        break;
    }
    return newDirection;
  },
  newLeftPosition(direction) {
    let newDirection;
    switch (direction) {
      case 'N':
        newDirection = 'W';
        break;
      case 'W':
        newDirection = 'S';
        break;
      case 'S':
        newDirection = 'E';
        break;
      case 'E':
        newDirection = 'N';
        break;
      default:
        newDirection = direction;
        break;
    }
    return newDirection;
  },
};

module.exports = analyseFile;
