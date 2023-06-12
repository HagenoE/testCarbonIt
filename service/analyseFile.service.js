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
      throw new AppError(ligneError);
    }
    const xData = Number(dataArray[1]);
    const yData = Number(dataArray[2]);
    if (xData.isNaN && yData.isNaN) {
      const errorCoordonate = {
        status: 400,
        message: 'First must have only 2 number',
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

    return [xData, yData];
  },

  /**
   *
   * @param { string } sentence received line for put mountain
   * @param { array } mountainArray
   * @returns array with a new index, contains localisation
   */
  getMountainLocalisation(sentence, mountainArray) {
    console.log;
  },
  /**
   *
   * @param { string } sentence
   * @param { array } treasureArray
   * @returns array with a new index, contains localisation
   */
  treasureLocalisation(sentence, treasureArray) {

  },
  /**
   *
   * @param { array } newLocalisationArray
   * @param { array } mountainArray
   * @returns boolean if false there is a mountain et explorer can't go on the place
   */
  localisationInMountain(newLocalisationArray, mountainArray) {

  },
  /**
   *
   * @param { array } newLocalisationArray
   * @param { array } mountainArray
   * @returns boolean if false there is no treasure to take
   */
  localisationInTreasure(newLocalisationArray, mountainArray) {

  },
};

module.exports = analyseFile;
