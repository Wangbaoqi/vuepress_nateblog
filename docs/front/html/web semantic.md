---
type: front-html
tag: html
excerpt: HTML5 is the latest version that defines the HTML standard; it is a new version of the HTML language with new elements, attributes, and behaviors, and it has a larger set of technologies that allow the construction of more diverse and powerful websites and applications
---


# web semantic

::: tip
HTML5 is the latest version that defines the HTML standard; it is a new version of the HTML language with new elements, attributes, and behaviors,and it has a larger set of technologies that allow the construction of more diverse and powerful websites and applications
:::

## understanding semantic 

1. do correct thing of correctly tags 
2. Structured page content
3. easy to read without CSS, easy to read and maintain and understand
4. easy to browser, parse search engine，conducive to reptile tag and SEO 

## add semantic tag 

**HTML5 new tags list**

```html
<section>,<article>,<nav>,<header>,<footer>,<aside>,<hgroup>,<mark>,
<figure>,<figcaption>,<data>,<time>,<output>,<progress>,<meter>,<main>
```


**use audio and video HTML5**

audio and video elements allow to handle new multimage content 


**improve of input**

improve of web input：force check API，new features and new type of input element 

1. required - need to check, add style
2. pattern - check regular
3. minlength maxlength - check length type = 'text'
4. min max - check length type = 'number'

[more-API-prefer-here](https://developer.mozilla.org/zh-CN/docs/Learn/HTML/Forms/Data_form_validation)


## block element inline element null element

**block element**
```html
<!-- block element  the following element of set display: block -->
<p>
<div>
<header>
<article>
<aside>
<section>
<footer>
<ul>
```

**inline element**

```html
<!-- inline element the following element of set display: inline -->
<span>
<a>
<img>
<input>
```

**null element**

```html
<br>
<hr>
```

## optimize html

1. insert HTML。
Using document.write to generate page content in JavaScript is less efficient. You can find a container element, such as specifying a div, and use innerHTML to insert HTML code into the page.
2. aviod null src and href 
When the href attribute of the link tag is empty and the src attribute of the script tag is empty, the browser will use the URL of the current page as their attribute value when rendering, and thus load the content of the page as their value.
3. specify expire for head file 
Make the content cacheable and avoid unnecessary HTTP requests during subsequent page visits.

4. Use LocalStorage to reasonably cache resources
Try to avoid CSS expressions and filters

5. try to load JS file use defer way 
6. set different content for different viewposrts 
7. storage offline: Service Workers
8. esource Hints(preconnect, preload, and prerender)

