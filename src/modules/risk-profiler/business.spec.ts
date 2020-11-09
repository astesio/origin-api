import { business } from './business';

interface IPayload {
  age: number;
  dependents: number;
  income: number;
  marital_status: 'single' | 'married';
  risk_questions: [number, number, number];
  house?: {
    ownership_status: 'owned' | 'mortgaged';
    [k: string]: unknown;
  };
  vehicle?: {
    year: number;
    [k: string]: unknown;
  };
}

describe('riskProfiler', () => {
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

  it('Should return a valid score from user', async () => {
    const riskProfileResponse = await business.riskProfiler(payload);

    expect(riskProfileResponse).toStrictEqual({
      auto: 'regular',
      disability: 'regular',
      home: 'regular',
      life: 'regular',
    });
  });

  it('Should return a valid score from user', async () => {
    payload.income = 0;
    const riskProfileResponse = await business.riskProfiler(payload);

    expect(riskProfileResponse).toStrictEqual({
      auto: 'ineligible',
      disability: 'ineligible',
      home: 'ineligible',
      life: 'regular',
    });
  });

  it('Should return a valid score from user', async () => {
    payload.age = 69;
    payload.house.ownership_status = 'mortgaged';
    const riskProfileResponse = await business.riskProfiler(payload);

    expect(riskProfileResponse).toStrictEqual({
      auto: 'regular',
      disability: 'regular',
      home: 'responsible',
      life: 'responsible',
    });
  });
});
