export class User {
    constructor(
      public email: string,
      public username: string,
      public password: string,
      public gender: 'male' | 'female' | 'other',
      public id?: number,
      public image?: string,
      public role: 'admin' | 'user' = 'user', 
      public created_at?: Date,
      public updated_at?: Date
    ) {}
  }
  export class Auth {
    
    constructor(public name:string,public token: string ,public data:any){
    }

}
  export class Login{
    constructor( public email: string, public password: string){}
  }