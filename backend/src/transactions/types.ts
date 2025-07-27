
export type TamilRow = {
  buyerNameTa?: string;
  sellerNameTa?: string;
  houseNo?: string;
  surveyNo?: string;
  documentNo?: string;
  documentDate?: string; 
  considerationValue?: string;
  raw?: any;
};

export type Row = TamilRow & {
  buyerNameEn?: string;
  sellerNameEn?: string;
  houseNoEn?: string;
  surveyNoEn?: string;
  documentNoEn?: string;
  documentDateEn?: string;
  considerationValueEn?: string;
};

