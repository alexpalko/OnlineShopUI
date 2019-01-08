import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PriceRange } from '../models/price-range';
import {DomSanitizer} from '@angular/platform-browser';
import { _sanitizeHtml } from '@angular/core/src/sanitization/html_sanitizer';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products$: Object
  min$: number
  max$: number
  category$: number
  keyword$: string
  priceRangeModel = new PriceRange(0, 999999)
  keywordModel = "";

  constructor(private _productService: ProductService, private _activatedRoute: ActivatedRoute,
                private _router: Router, private _domSanitizer: DomSanitizer) { }

  ngOnInit() {
    this._activatedRoute.params.subscribe(
      params => {
        this.min$ = params.min;
        this.max$ = params.max;
        this.category$ = params.category;
        this.keyword$ = params.keyword;

        if(this.keyword$ != null && this.min$ != null && this.category$ != null){
          
          this._productService
            .getProductsInRangeFromCategoryByKeyword(this.category$, this.min$, this.max$, this.keyword$)
              .subscribe( data => this.products$ = data);
        }
        else if(this.keyword$ != null && this.min$ != null)
        {
          this._productService
            .getProductsInRangeByKeyword(this.min$, this.max$, this.keyword$)
              .subscribe( data => this.products$ = data);
        }
        else if(this.keyword$ != null && this.category$ != null)
        {
          this._productService
            .getProductsFromCategoryByKeyword(this.category$, this.keyword$)
              .subscribe( data => this.products$ = data);
        }
        else if(this.min$ != null && this.category$ != null)
        {
          this._productService
            .getProductsInRangeFromCategory(this.category$, this.min$, this.max$)
              .subscribe( data => this.products$ = data);
        }
        else if(this.keyword$ != null)
        {
          this._productService
            .getByKeyword(this.keyword$)
              .subscribe( data => this.products$ = data);
        }
        else if(this.min$ != null)
        { 
          this._productService
            .getProductsInRange(this.min$, this.max$)
              .subscribe( data => this.products$ = data);
        }
        else if(this.category$ != null)
        {
          
          this._productService
            .getProductsFromCategory(this.category$)
              .subscribe( data => this.products$ = data);
        }
        else
        {
          
          this._productService
            .getProducts()
              .subscribe( data => this.products$ = data);
        }
      }
    )
  }

  applyCategory(category: number){
    this.category$ = category;
    this.redirect();
  }

  applyKeyword(){
    this.keyword$ = this.keywordModel;
    this.redirect();
  }

  applyRange(){
    this.min$ = this.priceRangeModel.min;
    this.max$ = this.priceRangeModel.max;    
    this.redirect();
  }

  redirect(){
    if(this.keyword$ != null && this.min$ != null && this.category$ != null){
      this._router.navigateByUrl('products/word+category+range/' + this.keyword$ + '/' + this.category$ + '/' + this.min$ + '/' + this.max$);
    }
    else if(this.keyword$ != null && this.min$ != null)
    {
      this._router.navigateByUrl('products/word+range/' + this.keyword$ + '/' + this.min$ + '/' + this.max$);
    }
    else if(this.keyword$ != null && this.category$ != null)
    {
      this._router.navigateByUrl('products/word+category' + this.keyword$ + '/' + this.category$);
    }
    else if(this.min$ != null && this.category$ != null)
    {
      this._router.navigateByUrl('products/category_range/' + this.category$ + '/' + this.min$ + '/' + this.max$);
    }
    else if(this.keyword$ != null)
    {
      this._router.navigateByUrl('products/word/' + this.keyword$);
    }
    else if(this.min$ != null)
    { 
      this._router.navigateByUrl('products/range/' + this.min$ + '/' + this.max$);
    }
    else if(this.category$ != null)
    {      
      this._router.navigateByUrl('products/category/' + this.category$);
    }
    else
    {
      this._router.navigateByUrl('#')
    }
  }

  sanitizeUrl(url: string){
    return this._domSanitizer.bypassSecurityTrustUrl(url);
  }
}
