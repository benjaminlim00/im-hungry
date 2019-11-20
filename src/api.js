import axios from 'axios';

const _retrievePrediction = picture => {
  //call keng api here
  return 'bibimbap';
};

const _asyncRetrieveNutrition = async food => {
  const _retrieveNutrition = food => {
    return new Promise((resolve, reject) => {
      try {
        const params = {
          app_id: '59af4d68',
          app_key: '3e130ae0f401bfbc403f811ee4ff2e84',
          ingr: food,
        };
        axios
          .get('https://api.edamam.com/api/food-database/parser', { params })
          .then(response => {
            const { hints } = response.data;
            const { nutrients } = hints[0].food;
            const {
              ENERC_KCAL: Energy,
              PROCNT: Protein,
              FAT: Fat,
              CHOCDF: Carbs,
              FIBTG: Fiber,
            } = nutrients;
            resolve({
              Energy,
              Protein,
              Fat,
              Carbs,
              Fiber,
            });
          });
      } catch (error) {
        reject(error);
      }
    });
  };

  try {
    return await _retrieveNutrition(food);
  } catch (error) {
    console.log('error', error);
  }
};

const _uploadImageAsync = photo => photo; //make async await

export { _asyncRetrieveNutrition, _retrievePrediction, _uploadImageAsync };
