describe('Project object fields', () => {
  let projectObject;
  const anObject = {
    drink: 'lben',
    food: 'mhajeb',
    isHot: true,
    ingredients: [
      {
        name: 'tomatoes',
        foo: 'bar',
        isTrue: true
      },
      {
        name: 'onions',
        foo: 'bar2',
        isTrue: true
      },
    ]
  };


  beforeEach(()=> {
    projectObject = require('../src/index');
  });

  describe('flat objects', ()=> {


    it('should return the same object when not providing the attributes array', () => {
      const result = projectObject(anObject);

      expect(result).toMatchObject({...anObject});
    });

    it('should return the same object when providing an empty attributes array', () => {
      const result = projectObject(anObject, []);

      expect(result).toMatchObject({...anObject});
    });

    it('should return an object with only the selected attributes', () => {
      const result = projectObject(anObject, ['food', 'isHot']);

      expect(result).toMatchObject({ food: 'mhajeb', isHot: true });
    });

    it.skip('should return an object with a flattened array of objects', () => {
      const result = projectObject(anObject, [ 'isHot', 'ingredients.name']);

      expect(result).toMatchObject({  isHot: true, ingredients: ['tomatoes', 'onions'] });
    });
  });

  describe.skip('objects containing arrays of objects', ()=> {

    it('should return an object with a projected array of objects', () => {
      const result = projectObject(anObject, ['food', 'ingredients.name', 'ingredients.type']);

      expect(result).toMatchObject(
        {
          food: 'mhajeb',
          ingredients: [
            {
              name: 'tomatoes',
              foo: 'bar',
            },
            {
              name: 'onions',
              foo: 'bar2',
            },
          ]
        }
      );
    });

  });

});