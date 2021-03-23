import { Injectable } from '@angular/core';
import { Meta } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class MetasvcService {
  constructor(private meta: Meta) {}

  generateTags(config: any): void {
    config = {
      title: 'Jastho',
      description: 'Productos para hombre mujer hogar y variedades',
      image: 'https://firebasestorage.googleapis.com/v0/b/variedadesjastho.appspot.com/o/jastho.jpeg?alt=media&token=e19dcba0-01c5-4fec-ab05-dfe3abaa7248',
      slug: '',
      ...config,
    };

    this.meta.updateTag({ name: 'twitter:card', content: 'summary' });
    this.meta.updateTag({ name: 'twitter:site', content: '@jastho' });
    this.meta.updateTag({ name: 'twitter:title', content: config.title });
    this.meta.updateTag({
      name: 'twitter:description',
      content: config.description,
    });
    this.meta.updateTag({ name: 'twitter:image', content: config.image });

    this.meta.updateTag({ property: 'og:type', content: 'article' });
    this.meta.updateTag({
      property: 'og:site_name',
      content: 'My Website Name',
    });
    this.meta.updateTag({ property: 'og:title', content: config.title });
    this.meta.updateTag({
      property: 'og:description',
      content: config.description,
    });
    this.meta.updateTag({ property: 'og:image', content: config.image });
    this.meta.updateTag({
      property: 'og:url',
      content: `https://variedadesjastho.web.app/${config.slug}`,
    });
    this.meta.updateTag({name: 'description', content: config.description});
  }
}
