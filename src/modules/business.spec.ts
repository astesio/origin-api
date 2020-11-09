import { isUserEligible, isMarried, isUserOver60yearsOld } from './business';

interface IPayload {
  age: number;
  income: number;
  dependents: number;
  marital_status: string;
  risk_questions: number[];
  vehicle?: {
    year: number;
  };
  house?: {
    ownership_status: string | 'owned' | 'mortgaged';
  };
}

describe('isUserEligible', () => {
  let payload: IPayload;
  beforeEach(() => {
    payload = {
      age: 31,
      dependents: 0,
      income: 220000.0,
      marital_status: 'married',
      risk_questions: [1, 0, 1],
      house: {
        ownership_status: 'mortgaged',
      },
      vehicle: {
        year: 2021,
      },
    };
  });

  it('Should return a boolean true when the user do not have income and house', () => {
    payload.income = 0;
    const { income, vehicle, house } = payload;

    expect(isUserEligible({ income, vehicle, house })).toBeTruthy();
  });

  it('Should return a boolean true when the user do not have income and vehicle', () => {
    payload.income = 0;
    payload.vehicle.year = 0;
    const { income, vehicle, house } = payload;

    expect(isUserEligible({ income, vehicle, house })).toBeTruthy();
  });

  it('Should return a boolean false when the user do not have income but have a house', () => {
    payload.income = 0;
    payload.house.ownership_status = 'owned';
    const { income, vehicle, house } = payload;

    expect(isUserEligible({ income, vehicle, house })).toBeFalsy();
  });
});

describe('isMarried', () => {
  it('Should return a boolean true when the string parameter it is married', () => {
    expect(isMarried({ marital_status: 'married' })).toBeTruthy();
  });

  it('Should return a boolean false when the string parameter it is single', () => {
    expect(isMarried({ marital_status: 'single' })).toBeFalsy();
  });
});

describe('isUserOver60yearsOld', () => {
  it('Should return a boolean true when the number parameter it is greater or equal than 60', () => {
    expect(isUserOver60yearsOld(60)).toBeTruthy();
  });

  it('Should return a boolean false when the number parameter it is less than 60', () => {
    expect(isUserOver60yearsOld(59)).toBeFalsy();
  });
});
