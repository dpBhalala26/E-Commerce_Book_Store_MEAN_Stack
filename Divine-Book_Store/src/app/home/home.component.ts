import { Component, OnInit } from '@angular/core';
declare var $: any

@Component({
  selector: 'dp-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    $(document).ready(function () {
      console.log("Hi");
      add_dsa_carousel(1);
      add_dsc_carousel(2);
      add_lang_carousel(3);
      add_blch_carousel(4);
    });

    function add_dsa_carousel(startNum1) {
      const category = "dsa";
      addImages(startNum1, category);
      $('#dsa-books-carousel .carousel-item').first().addClass('active');
      $('#dsa-books-carousel').carousel();
    }
    function add_dsc_carousel(startNum2) {
      const category = "dsc";
      addImages(startNum2, category);
      $('#dsc-books-carousel .carousel-item').first().addClass('active');
      $('#dsc-books-carousel').carousel();
    }
    function add_lang_carousel(startNum3) {
      const category = "lang";
      addImages(startNum3, category);
      $('#lang-books-carousel .carousel-item').first().addClass('active');
      $('#lang-books-carousel').carousel();
    }
    function add_blch_carousel(startNum4) {
      const category = "blch";
      addImages(startNum4, category);
      $('#blch-books-carousel .carousel-item').first().addClass('active');
      $('#blch-books-carousel').carousel();
    }

    function addImages(Fnum, category){
      for (var i = Fnum; i < 17; i += 4 ) {
        const temp = padNumber(i);
        $('#'+category+'-books-carousel-inner').append('<div class="carousel-item" data-interval="3000"> <img src="assets/static/books-images/b' + temp + '.jpg" class="d-block w-100" alt="Book ' + temp + '"></div>');
      }
    }

    function padNumber(num: number) {
      return String(num).padStart(3, '0');
    }

    $(document).ready(function(){
      $('.carousel-item img').css({"height":"450px", "width":"387px"});
    });
    
  }

}
