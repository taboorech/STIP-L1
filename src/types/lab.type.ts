interface Code {
  file: string;
  code: string;
}

interface Result {
  title: string;
  path: string;
}

type Lab = {
  id: string;
  title: string;
  additionalInfo?: string[];
  conditionPath: string;
  results?: Result[];
  codes: Code[];
};

export type { Lab };