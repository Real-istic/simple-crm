export class Transaction {
  userId: string;
  id: string;
  description: string;
  price: number;
  date: number;

  constructor(obj?: any) {
    this.userId = obj ? obj.id : '';
    this.id = obj ? obj.id : '';
    this.description = obj ? obj.description : '';
    this.price = obj ? obj.price : '';
    this.date = obj ? obj.date : '';
  }

  public toJson() {
    return {
      userId: this.userId,
      id: this.id,
      description: this.description,
      price: this.price,
      date: this.date
    };
  }
}
