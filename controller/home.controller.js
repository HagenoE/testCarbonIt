const analyseFile = require('../service/analyseFile.service');

const homeController = {
  homePage(_, res) {
    res.render('accueil');
  },
  resultPage(req, res) {
    const file = req.files.Instruction;
    const buffer = file.data.toString('utf8');
    const arrayOfAllDatas = buffer.split('\n');

    const allData = arrayOfAllDatas.reduce((acc, val) => {
      if ((val.split('')[0] !== '#') && (val !== '')) {
        acc.push(val);
      }
      return acc;
    }, []);

    const mapCoordonnate = analyseFile.getMapSize(allData[0]);

    const map = [];

    for (let xIndex = 0; xIndex < mapCoordonnate[0]; xIndex += 1) {
      const newArray = [];
      for (let yIndex = 0; yIndex < mapCoordonnate[1]; yIndex += 1) {
        const yArray = [];
        yArray.push(yIndex);
        newArray.push(yArray);
      }
      map.push(newArray);
    }

    // map
    /*
    [
  [ [ 0 ], [ 1 ], [ 2 ], [ 3 ] ],
  [ [ 0 ], [ 1 ], [ 2 ], [ 3 ] ],
  [ [ 0 ], [ 1 ], [ 2 ], [ 3 ] ]
]
    */

    // allData
    // [ 'C - 3 - 4', 'Nlkm .', 'cyrtcfviu', 'rcdfvyugbol' ]

    res.send('ok');
  },
};

module.exports = homeController;
