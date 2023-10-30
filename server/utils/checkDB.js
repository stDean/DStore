const FindLogic = (searchArr, id) => {
  return searchArr.find(userId => userId.toString() === id.toString());
};

module.exports = FindLogic;
