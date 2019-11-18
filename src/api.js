const _retrievePrediction = picture => {
  //call keng api here
  return 'bibimbap';
};

const _retrieveNutrition = food => {
  //call nutrition data here
  return {
    Energy: '1 kcal',
    Protein: '0 g',
    Fat: '0 g',
  };
};

const _uploadImageAsync = photo => photo; //make async await

export { _retrieveNutrition, _retrievePrediction, _uploadImageAsync };
