export interface IFormValues {
  firstName: string
  lastName: string
  phone: string
  email: string
  dateOfAccident: string
  transportation: string
  documents: IDocument[]
  zipCode: Number
}

export interface IDocument {
  url: string
  file: File
  id: string
  isPdf: boolean
}
