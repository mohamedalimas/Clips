import { ValidationErrors, AbstractControl , AsyncValidator , ValidatorFn} from "@angular/forms";
import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import IUser from "src/app/Models/user.model";
import firebase from 'firebase/compat/app';

@Injectable({
    providedIn: 'root'
})
export class Emailtaken implements AsyncValidator {
    constructor(private store: AngularFirestore) { }

     validate = async (control: AbstractControl): Promise<ValidationErrors | null> =>{
            const snapShot =  await this.store.collection<IUser>('Users').ref.where('email', '==',control.value).get()
            return snapShot.docs.length ? {emailtaken: true} : null
    }
}
