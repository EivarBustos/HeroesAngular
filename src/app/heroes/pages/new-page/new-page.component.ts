import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Publisher, Hero } from '../../interfaces/hero.interface';
import { HerosService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, tap, filter} from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styles: [
  ]
})
export class NewPageComponent  implements OnInit{

  public heroForm = new FormGroup({
    id:              new FormControl<string>(''),
    superhero:       new FormControl<string>('', {nonNullable:true}),
    publisher:       new FormControl<Publisher>(Publisher.DCComics),
    alter_ego:       new FormControl<string>(''),
    first_appearance:new FormControl<string>(''),
    characters:      new FormControl<string>(''),
    alt_img:         new FormControl(''),
  });

  public publishers=[
    {
      id:'DC Comics',
      desc:'DC- Comics'
    },

    {
      id:'Marvel Comics',
      desc:'Marvel - Comics'
    }
  ];

  constructor (
    private herosService:HerosService,
    private activatedRoute:ActivatedRoute,
    private router:Router,
    private snackbar: MatSnackBar,
    private dialog: MatDialog

    ){}

    //este es para cargar la info para poder actuallzar
  ngOnInit(): void {
    if (!this.router.url.includes('edit')) return;

    this.activatedRoute.params
    .pipe(
      switchMap(({id})=> this.herosService.getHeroById(id)),
      ).subscribe(hero=>{
        //si no existe
        if(!hero) return this.router.navigateByUrl('/');

        //si existe

        this.heroForm.reset(hero);
        return;

      })
  }

  //esto es como un cascaron
  get currenHero(): Hero{
    const hero =this.heroForm.value as Hero
   return hero;
  }


  onSumit():void{
    if(this.heroForm.invalid) return;

    //actualizar
    if(this.currenHero.id){
      this.herosService.updateHero(this.currenHero)
      .subscribe(hero=>{
        this.showSnackbar(`${hero.superhero} updated !`)
        });
        return;
    }

    //si no hay id entonces es crear
    this.herosService.addHero(this.currenHero)
    .subscribe(hero=>{
      this.router.navigate(['/heroes/edit', hero.id])
      this.showSnackbar(`${hero.superhero} created !`)

    });

  }

  onDeleteHero(){
    if(!this.currenHero.id) throw Error('Hereo id is required');

      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        data : this.heroForm.value
     });
     dialogRef.afterClosed()
     .pipe(
      filter((result: boolean) => result),
      switchMap(()=> this.herosService.deleteHeroById(this.currenHero.id)),
      filter((wasDeleted:boolean)=>wasDeleted),
         )
     .subscribe( (result) => {
      this.router.navigate(['/heroes'])
    })


    //  dialogRef.afterClosed().subscribe( result => {
    //   if(!result) return;

    // this.herosService.deleteHeroById(this.currenHero.id)
    // .subscribe( wasDeleted=>{
    //   if(wasDeleted)
    //   this.router.navigate(['/heroes'])
    //      })
    //  });



  }

  showSnackbar(message:string):void{
    this.snackbar.open(message, 'Done', {
      duration:2500
    })
  }

}
