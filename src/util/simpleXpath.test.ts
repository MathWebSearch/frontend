import {convertXpath} from './simpleXpath';

it('empty xpath 0', () => {
  const t = convertXpath('');
  expect(t).toEqual([]);
});

it('empty xpath 1', () => {
  const t = convertXpath('/');
  expect(t).toEqual([]);
});

it('one step xpath', () => {
  const t = convertXpath('/*[1]/');
  expect(t).toEqual([0]);
});

it('longer xpath', () => {
  const t = convertXpath('/*[1]/*[2]/*[3]');
  expect(t).toEqual([0, 1, 2]);
});
