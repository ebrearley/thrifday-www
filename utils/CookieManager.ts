import Cookies, { CookieSetOptions } from 'universal-cookie';


export class CookieManager {
  private isSecure: boolean;
  private domain: string;
  private path: string;
  private maxAge: number;
  private sameSite: boolean | 'none' | 'lax' | 'strict';
  private cookies: Cookies;

  constructor(requestHeaderCookie?: string) {
    this.isSecure = process.env.NODE_ENV === 'production';
    this.domain = process.env.NEXT_PUBLIC_APPLICATION_DOMAIN;
    this.path = '/';
    this.sameSite = 'lax';
    this.maxAge = 31536000;
    this.cookies = new Cookies(requestHeaderCookie);
  }

  public get(name: string) {
    const cookie = this.cookies.get(name);
    return cookie;
  }

  public set(name: string, value: string) {
    this.cookies.set(name, value, this.getCookieSetOptions());
    return this.get(name);
  }

  public remove(name: string) {
    this.cookies.remove(name, this.getCookieSetOptions());
  }

  private getCookieSetOptions(): CookieSetOptions {
    return {
      secure: this.isSecure,
      domain: this.domain,
      path: this.path,
      sameSite: this.sameSite,
      maxAge: this.maxAge,
    }
  }
}
