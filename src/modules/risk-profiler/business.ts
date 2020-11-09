import { BodySchema as BodySchemaInterface } from './interfaces/body';
import { ResponseSchema as ResponseSchemaInterface } from './interfaces/response';

import {
  isMarried,
  isUserEligible,
  isMortgagedHouse,
  isUserOver60yearsOld,
  isUserOver30yearsOld,
  isHerIncomeIsOver200k,
  doesUserHaveDependents,
  isVehicleOver5LastYear,
  isUserBetween30and40Old,
} from '../business';

export const business = {
  riskProfiler: async (payload: BodySchemaInterface) => {
    const { age, income, house, vehicle, dependents, risk_questions, marital_status } = payload;
    const quantity = _handleRiskAlgorithm(risk_questions);
    let LIFE_SCORE = quantity,
      HOME_SCORE = quantity,
      AUTO_SCORE = quantity,
      DISABILITY_SCORE = quantity;

    const response: ResponseSchemaInterface = {
      auto: 'ineligible',
      home: 'ineligible',
      life: 'ineligible',
      disability: 'ineligible',
    };

    response.life = _handleScoreLineInsurance(LIFE_SCORE);
    response.home = _handleScoreLineInsurance(HOME_SCORE);
    response.auto = _handleScoreLineInsurance(AUTO_SCORE);
    response.disability = _handleScoreLineInsurance(DISABILITY_SCORE);

    if (isUserEligible({ income, house, vehicle })) {
      response.disability = 'ineligible';
      response.auto = 'ineligible';
      response.home = 'ineligible';

      if (isUserOver60yearsOld(age)) {
        response.life = 'ineligible';
      }

      return response;
    }

    if (isUserOver60yearsOld(age)) {
      response.disability = 'ineligible';
      response.life = 'ineligible';
    }

    if (isUserOver30yearsOld(age)) {
      LIFE_SCORE -= 2;
      HOME_SCORE -= 2;
      AUTO_SCORE -= 2;
      DISABILITY_SCORE -= 2;
    }

    if (isUserBetween30and40Old(age)) {
      LIFE_SCORE -= 1;
      HOME_SCORE -= 1;
      AUTO_SCORE -= 1;
      DISABILITY_SCORE -= 1;
    }

    if (isHerIncomeIsOver200k(age)) {
      LIFE_SCORE -= 1;
      HOME_SCORE -= 1;
      AUTO_SCORE -= 1;
      DISABILITY_SCORE -= 1;
    }

    if (isMortgagedHouse({ house })) {
      HOME_SCORE += 1;
      DISABILITY_SCORE += 1;
    }

    if (doesUserHaveDependents(dependents)) {
      DISABILITY_SCORE += 1;
      LIFE_SCORE += 1;
    }

    if (isMarried({ marital_status })) {
      LIFE_SCORE += 1;
      DISABILITY_SCORE -= 1;
    }

    if (isVehicleOver5LastYear({ vehicle })) {
      AUTO_SCORE += 1;
    }

    response.life = _handleScoreLineInsurance(LIFE_SCORE);
    response.home = _handleScoreLineInsurance(HOME_SCORE);
    response.auto = _handleScoreLineInsurance(AUTO_SCORE);
    response.disability = _handleScoreLineInsurance(DISABILITY_SCORE);

    return response;
  },
};

const _handleRiskAlgorithm = (riskQuestion: number[] = []): number =>
  riskQuestion.reduce((prev, curr) => prev + curr, 0);

const _handleScoreLineInsurance = (scoreLineInsuranceName: number) => {
  const _dictionary = {
    0: 'economic',
    1: 'regular',
    2: 'regular',
    3: 'responsible',
  };

  const totalPoints =
    scoreLineInsuranceName <= 0 ? 0 : scoreLineInsuranceName >= 3 ? 3 : scoreLineInsuranceName;
  return _dictionary[totalPoints];
};
