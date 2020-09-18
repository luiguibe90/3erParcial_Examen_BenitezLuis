import { Component, OnInit, Input } from '@angular/core';
import { Subcategoria } from 'src/model/subcategoria';
import { SubcategoriaService } from '../service/subcategoria.service';
import { CategoriaService } from '../service/categoria.service';
import { MenuItem } from 'primeng/components/common/menuitem';
import { MessageService, ConfirmationService } from 'primeng/api';
import { DropdownModule } from 'primeng/dropdown';
// import { SelectItem } from 'primeng/primeng';
import { SelectItem } from 'primeng/api';
import { stringify } from 'querystring';



@Component({
  selector: 'app-subcategoria',
  templateUrl: './subcategoria.component.html',
  styleUrls: ['./subcategoria.component.css']
})
export class SubcategoriaComponent implements OnInit {

  subcategorias: Subcategoria[];
  selectedOption: string;
  cols: any[];
  items: MenuItem[];
  cities: SelectItem[];
  catselected: string;
  categorias = [];
  previousVal: any;
  currentVal: string;
  // tslint:disable-next-line:no-inferrable-types
  displaySaveDialog: boolean = false;
  Subcategoria: Subcategoria = {
    COD_SUB_CATEGORIA: null,
    COD_CATEGORIA: null,
    NOMBRE: null,
    DESCRIPCION: null,
    FECHA_CREACION: null
  };

  selectedSubcategoria: Subcategoria = {
    COD_SUB_CATEGORIA: null,
    COD_CATEGORIA: null,
    NOMBRE: null,
    DESCRIPCION: null,
    FECHA_CREACION: null
  };

  onSelectType(event) {
    if (event) {
      this.previousVal = this.currentVal;
      this.currentVal = event;
      this.catselected = this.currentVal;
    }
    console.log('this.previousVal', this.previousVal);
    console.log('this.currentVal', this.catselected);
    this.getAll(this.catselected);
    this.cols = [
      { field: 'COD_SUB_CATEGORIA', header: 'CODIGO' },
      { field: 'NOMBRE', header: 'NOMBRE' },
      { field: 'FECHA_CREACION', header: 'FECHA CREACION' },
    ];
  }

  constructor(private subcategoriaservice: SubcategoriaService,
              private messageService: MessageService,
              private confirmService: ConfirmationService,
              private categoriaservice: CategoriaService) { }

  getAll(id: string) {
    this.subcategoriaservice.getAllSubcategory(id).subscribe(
      (result: any) => {
        const subcategorias: Subcategoria[] = [];
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < result.length; i++) {
          const subcategoria = result[i] as Subcategoria;
          subcategorias.push(subcategoria);
        }
        this.subcategorias = subcategorias;
        console.log(subcategorias);
      },
      error => {
        console.log(error);
      }
    );
  }
  getAllCategories() {
    this.categoriaservice.getAll().subscribe((categorias) => {
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < categorias.length; i++) {
      this.cities.push({label: categorias[i].DESCRIPCION, value: categorias[i].COD_CATEGORIA});
      console.log(categorias);
     }
    });
  }
  delete() {
    if (this.selectedSubcategoria == null || this.selectedSubcategoria.COD_SUB_CATEGORIA == null) {
      return;
    }
    this.confirmService.confirm({
      message: '¿Eliminar?',
      accept : () => {
        this.subcategoriaservice.delete(this.selectedSubcategoria.COD_SUB_CATEGORIA).subscribe(
          (result: any) => {
            this.deleteObject(result.id2);
          }
        );
      }
    });
  }
  deleteObject(COD_SUB_CATEGORIA: string) {
    // tslint:disable-next-line:prefer-const
    let index = this.subcategorias.findIndex((e) => e.COD_SUB_CATEGORIA === COD_SUB_CATEGORIA);
    if (index !== -1) {
      this.subcategorias.splice(index, 1);
    }
  }

  showSaveDialog(editar: boolean) {
    if (editar) {
      if (this.selectedSubcategoria != null && this.selectedSubcategoria.COD_SUB_CATEGORIA != null) {
        this.Subcategoria = this.selectedSubcategoria;
      } else {

        return;
      }
    } else {
      this.Subcategoria = new Subcategoria();
    }
    this.displaySaveDialog = true;
  }
  save() {
    this.subcategoriaservice.Insert(this.Subcategoria).subscribe(
      (result: any) => {
        const subcategoria = result as Subcategoria;
        this.validarPersona(subcategoria);
        this.displaySaveDialog = false;
      },
      error => {
        console.log(error);
      }
    );
  }
  validarPersona(subcategoria: Subcategoria) {

    // tslint:disable-next-line:prefer-const
    let index = this.subcategorias.findIndex((e) => e.COD_SUB_CATEGORIA === subcategoria.COD_SUB_CATEGORIA);

    // tslint:disable-next-line:triple-equals
    if (index != -1) {
      this.subcategorias[index] = subcategoria;
    } else {
      this.subcategorias.push(subcategoria);
    }

  }

  ngOnInit() {
    this.cities = [];
    this.cities.push({label: 'Categoria', value: -1});
    this.getAllCategories();
    // tslint:disable-next-line:no-unused-expression
    this.onSelectType;

    this.items = [
      {
        label: 'Crear',
        command: () => this.showSaveDialog(false)
      },
      {
        label: 'Eliminar',
        command: () => this.delete()
      },
      {
        label: 'Detalles',
        command: () => this.showSaveDialog(true)
      },
    ];
  }
}
