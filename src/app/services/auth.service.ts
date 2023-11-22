import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore'
import IUser from 'src/app/Models/user.model';
import { Observable , of } from 'rxjs';
import { delay, filter, map ,switchMap } from 'rxjs/operators';
import { Router ,  NavigationEnd , ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isAuthenticated$ : Observable<boolean>
  public isAuthenticatedWithDilay$ : Observable<boolean>
  private redirect = true
  constructor(
    private auth: AngularFireAuth,
    private db: AngularFirestore,
    private router : Router,
    private route : ActivatedRoute
  ) {
    this.isAuthenticated$=this.auth.user.pipe(
      map(
        (user)=> !! user
      )
    )
    this.isAuthenticatedWithDilay$=this.isAuthenticated$.pipe(
      delay(1000)
    )

    this.router.events.pipe(
      filter((event)=> event instanceof NavigationEnd),
      map(()=> this.route.firstChild),
      switchMap((route)=>route?.data ?? of({authedonly : false}))
    ).subscribe((data)=> {  this.redirect = data.authedonly })
  }

  async registeruser(userData: IUser) {
    const userCred = await this.auth.createUserWithEmailAndPassword(
      userData.email as string, userData.password as string
    );

    await this.db.collection<IUser>('Users').doc(userCred.user?.uid).set({
      name: userData.name,
      email: userData.email,
      age: userData.age,
      phoneNumber: userData.phoneNumber,
    })

    await userCred.user?.updateProfile({
      displayName : userData.name
    })
  }
  async loginuser(email : string , passwrd :string){
    await this.auth.signInWithEmailAndPassword(email , passwrd)
  }
  async logout(e : Event){
    e.preventDefault();
    await this.auth.signOut()
    if (this.redirect){
      this.router.navigateByUrl('/')
    }
  }
}
