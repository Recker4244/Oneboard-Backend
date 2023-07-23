const {getLanguages, 
  getManagerLanguages
} = require('../services/getLanguages');

// const getManagerLanguages = require('../utils/githubUtils/getManagerLanguages');

const languagesController = async (req, res) => {

  try {
    res.status(200).json(await getLanguages(req.params.user));

  }
  catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
        
};

const managerLanguagesController = async (req, res) => {
  try {
    res.status(200).json(await getManagerLanguages(req.params.user));
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


// const managerLanguagesController = async (req, res) => {
//   try {
//     res.status(200).json(await getManagerLanguages(req.params.user));
//   }
//   catch (err) {
//     console.log(err);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// };
    
module.exports = {
  languagesController,
  managerLanguagesController,
};
    