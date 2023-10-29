const FindLogic = (blog, loggedInUserId) => {
  return blog.find(
    userId => userId.toString() === loggedInUserId.toString()
  );
};

module.exports = FindLogic;
