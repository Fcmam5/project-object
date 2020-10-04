const _projectFlatObject = (obj, attributes) => {
  return attributes.reduce((acc, attr)=> {
    return {...acc, [attr]: obj[attr]};
  }, {});
};

const projectObject = (obj, attributes) => {
  if (!attributes || Array.isArray(attributes) && attributes.length === 0) {
    return obj;
  }

  return _projectFlatObject(obj, attributes);
};

module.exports = projectObject;
