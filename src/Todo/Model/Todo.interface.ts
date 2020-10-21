export default interface TodoDocument {
  id: number;
  name: string;
  complete: boolean;
  createAt?: Date;
  updateAt?: Date;
}
