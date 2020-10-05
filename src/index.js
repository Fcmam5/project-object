const SEPARATOR = '.';
const ARRAY_SEPARATOR = '.*.';

const _handleArrayProjection = (obj, arrayTree)=> {
  const [keyInObject, keyInNestedObject] = arrayTree;
  const element = obj[keyInObject];

  return {
    [keyInObject]: element.map(elm => ({...elm, [keyInNestedObject]: elm[keyInNestedObject]}))
  };

};

const _projectFlatObject = (obj, attributes =[]) => {
  return attributes.reduce((acc, attr)=> {
    // Construct a tree from the array,
    //  we expect the first element to be the root of our tree
    const arrayTree = attr.split(ARRAY_SEPARATOR);

    if (arrayTree.length === 2) {
      return {...acc,  ..._handleArrayProjection(obj, arrayTree)};
    }

    if (!attr.includes(SEPARATOR)) {
      return {...acc, [attr]: obj[attr]};
    }

    return acc;
  }, {});
};


const projectObject = (obj, attributes) => {
  if (!attributes || Array.isArray(attributes) && attributes.length === 0) {
    return obj;
  }

  return _projectFlatObject(obj, attributes);
};

module.exports = projectObject;
