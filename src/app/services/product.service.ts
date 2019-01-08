import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private _httpClient: HttpClient) { }

  getProducts(){
    return this._httpClient.get('http://localhost:8090/product/all');
  }

  getProductsInRange(min: number, max: number){
    return this._httpClient.get('http://localhost:8090/product/from/' + min + '/to/' + max);
  }

  getProductsFromCategory(id: number){
    return this._httpClient.get('http://localhost:8090/product/category/' + id);
  }

  getByKeyword(word: string){console.log("IN STRING")
    return this._httpClient.get('http://localhost:8090/product/contains/' + word);
  }

  getProductsInRangeFromCategory(id: number, min: number, max: number){
    return this._httpClient.get('http://localhost:8090/product/from/' + min + '/to/' + max + '/category/' + id);
  }

  getProductsInRangeByKeyword(min: number, max: number, word: string){
    return this._httpClient.get('http://localhost:8090/product/from/' + min + '/to/' + max + '/contains/' + word);
  }

  getProductsFromCategoryByKeyword(id: number, word: string){
    return this._httpClient.get('http://localhost:8090/product/category/+' + id + '/contains/' + word );
  }

  getProductsInRangeFromCategoryByKeyword(id: number, min: number, max: number, word: string){
    return this._httpClient.get('http://localhost:8090/product/from/' + min + '/to/' + max + '/category/' + id + '/contains/' + word);
  }

  addProduct(product: Product){
    this._httpClient.post('http://localhost:8090/product/add', product);
  }

}
