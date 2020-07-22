import { stringify } from '../src';

let obj = {
  method: 'query_sql_dataset_data',
  projectId: '85',
  appToken: '7d22e38e-5717-11e7-907b-a6006ad3dba0',
  datasetId: '12564701',
};

let obj2 = {
  id: [1, 2, 3],
  name: 'rainbow',
  friend: 'heizi',
};
test(`The result is "method=query_sql_dataset_data&projectId=85&appToken=7d22e38e-5717-11e7-907b-a6006ad3dba0&datasetId=12564701".`, () => {
  expect(stringify(obj)).toBe(
    'method=query_sql_dataset_data&projectId=85&appToken=7d22e38e-5717-11e7-907b-a6006ad3dba0&datasetId=12564701',
  );
});

test('The result is "id=1,2,3&name=rainbow&friend=heizi"', () => {
  expect(stringify(obj2)).toBe('id=1,2,3&name=rainbow&friend=heizi');
});
