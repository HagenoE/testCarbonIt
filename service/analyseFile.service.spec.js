/* eslint-disable max-len */
/* eslint-disable comma-spacing */
const analyseFile = require('./analyseFile.service');

const entree = 'C - 3 - 4';
const mountainArray = [];
const treasureArray = [];
const newLocalisationForMountain = [];
const newLocalisationForTreasure = [];

describe('test analyse files methode', () => {
  const newMap = analyseFile.getMapSize(entree);
  const newMountainArray = analyseFile.getMountainLocalisation(entree, mountainArray);
  const newTreasureArray = analyseFile.treasureLocalisation(entree, treasureArray);
  const moveInMountain = analyseFile.localisationInMountain(newLocalisationForMountain,mountainArray);
  const moveInTreasure = analyseFile.localisationInTreasure(newLocalisationForTreasure,treasureArray);

  test('the function getMapSize must return an array', () => {
    expect(newMap).toBeInstanceOf(Array);
  });

  test('the function getMountainLocalisation must return an array', () => {
    expect(newMountainArray).toBeInstanceOf(Array);
  });

  test('the function treasureLocalisation must return an array', () => {
    expect(newTreasureArray).toBeInstanceOf(Array);
  });

  test('the function localisationInMountain must return an array', () => {
    expect(typeof moveInMountain).toBe('boolean');
  });

  test('the function localisationInTreasure must return an array', () => {
    expect(typeof moveInTreasure).toBe('boolean');
  });
});

describe('test params of getMapSize', () => {
  test('the entry string begin with a C and does\'t have any othe letter',() => {
    expect(entree).toMatch(/^C - (\d){1,}/);
  });
  test('the entry string have 2 number for the card',() => {
    expect(entree).toMatch(/(\d - \d$ )/);
  });
});

describe('test params of getMountainLocalisation', () => {
  test('the entry string begin with a M and does\'t have any othe letter',() => {
    expect(entree).toMatch(/^M-(\d){1,}/);
  });
  test('the entry string have 2 number for the card',() => {
    expect(entree).toMatch(/\d{2}/);
  });
});

describe('test params of treasureLocalisation', () => {
  test('the entry string begin with a T and doesn\'t have any other letter',() => {
    expect(entree).toMatch(/^T - (\d){1,}/);
  });
  test('the entry string have 3 number for the card',() => {
    expect(entree).toMatch(/(\d - \d - \d$)/);
  });
});
