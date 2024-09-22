interface IVerifyCode {
  verify: string;
  email: string
}

interface ILogin {
  password: string;
  email: string
}

interface IRegister {
  username: string;
  password: string;
  email: string
}

export {IVerifyCode, ILogin, IRegister}