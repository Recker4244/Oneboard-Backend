const getHeatMap = require('../services/getHeatMap');

const heatmapController = async (req, res) => {
  try {
    res.status(200).json(await getHeatMap());
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
    
};

module.exports = heatmapController;



