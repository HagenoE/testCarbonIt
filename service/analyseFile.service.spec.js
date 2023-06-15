/* eslint-disable max-len */
/* eslint-disable comma-spacing */
const analyseFile = require('./analyseFile.service');

const entree = 'C - 5 - 5';
const mountainEntry = 'M - 1 - 4';
const treasureEntry = 'T - 4 - 0 - 3';
const adventure = 'A - Evye - 3 - 3 - N - AAGADAGGA';

describe('test analyse files methode', () => {
  const newMap = analyseFile.getMapSize(entree);
  const newMountainArray = analyseFile.getMountainLocalisation(mountainEntry.split(' - '), newMap);
  const newTreasureArray = analyseFile.treasureLocalisation(treasureEntry.split(' - '), newMap);

  test('the function getMapSize must return an array', () => {
    expect(newMap).toBeInstanceOf(Array);
  });

  test('the function getMountainLocalisation must return an array', () => {
    expect(newMountainArray).toBeInstanceOf(Array);
  });

  test('the function treasureLocalisation must return an array', () => {
    expect(newTreasureArray).toBeInstanceOf(Array);
  });
});

describe('test params of getMapSize', () => {
  test('the entry string begin with a C and does\'t have any othe letter',() => {
    expect(entree).toMatch(/^C - (\d){1,}/);
  });
  test('the entry string have 2 number for the card',() => {
    expect(entree).toMatch(/(\d - \d)/);
  });
});

describe('test params of adventureSimulated', () => {
  test('the entry string begin with a M and does\'t have any othe letter',() => {
    const arrayAdeventure = adventure.split(' - ');
    expect(arrayAdeventure[0]).toMatch(/^(\w)/);
  });
  test('the entry string is a name with no number',() => {
    const arrayAdeventure = adventure.split(' - ');
    expect(arrayAdeventure[1]).toMatch(/^(\w)/);
  });
  test('the entry string have 2 number for the card',() => {
    expect(adventure).toMatch(/(\d - \d)/);
  });
  test('the entry string begin with NSEW and does\'t have any othe letter',() => {
    const arrayAdeventure = adventure.split('-');
    expect(arrayAdeventure[4]).toMatch(/(S|N|E|W)/);
  });
  test('the entry string have more than two letter',() => {
    const arrayAdeventure = adventure.split('-');
    expect(arrayAdeventure[5]).toMatch(/(A|G|D){2,}/);
  });
});

describe('test of adventureSimulated', () => {
  const newMap = analyseFile.getMapSize(entree);
  const adventureEnded = analyseFile.adventureSimulated(adventure,newMap);

  test('the function getMapSize must return an array', () => {
    expect(adventureEnded).toBeInstanceOf(Array);
  });
  test('the entry string is a name with no number',() => {
    expect(adventureEnded[0]).toMatch(/^(\w)/);
  });
  test('the entry string begin with NSEW and does\'t have any othe letter',() => {
    expect(adventureEnded[4]).toMatch(/(S|N|E|W)/);
  });
  test('the entry data must be a digit',() => {
    expect(adventureEnded[5]).toBe(0);
  });
});
