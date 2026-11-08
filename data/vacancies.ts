export type Vacancy={
  id:string;
  title:string;
  location:string;
  type:string;
  summary:string;
  closingDate?:string;
};

// Add approved vacancies here. Keeping this empty shows the designed
// expressions-of-interest state without advertising an unconfirmed role.
export const vacancies:Vacancy[]=[];
