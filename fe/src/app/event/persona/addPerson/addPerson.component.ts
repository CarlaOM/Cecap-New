import { Component, OnInit, ElementRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { PeticionesService } from '../../../services/peticiones.service';
import { Identity } from '../../../services/global';
import { Person } from '../../../modelo/person';
import { Inscription } from '../../../modelo/inscription';
import { Registro } from '../../../modelo/registro';
import { DescOcupation } from '../../../modelo/descOcupation';


@Component({
    selector: 'app-addPerson',
    templateUrl: './addPerson.component.html',
    styleUrls: ['./addPerson.component.css'],
    providers: [PeticionesService]
})
export class AddPersonComponent implements OnInit {
    @ViewChild("close", { read: ElementRef }) close: ElementRef;
    @Output() messageEvent = new EventEmitter();
    
    public person: Person;//colection
    public ocupSelected;
    public descOcupation: DescOcupation;
    public eventos;//colection
    public programs;//colection
    public montoCan;
    public IdEvent;
    public cartera;

    public registro: Registro;

    public inscription;

    constructor(
        private _peticionesService: PeticionesService,
        private route: ActivatedRoute,
        private router: Router
    ) {
        this.person = new Person('', '', null, null, null,'','', null, '');
        //first_name,last_name,ci,phone,cellphone,email,ocupation,descOcupation:{ },carteras
       // this.inscription = new Inscription('', null, null,null,'', '');
        //this.identy=Identity._id;
        this.descOcupation = new DescOcupation('','','','','','','');
        this.registro = new Registro(null,null, null,null);//idEvent,idUser,persona:{}, montCancel
        
    }
    onSubmit() { 
    }
    ngOnInit() {
        console.log(Identity._id);
        //this.queryPrograms();
        this.queryEvents();
        this.queryCartera();
        }
    guardar(){
        //console.log(this.IdEvent);
        //console.log(this.montoCan);
        // console.log(this.descOcupation);
        this.person.descOcupation = this.descOcupation;
        //console.log(this.person);
        this.registro.idEvent = this.IdEvent;
        this.registro.idUser = Identity._id;
        this.registro.persona = this.person;
        this.registro.montCancel= this.montoCan;
        console.log(this.registro);
        this._peticionesService.addPerson(this.registro).subscribe(
          result => {
            var esperado = result;
            console.log(esperado);
           // this.router.navigate(['home/event', this.eventId]);
            alert('Se Registro a la persona de manera correcta');
            
          },
          error => {
            var errorMessage = <any>error;
            console.log(errorMessage);
            alert('Error al registrar persona verifique los datos');
          }
        );
    }
    captOcupation(){ 
        console.log(this.ocupSelected);
        this.descOcupation.universidad = '';this.descOcupation.carrera = '';
        this.descOcupation.semestre = '';this.descOcupation.areaTrabajo = '';
        this.descOcupation.profesion = '';this.descOcupation.cargo = '';
        this.descOcupation.empresa = '';
        this.person.ocupation = this.ocupSelected; 
    }
    queryCartera() {
        //console.log(Identity._id)
        this._peticionesService.getCarteraFromUserId(Identity._id).subscribe(
            result => {
                this.cartera = result;
                this.person.carteras = this.cartera._id
                // console.log('aqui la cartera del usuario::::');
                // console.log(this.cartera);
            },
            error => {
                var errorMessage = <any>error;
                console.log(errorMessage);
            }
        );
    }
    queryEvents(){
        this._peticionesService.getEvents().subscribe(
            result => {
                this.eventos = result;
                //console.log(this.eventos);
            },
            error => {
                var errorMessage = <any>error;
                console.log(errorMessage);
            });
    }
    cancel(){
        // this.router.navigate(['home/events']);
        window.history.back();
    }
}
