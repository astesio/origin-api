interface IUserEligible {
  income: number;
  vehicle?: {
    year: number;
  };
  house?: {
    ownership_status: string | 'owned' | 'mortgaged';
  };
}

interface IHouse {
  house: {
    ownership_status: 'owned' | 'mortgaged';
  };
}

interface IMaterialStatus {
  marital_status: 'single' | 'married';
}

interface IVehicle {
  vehicle: {
    year: number;
  };
}

export const isUserEligible = ({ income, vehicle, house }: IUserEligible): boolean =>
  income <= 0 && (vehicle.year === 0 || house.ownership_status === 'mortgaged');

export const isUserOver60yearsOld = (age: number): boolean => age >= 60;

export const isUserOver30yearsOld = (age: number): boolean => age <= 30;

export const isUserBetween30and40Old = (age: number): boolean => age >= 30 && age <= 40;

export const isHerIncomeIsOver200k = (income: number): boolean => income >= 200000.0;

export const isMortgagedHouse = ({ house }: IHouse): boolean =>
  house.ownership_status === 'mortgaged';

export const doesUserHaveDependents = (dependents: number): boolean => dependents > 0;

export const isMarried = ({ marital_status }: IMaterialStatus): boolean =>
  marital_status === 'married';

export const isVehicleOver5LastYear = ({ vehicle }: IVehicle): boolean =>
  new Date().getFullYear() - vehicle.year >= 5;
