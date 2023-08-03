export default class AppRoutes {
  public static loginPage: string = "/login"
  public static signUpPage: string = "/sign-up"
  public static homePage: string = "/home"

  public static getLoginPage() {
    return this.loginPage
  }

  public static getSignUpPage() {
    return this.signUpPage
  }

  public static getHomePage() {
    return this.homePage
  }
}
