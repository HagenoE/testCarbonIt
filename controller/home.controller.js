const fs = require('fs');
const analyseFile = require('../service/analyseFile.service');

const homeController = {
  homePage(_, res) {
    res.render('accueil');
  },
  async resultPage(req, res, next) {
    console.log(req.files);
    if (!req.files) {
      return res.redirect('/');
    }

    const file = req.files.Instruction.data.toString('utf8');
    // const buffer = file.data.toString('utf8');
    // const arrayOfAllDatas = buffer.split('\n');
    const arrayOfAllDatas = file.split('\n');
    // let textResult = `Instruction du debut :\n${buffer}\n\n`;
    let textResult = `Instruction du debut :\n${file}\n\n`;
    const allData = arrayOfAllDatas.reduce((acc, val) => {
      if ((val.split('')[0] !== '#') && (val !== '')) {
        acc.push(val);
      }
      return acc;
    }, []);

    const map = analyseFile.getMapSize(allData[0]);

    let adventureSequence;

    allData.forEach((data) => {
      const currentArray = data.split(' - ');

      if (currentArray[0] === 'M') {
        return analyseFile.getMountainLocalisation(currentArray, map);
      }
      if (currentArray[0] === 'T') {
        return analyseFile.treasureLocalisation(currentArray, map);
      }

      if (currentArray[0] === 'A') {
        adventureSequence = currentArray;
        return adventureSequence;
      }
      return true;
    });

    const finalAdventure = analyseFile.adventureSimulated(adventureSequence, map);

    const resultatAventure = finalAdventure.join(' - ');

    textResult += `Resultat apres exploration :\n${resultatAventure}`;
    const fileName = `resultatAventure_${Date.now()}`;

    fs.writeFile(`resultat/${fileName}.txt`, textResult, (err) => {
      if (err) { next(err); }
    });
    console.log(map);
    return res.send(finalAdventure);
  },
};

module.exports = homeController;
